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

import display from '@ohos.display';
import deviceInfo from '@ohos.deviceInfo';
import batteryInfo from '@ohos.batteryInfo';

/**
 * 设备类型枚举
 */
export enum DeviceType {
  PHONE = 'phone',
  TABLET = 'tablet',
  WEARABLE = 'wearable',
  UNKNOWN = 'unknown'
}

/**
 * 屏幕方向枚举
 */
export enum ScreenOrientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
  UNKNOWN = 'unknown'
}

/**
 * 设备特性接口
 */
export interface DeviceCapabilities {
  hasStepCounter: boolean;        // 是否有计步器
  hasGps: boolean;                // 是否有GPS
  hasNetwork: boolean;            // 是否有网络能力
  hasBattery: boolean;            // 是否有电池
  hasCamera: boolean;             // 是否有相机
  hasVibrator: boolean;           // 是否有振动器
  hasNotification: boolean;       // 是否支持通知
  hasBackgroundTask: boolean;     // 是否支持后台任务
}

/**
 * 屏幕信息接口
 */
export interface ScreenInfo {
  width: number;                  // 屏幕宽度（像素）
  height: number;                 // 屏幕高度（像素）
  density: number;                // 屏幕密度
  densityDpi: number;             // 屏幕DPI
  scaledDensity: number;          // 缩放后的密度
  orientation: ScreenOrientation; // 屏幕方向
  refreshRate: number;            // 刷新率
}

/**
 * 穿戴设备屏幕类型枚举
 */
export enum WearableScreenType {
  SMALL_ROUND = 'small_round',  // 小尺寸圆形表盘（如手环）
  ROUND = 'round',              // 标准圆形表盘（如 Watch GT 系列）
  SQUARE = 'square'             // 方形表盘（如 Watch 3/4/5 系列）
}

/**
 * 字体大小配置接口
 */
export interface FontSizeConfig {
  title: number;               // 标题字体
  body: number;                // 正文字体
  caption: number;             // 说明文字体
}

/**
 * 穿戴设备屏幕配置接口
 */
export interface WearableScreenConfig {
  type: WearableScreenType;      // 屏幕类型
  diameter: number;              // 直径/宽度
  safeAreaRadius: number;        // 安全区域半径
  fontSize: FontSizeConfig;      // 字体大小配置
  padding: number;               // 内边距
  buttonHeight: number;          // 按钮高度
  iconSize: number;              // 图标尺寸
}

/**
 * 设备工具类
 * 用于检测和适配不同设备类型
 */
export class DeviceUtil {
  private static deviceType: DeviceType = DeviceType.UNKNOWN;
  private static isInitialized: boolean = false;

  /**
   * 初始化设备类型检测
   */
  static initialize(): void {
    if (DeviceUtil.isInitialized) {
      return;
    }

    try {
      const displayInfo = display.getDefaultDisplaySync();
      const width = displayInfo.width;
      const height = displayInfo.height;
      const screenWidth = Math.min(width, height);
      
      // 根据屏幕宽度判断设备类型
      // wearable: < 400px
      // phone: 400px - 600px
      // tablet: > 600px
      if (screenWidth < 400) {
        DeviceUtil.deviceType = DeviceType.WEARABLE;
      } else if (screenWidth <= 600) {
        DeviceUtil.deviceType = DeviceType.PHONE;
      } else {
        DeviceUtil.deviceType = DeviceType.TABLET;
      }

      DeviceUtil.isInitialized = true;
    } catch (error) {
      console.error('DeviceUtil initialize failed:', error);
      DeviceUtil.deviceType = DeviceType.PHONE; // 默认为手机
      DeviceUtil.isInitialized = true;
    }
  }

  /**
   * 获取当前设备类型
   */
  static getDeviceType(): DeviceType {
    if (!DeviceUtil.isInitialized) {
      DeviceUtil.initialize();
    }
    return DeviceUtil.deviceType;
  }

  /**
   * 是否为可穿戴设备
   */
  static isWearable(): boolean {
    return DeviceUtil.getDeviceType() === DeviceType.WEARABLE;
  }

