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

const TAG: string = 'CacheManager';

/**
 * 缓存数据类型
 */
type CacheData = string | number | boolean | object | null;

/**
 * 缓存项接口
 */
interface CacheItem {
  data: CacheData;             // 缓存数据
  timestamp: number;           // 创建时间戳
  expireTime: number;          // 过期时间（毫秒）
  accessCount: number;         // 访问次数
  lastAccessTime: number;      // 最后访问时间
}

/**
 * 缓存配置接口
 */
export interface CacheConfig {
  maxSize: number;            // 最大缓存大小（项数）
  defaultExpireTime: number;  // 默认过期时间（毫秒）
  cleanupInterval: number;    // 清理间隔（毫秒）
  enableLRU: boolean;         // 是否启用LRU策略
}

/**
 * 缓存统计信息接口
 */
export interface CacheStatistics {
  totalItems: number;         // 总缓存项数
  totalSize: number;          // 总大小（字节）
  hitCount: number;           // 命中次数
  missCount: number;          // 未命中次数
  hitRate: number;            // 命中率
  evictionCount: number;      // 驱逐次数
}

/**
 * 数据缓存管理器
 * 
 * 功能说明:
 * 1. 内存缓存管理，减少数据库查询
 * 2. 支持缓存过期机制
 * 3. LRU（最近最少使用）淘汰策略
 * 4. 自动清理过期缓存
 * 5. 缓存命中率统计
 * 
 * 性能优化:
 * - 减少数据库查询次数
 * - 提高数据访问速度
 * - 降低内存占用
 */
export class CacheManager {
  private cache: Map<string, CacheItem> = new Map();
  private config: CacheConfig;
  private cleanupTimer: number = -1;
  
  // 统计信息
  private hitCount: number = 0;
  private missCount: number = 0;
  private evictionCount: number = 0;
  
  // 默认配置
  private readonly DEFAULT_CONFIG: CacheConfig = {
    maxSize: 100,                    // 最大100个缓存项
    defaultExpireTime: 5 * 60 * 1000, // 默认5分钟过期
    cleanupInterval: 60 * 1000,       // 每分钟清理一次
    enableLRU: true                   // 启用LRU策略
  };
  
  constructor(config?: Partial<CacheConfig>) {
    // 手动合并配置，避免使用展开运算符
    this.config = {
      maxSize: config?.maxSize ?? this.DEFAULT_CONFIG.maxSize,
      defaultExpireTime: config?.defaultExpireTime ?? this.DEFAULT_CONFIG.defaultExpireTime,
      cleanupInterval: config?.cleanupInterval ?? this.DEFAULT_CONFIG.cleanupInterval,
      enableLRU: config?.enableLRU ?? this.DEFAULT_CONFIG.enableLRU
    };
    this.startAutoCleanup();
    Logger.info(TAG, `CacheManager initialized with max size: ${this.config.maxSize}`);
  }
  
  /**
   * 设置缓存
   * 
   * @param key 缓存键
   * @param data 缓存数据
   * @param expireTime 过期时间（毫秒），可选
   */
  set(key: string, data: CacheData, expireTime?: number): void {
    // 检查是否需要淘汰
    if (this.cache.size >= this.config.maxSize) {
      this.evict();
    }
    
    const now = Date.now();
    const item: CacheItem = {
      data: data,
      timestamp: now,
      expireTime: expireTime ?? this.config.defaultExpireTime,
      accessCount: 0,
      lastAccessTime: now
    };
    
    this.cache.set(key, item);
    Logger.debug(TAG, `Cache set: ${key}, size: ${this.cache.size}`);
  }
  
  /**
   * 获取缓存
   * 
   * @param key 缓存键
   * @returns CacheData | null 缓存数据或null
   */
  get(key: string): CacheData | null {
    const item = this.cache.get(key);
    
    if (!item) {
      this.missCount++;
      Logger.debug(TAG, `Cache miss: ${key}`);
      return null;
    }
    
    // 检查是否过期
    if (this.isExpired(item)) {
      this.cache.delete(key);
      this.missCount++;
      Logger.debug(TAG, `Cache expired: ${key}`);
      return null;
    }
    
    // 更新访问信息
    item.accessCount++;
    item.lastAccessTime = Date.now();
    this.hitCount++;
    
    Logger.debug(TAG, `Cache hit: ${key}, access count: ${item.accessCount}`);
    return item.data;
  }
  
  /**
   * 获取或设置缓存
   * 如果缓存不存在，使用提供的工厂函数创建
   * 
   * @param key 缓存键
   * @param factory 数据工厂函数
   * @param expireTime 过期时间（毫秒），可选
   * @returns Promise<CacheData> 缓存数据
   */
  async getOrSet(key: string, factory: () => Promise<CacheData>, expireTime?: number): Promise<CacheData> {
    const cached = this.get(key);
    if (cached !== null) {
      return cached;
    }
    
    // 创建新数据
    const data = await factory();
    this.set(key, data, expireTime);
    return data;
  }
  
