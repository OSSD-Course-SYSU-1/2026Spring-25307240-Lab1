/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Logger from './Logger';

const TAG: string = 'MemoryManager';

/**
 * 资源清理回调类型
 */
type CleanupCallback = () => void;

/**
 * 内存使用信息接口
 */
export interface MemoryInfo {
  usedJSHeapSize: number;      // 已使用的JS堆大小（字节）
  totalJSHeapSize: number;     // 总JS堆大小（字节）
  jsHeapSizeLimit: number;     // JS堆大小限制（字节）
  usagePercentage: number;     // 使用百分比
}

/**
 * 资源追踪项
 */
interface ResourceTracker {
  id: string;                  // 资源ID
  type: string;                // 资源类型
  createTime: number;          // 创建时间
  size?: number;               // 资源大小（字节）
  cleanup: CleanupCallback;    // 清理回调
}

/**
 * 内存管理器
 * 
 * 功能说明:
 * 1. 资源生命周期管理
 * 2. 自动内存清理
 * 3. 内存使用监控
 * 4. 防止内存泄漏
 * 
 * 性能优化:
 * - 及时释放不再使用的资源
 * - 监控内存使用情况
 * - 自动清理过期资源
 */
export class MemoryManager {
  private resources: Map<string, ResourceTracker> = new Map();
  private cleanupTimer: number = -1;
  private memoryWarningThreshold: number = 0.8; // 内存警告阈值（80%）
  
  // 统计信息
  private totalResourcesCreated: number = 0;
  private totalResourcesCleaned: number = 0;
  
  /**
   * 注册资源
   * 
   * @param id 资源ID
   * @param type 资源类型
   * @param cleanup 清理回调函数
   * @param size 资源大小（可选）
   * @returns string 资源ID
   */
  registerResource(id: string, type: string, cleanup: CleanupCallback, size?: number): string {
    const tracker: ResourceTracker = {
      id,
      type,
      createTime: Date.now(),
      size,
      cleanup
    };
    
    this.resources.set(id, tracker);
    this.totalResourcesCreated++;
    
    Logger.debug(TAG, `Resource registered: ${id} (${type})`);
    return id;
  }
  
  /**
   * 注销资源
   * 
   * @param id 资源ID
   * @param cleanup 是否执行清理，默认true
   */
  unregisterResource(id: string, cleanup: boolean = true): void {
    const tracker = this.resources.get(id);
    if (!tracker) {
      Logger.warn(TAG, `Resource not found: ${id}`);
      return;
    }
    
    if (cleanup) {
      try {
        tracker.cleanup();
        this.totalResourcesCleaned++;
        Logger.debug(TAG, `Resource cleaned: ${id}`);
      } catch (err) {
        Logger.error(TAG, `Cleanup failed for ${id}: ${JSON.stringify(err)}`);
      }
    }
    
    this.resources.delete(id);
    Logger.debug(TAG, `Resource unregistered: ${id}`);
  }
  
  /**
   * 清理所有资源
   */
  cleanupAll(): void {
    Logger.info(TAG, `Cleaning up all resources, count: ${this.resources.size}`);
    
    this.resources.forEach((tracker, id) => {
      try {
        tracker.cleanup();
        this.totalResourcesCleaned++;
      } catch (err) {
        Logger.error(TAG, `Cleanup failed for ${id}: ${JSON.stringify(err)}`);
      }
    });
    
    this.resources.clear();
    Logger.info(TAG, 'All resources cleaned up');
  }
  
  /**
   * 清理指定类型的资源
   * 
   * @param type 资源类型
   */
  cleanupByType(type: string): void {
    const toCleanup: string[] = [];
    
    this.resources.forEach((tracker, id) => {
      if (tracker.type === type) {
        toCleanup.push(id);
      }
    });
    
    Logger.info(TAG, `Cleaning up ${toCleanup.length} resources of type: ${type}`);
    
    toCleanup.forEach(id => {
      this.unregisterResource(id);
    });
  }
  
  /**
   * 清理过期资源
   * 
   * @param maxAge 最大存活时间（毫秒）
   */
  cleanupExpired(maxAge: number): void {
    const now = Date.now();
    const toCleanup: string[] = [];
    
    this.resources.forEach((tracker, id) => {
      if (now - tracker.createTime > maxAge) {
        toCleanup.push(id);
      }
    });
    
    if (toCleanup.length > 0) {
      Logger.info(TAG, `Cleaning up ${toCleanup.length} expired resources`);
      toCleanup.forEach(id => {
        this.unregisterResource(id);
      });
    }
  }
  