  /**
   * 是否为手机设备
   */
  static isPhone(): boolean {
    return DeviceUtil.getDeviceType() === DeviceType.PHONE;
  }

  /**
   * 是否为平板设备
   */
  static isTablet(): boolean {
    return DeviceUtil.getDeviceType() === DeviceType.TABLET;
  }

  /**
   * 是否为折叠屏设备
   * 通过检测屏幕是否可折叠来判断
   */
  static isFoldable(): boolean {
    try {
      return display.isFoldable();
    } catch (error) {
      console.error('Check foldable failed:', error);
      return false;
    }
  }

  /**
   * 获取适配的字体大小
   * @param baseSize 基础字体大小
   */
  static getAdaptiveFontSize(baseSize: number): number {
    const deviceType = DeviceUtil.getDeviceType();
    
    switch (deviceType) {
      case DeviceType.WEARABLE:
        return baseSize * 0.8; // 可穿戴设备字体稍小
      case DeviceType.TABLET:
        return baseSize * 1.2; // 平板字体稍大
      default:
        return baseSize;
    }
  }

  /**
   * 获取适配的间距
   * @param basePadding 基础间距
   */
  static getAdaptivePadding(basePadding: number): number {
    const deviceType = DeviceUtil.getDeviceType();
    
    switch (deviceType) {
      case DeviceType.WEARABLE:
        return basePadding * 0.6; // 可穿戴设备间距更紧凑
      case DeviceType.TABLET:
        return basePadding * 1.5; // 平板间距更大
      default:
        return basePadding;
    }
  }

  /**
   * 是否支持位置功能
   * 可穿戴设备对位置权限支持有限
   */
  static isLocationSupported(): boolean {
    // 所有设备都支持位置功能，但可穿戴设备可能精度较低
    return true;
  }

  /**
   * 是否支持高级UI组件
   * 某些组件在可穿戴设备上不支持
   */
  static isAdvancedUISupported(): boolean {
    return !DeviceUtil.isWearable();
  }
  
  /**
   * 获取屏幕信息
   */
  static getScreenInfo(): ScreenInfo {
    try {
      const displayInfo = display.getDefaultDisplaySync();
      const width = displayInfo.width;
      const height = displayInfo.height;
      
      return {
        width,
        height,
        density: displayInfo.densityPixels,
        densityDpi: displayInfo.densityDPI,
        scaledDensity: displayInfo.scaledDensity,
        orientation: width > height ? ScreenOrientation.LANDSCAPE : ScreenOrientation.PORTRAIT,
        refreshRate: displayInfo.refreshRate
      };
    } catch (error) {
      console.error('Get screen info failed:', error);
      return {
        width: 1080,
        height: 1920,
        density: 2.0,
        densityDpi: 320,
        scaledDensity: 2.0,
        orientation: ScreenOrientation.PORTRAIT,
        refreshRate: 60
      };
    }
  }
  
  /**
   * 获取设备能力
   */
  static getDeviceCapabilities(): DeviceCapabilities {
    return {
      hasStepCounter: DeviceUtil.hasStepCounter(),
      hasGps: DeviceUtil.hasGps(),
      hasNetwork: DeviceUtil.hasNetworkCapability(),
      hasBattery: DeviceUtil.hasBattery(),
      hasCamera: DeviceUtil.hasCamera(),
      hasVibrator: DeviceUtil.hasVibrator(),
      hasNotification: true,
      hasBackgroundTask: !DeviceUtil.isWearable()
    };
  }
  
  /**
   * 检查是否有计步器传感器
   */
  static hasStepCounter(): boolean {
    try {
      // 可穿戴设备可能没有计步器传感器
      return !DeviceUtil.isWearable() || deviceInfo.sdkApiVersion >= 10;
    } catch (error) {
      console.error('Check step counter failed:', error);
      return true;
    }
  }
  
  /**
   * 检查是否有GPS
   */
  static hasGps(): boolean {
    try {
      // 所有设备都支持GPS，但可穿戴设备精度可能较低
      return true;
    } catch (error) {
      console.error('Check GPS failed:', error);
      return false;
    }
  }
  