  /**
   * 删除缓存
   * 
   * @param key 缓存键
   * @returns boolean 是否删除成功
   */
  delete(key: string): boolean {
    const result = this.cache.delete(key);
    if (result) {
      Logger.debug(TAG, `Cache deleted: ${key}`);
    }
    return result;
  }
  
  /**
   * 清空所有缓存
   */
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    Logger.info(TAG, `Cache cleared, removed ${size} items`);
  }
  
  /**
   * 检查缓存是否存在
   * 
   * @param key 缓存键
   * @returns boolean 是否存在
   */
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) {
      return false;
    }
    
    // 检查是否过期
    if (this.isExpired(item)) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
  
  /**
   * 获取缓存统计信息
   * 
   * @returns CacheStatistics 统计信息
   */
  getStatistics(): CacheStatistics {
    const totalRequests = this.hitCount + this.missCount;
    const hitRate = totalRequests > 0 ? this.hitCount / totalRequests : 0;
    
    // 估算缓存大小（粗略计算）
    let totalSize = 0;
    this.cache.forEach((item: CacheItem) => {
      totalSize += JSON.stringify(item.data).length;
    });
    
    return {
      totalItems: this.cache.size,
      totalSize: totalSize,
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRate: Math.round(hitRate * 100) / 100,
      evictionCount: this.evictionCount
    };
  }
  
  /**
   * 检查缓存项是否过期
   * 
   * @param item 缓存项
   * @returns boolean 是否过期
   */
  private isExpired(item: CacheItem): boolean {
    const now = Date.now();
    return (now - item.timestamp) > item.expireTime;
  }
  
  /**
   * 淘汰缓存项
   * 使用LRU策略或FIFO策略
   */
  private evict(): void {
    if (this.cache.size === 0) {
      return;
    }
    
    let evictKey: string | null = null;
    
    if (this.config.enableLRU) {
      // LRU策略：淘汰最久未访问的项
      let oldestTime = Date.now();
      this.cache.forEach((item: CacheItem, key: string) => {
        if (item.lastAccessTime < oldestTime) {
          oldestTime = item.lastAccessTime;
          evictKey = key;
        }
      });
    } else {
      // FIFO策略：淘汰最早创建的项
      let oldestTime = Date.now();
      this.cache.forEach((item: CacheItem, key: string) => {
        if (item.timestamp < oldestTime) {
          oldestTime = item.timestamp;
          evictKey = key;
        }
      });
    }
    
    if (evictKey) {
      this.cache.delete(evictKey);
      this.evictionCount++;
      Logger.debug(TAG, `Cache evicted: ${evictKey}`);
    }
  }
  
  /**
   * 清理过期缓存
   */
  cleanup(): void {
    const now = Date.now();
    let cleanedCount = 0;
    
    this.cache.forEach((item: CacheItem, key: string) => {
      if (this.isExpired(item)) {
        this.cache.delete(key);
        cleanedCount++;
      }
    });
    
    if (cleanedCount > 0) {
      Logger.info(TAG, `Cache cleanup: removed ${cleanedCount} expired items`);
    }
  }
  
  /**
   * 启动自动清理
   */
  private startAutoCleanup(): void {
    if (this.cleanupTimer !== -1) {
      return;
    }
    
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
    
    Logger.info(TAG, 'Auto cleanup started');
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
   * 获取缓存键列表
   * 
   * @returns string[] 缓存键数组
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }
  
  /**
   * 获取缓存大小
   * 
   * @returns number 缓存项数量
   */
  size(): number {
    return this.cache.size;
  }
  
  /**
   * 重置统计信息
   */
  resetStatistics(): void {
    this.hitCount = 0;
    this.missCount = 0;
    this.evictionCount = 0;
    Logger.info(TAG, 'Statistics reset');
  }
  
  /**
   * 销毁缓存管理器
   */
  destroy(): void {
    this.stopAutoCleanup();
    this.clear();
    Logger.info(TAG, 'CacheManager destroyed');
  }
}

// 单例实例
let cacheManager: CacheManager | null = null;

/**
 * 获取缓存管理器实例
 * 
 * @param config 缓存配置，可选
 * @returns CacheManager 实例
 */
export function getCacheManager(config?: Partial<CacheConfig>): CacheManager {
  if (!cacheManager) {
    cacheManager = new CacheManager(config);
  }
  return cacheManager;
}

/**
 * 缓存键常量
 */
export class CacheKeys {
  static readonly TODAY_STEPS = 'today_steps';
  static readonly WEEK_DATA = 'week_data';
  static readonly MONTH_DATA = 'month_data';
  static readonly USER_PROFILE = 'user_profile';
  static readonly STATISTICS = 'statistics';
  static readonly BEST_RECORD = 'best_record';
  static readonly CHART_DATA = 'chart_data';
}