  /**
   * 获取资源统计信息
   * 
   * @returns object 统计信息
   */
  getStatistics(): object {
    const typeCounts: Map<string, number> = new Map();
    
    this.resources.forEach(tracker => {
      const count = typeCounts.get(tracker.type) || 0;
      typeCounts.set(tracker.type, count + 1);
    });
    
    return {
      totalResources: this.resources.size,
      totalCreated: this.totalResourcesCreated,
      totalCleaned: this.totalResourcesCleaned,
      typeCounts: Object.fromEntries(typeCounts)
    };
  }
  
  /**
   * 获取内存使用信息
   * 注意：此功能依赖于性能API的可用性
   * 
   * @returns MemoryInfo | null 内存信息
   */
  getMemoryInfo(): MemoryInfo | null {
    try {
      // @ts-ignore
      if (typeof performance !== 'undefined' && performance.memory) {
        // @ts-ignore
        const memory = performance.memory;
        return {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          usagePercentage: memory.usedJSHeapSize / memory.jsHeapSizeLimit
        };
      }
    } catch (err) {
      Logger.debug(TAG, 'Memory API not available');
    }
    
    return null;
  }
  
  /**
   * 检查内存使用是否超过阈值
   * 
   * @returns boolean 是否超过阈值
   */
  isMemoryWarning(): boolean {
    const memoryInfo = this.getMemoryInfo();
    if (memoryInfo) {
      return memoryInfo.usagePercentage > this.memoryWarningThreshold;
    }
    return false;
  }
  
  /**
   * 设置内存警告阈值
   * 
   * @param threshold 阈值（0-1）
   */
  setMemoryWarningThreshold(threshold: number): void {
    this.memoryWarningThreshold = Math.max(0, Math.min(1, threshold));
    Logger.info(TAG, `Memory warning threshold set to: ${this.memoryWarningThreshold}`);
  }
  
  /**
   * 启动自动清理
   * 
   * @param interval 清理间隔（毫秒）
   * @param maxAge 资源最大存活时间（毫秒）
   */
  startAutoCleanup(interval: number = 60000, maxAge: number = 300000): void {
    if (this.cleanupTimer !== -1) {
      Logger.warn(TAG, 'Auto cleanup already running');
      return;
    }
    
    this.cleanupTimer = setInterval(() => {
      // 清理过期资源
      this.cleanupExpired(maxAge);
      
      // 检查内存警告
      if (this.isMemoryWarning()) {
        Logger.warn(TAG, 'Memory usage warning! Consider cleaning up resources.');
      }
    }, interval);
    
    Logger.info(TAG, `Auto cleanup started, interval: ${interval}ms, maxAge: ${maxAge}ms`);
  }
  
  /**
   * 停止自动清理
   */
  stopAutoCleanup(): void {
    if (this.cleanupTimer !== -1) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = -1;
      Logger.info(TAG, 'Auto cleanup stopped');
    }
  }
  
  /**
   * 销毁内存管理器
   */
  destroy(): void {
    this.stopAutoCleanup();
    this.cleanupAll();
    Logger.info(TAG, 'MemoryManager destroyed');
  }
}

// 单例实例
let memoryManager: MemoryManager | null = null;

/**
 * 获取内存管理器实例
 * 
 * @returns MemoryManager 实例
 */
export function getMemoryManager(): MemoryManager {
  if (!memoryManager) {
    memoryManager = new MemoryManager();
  }
  return memoryManager;
}

/**
 * 资源类型常量
 */
export class ResourceType {
  static readonly TIMER = 'timer';              // 定时器
  static readonly SENSOR = 'sensor';            // 传感器
  static readonly DATABASE = 'database';        // 数据库
  static readonly CACHE = 'cache';              // 缓存
  static readonly SUBSCRIPTION = 'subscription'; // 订阅
  static readonly LISTENER = 'listener';        // 监听器
}

/**
 * 自动资源管理装饰器工厂
 * 用于自动管理组件生命周期中的资源
 */
export function AutoCleanup(resourceType: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      
      // 如果返回了资源ID，自动注册
      if (typeof result === 'string') {
        const memoryManager = getMemoryManager();
        memoryManager.registerResource(
          result,
          resourceType,
          () => {
            // 默认清理逻辑
            Logger.debug('AutoCleanup', `Auto cleanup: ${result}`);
          }
        );
      }
      
      return result;
    };
    
    return descriptor;
  };
}