  /**
   * 检查是否有网络能力
   */
  static hasNetworkCapability(): boolean {
    try {
      // 可穿戴设备网络能力有限
      return !DeviceUtil.isWearable();
    } catch (error) {
      console.error('Check network capability failed:', error);
      return true;
    }
  }
  
  /**
   * 检查是否有电池
   */
  static hasBattery(): boolean {
    try {
      const batteryLevel = batteryInfo.batterySOC;
      return batteryLevel >= 0;
    } catch (error) {
      console.error('Check battery failed:', error);
      return true;
    }
  }
  
  /**
   * 获取电池电量
   */
  static getBatteryLevel(): number {
    try {
      return batteryInfo.batterySOC;
    } catch (error) {
      console.error('Get battery level failed:', error);
      return 100;
    }
  }
  
  /**
   * 检查是否正在充电
   */
  static isCharging(): boolean {
    try {
      // batteryInfo没有isCharging属性，返回false
      return false;
    } catch (error) {
      console.error('Check charging status failed:', error);
      return false;
    }
  }
  
  /**
   * 检查是否有相机
   */
  static hasCamera(): boolean {
    try {
      // 可穿戴设备通常没有相机
      return !DeviceUtil.isWearable();
    } catch (error) {
      console.error('Check camera failed:', error);
      return true;
    }
  }
  
  /**
   * 检查是否有振动器
   */
  static hasVibrator(): boolean {
    try {
      // 所有设备都支持振动
      return true;
    } catch (error) {
      console.error('Check vibrator failed:', error);
      return false;
    }
  }
  
  /**
   * 获取设备型号
   */
  static getDeviceModel(): string {
    try {
      // deviceInfo没有model属性，使用默认值
      return 'Unknown';
    } catch (error) {
      console.error('Get device model failed:', error);
      return 'Unknown';
    }
  }
  
  /**
   * 获取设备品牌
   */
  static getDeviceBrand(): string {
    try {
      return deviceInfo.brand;
    } catch (error) {
      console.error('Get device brand failed:', error);
      return 'Unknown';
    }
  }
  
  /**
   * 获取设备名称
   */
  static getDeviceName(): string {
    try {
      return `${DeviceUtil.getDeviceBrand()} ${DeviceUtil.getDeviceModel()}`;
    } catch (error) {
      console.error('Get device name failed:', error);
      return 'Unknown Device';
    }
  }
  
  /**
   * 获取API版本
   */
  static getApiVersion(): number {
    try {
      return deviceInfo.sdkApiVersion;
    } catch (error) {
      console.error('Get API version failed:', error);
      return 9; // 默认API 9
    }
  }
  
  /**
   * 检查是否为低性能设备
   */
  static isLowPerformanceDevice(): boolean {
    const deviceType = DeviceUtil.getDeviceType();
    const apiVersion = DeviceUtil.getApiVersion();
    
    // 可穿戴设备或低API版本设备认为是低性能设备
    return deviceType === DeviceType.WEARABLE || apiVersion < 10;
  }
  
  /**
   * 获取推荐的刷新间隔
   * 根据设备性能返回合适的刷新间隔
   */
  static getRecommendedRefreshInterval(): number {
    if (DeviceUtil.isLowPerformanceDevice()) {
      return 2000; // 低性能设备：2秒
    } else if (DeviceUtil.isTablet()) {
      return 500; // 平板：0.5秒
    } else {
      return 1000; // 手机：1秒
    }
  }
  
  /**
   * 获取推荐的动画时长
   * 根据设备性能返回合适的动画时长
   */
  static getRecommendedAnimationDuration(): number {
    if (DeviceUtil.isLowPerformanceDevice()) {
      return 200; // 低性能设备：短动画
    } else {
      return 300; // 正常设备：标准动画
    }
  }
  
  /**
   * 检查是否应该启用省电模式
   */
  static shouldEnablePowerSaving(): boolean {
    const batteryLevel = DeviceUtil.getBatteryLevel();
    const isCharging = DeviceUtil.isCharging();
    
    // 电量低于20%且未充电时启用省电模式
    return batteryLevel < 20 && !isCharging;
  }
  
  /**
   * 获取设备信息摘要
   */
  static getDeviceInfoSummary(): string {
    const deviceName = DeviceUtil.getDeviceName();
    const deviceType = DeviceUtil.getDeviceType();
    const apiVersion = DeviceUtil.getApiVersion();
    const screenInfo = DeviceUtil.getScreenInfo();
    
    return `设备: ${deviceName}\n` +
           `类型: ${deviceType}\n` +
           `API: ${apiVersion}\n` +
           `屏幕: ${screenInfo.width}x${screenInfo.height}`;
  }

  /**
   * 获取穿戴设备屏幕尺寸配置
   * HarmonyOS 6.0.1 穿戴设备标准尺寸
   */
  static getWearableScreenConfig(): WearableScreenConfig {
    const screenInfo = DeviceUtil.getScreenInfo();
    const width = Math.min(screenInfo.width, screenInfo.height);

    // 根据屏幕宽度判断穿戴设备类型
    if (width <= 200) {
      // 小尺寸圆形表盘（如手环）
      return {
        type: WearableScreenType.SMALL_ROUND,
        diameter: width,
        safeAreaRadius: width * 0.42, // 圆形表盘安全区域
        fontSize: {
          title: 18,
          body: 12,
          caption: 10
        } as FontSizeConfig,
        padding: 8,
        buttonHeight: 36,
        iconSize: 20
      };
    } else if (width <= 368) {
      // 标准圆形表盘（如 Watch GT 系列）
      return {
        type: WearableScreenType.ROUND,
        diameter: width,
        safeAreaRadius: width * 0.45,
        fontSize: {
          title: 22,
          body: 14,
          caption: 11
        } as FontSizeConfig,
        padding: 12,
        buttonHeight: 40,
        iconSize: 24
      };
    } else {
      // 方形表盘（如 Watch 3/4/5 系列）
      return {
        type: WearableScreenType.SQUARE,
        diameter: width,
        safeAreaRadius: width * 0.5,
        fontSize: {
          title: 24,
          body: 16,
          caption: 12
        } as FontSizeConfig,
        padding: 16,
        buttonHeight: 44,
        iconSize: 28
      };
    }
  }

  /**
   * 获取适配后的按钮高度
   */
  static getAdaptiveButtonHeight(): number {
    if (!DeviceUtil.isWearable()) {
      return 48; // 手机默认按钮高度
    }

    const config = DeviceUtil.getWearableScreenConfig();
    return config.buttonHeight;
  }

  /**
   * 检查是否支持长时后台任务
   * 穿戴设备后台任务受限
   */
  static isLongBackgroundTaskSupported(): boolean {
    return !DeviceUtil.isWearable();
  }

  /**
   * 获取最大缓存大小
   * 穿戴设备存储空间有限
   */
  static getMaxCacheSize(): number {
    if (DeviceUtil.isWearable()) {
      // 穿戴设备：最大 10MB 缓存
      return 10 * 1024 * 1024;
    } else {
      // 手机/平板：最大 100MB 缓存
      return 100 * 1024 * 1024;
    }
  }

  /**
   * 获取网络请求超时时间
   * 穿戴设备网络可能较慢
   */
  static getNetworkTimeout(): number {
    if (DeviceUtil.isWearable()) {
      return 30000; // 穿戴设备：30秒
    } else {
      return 15000; // 手机：15秒
    }
  }

  /**
   * 检查是否支持高分辨率图片
   * 穿戴设备内存有限，不支持高清大图
   */
  static isHighResolutionImageSupported(): boolean {
    return !DeviceUtil.isWearable();
  }

  /**
   * 获取最大图片尺寸
   */
  static getMaxImageSize(): number {
    if (DeviceUtil.isWearable()) {
      return 200; // 穿戴设备：最大 200px
    } else {
      return 800; // 手机：最大 800px
    }
  }
}