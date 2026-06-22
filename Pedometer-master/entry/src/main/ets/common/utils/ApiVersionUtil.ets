/**
 * API版本检查工具
 * 
 * 用于设备兼容性检查，确保应用在不同API版本的设备上正常运行。
 * 
 * HarmonyOS API版本说明：
 * - deviceInfo.sdkApiVersion: OpenHarmony底座API版本（整数，如17、20、22）
 * - deviceInfo.distributionOSApiVersion: HarmonyOS发行版API版本（格式为M*10000+S*100+F，如50005表示5.0.5）
 * - deviceInfo.firstApiVersion: 设备首个支持的API版本
 * 
 * 使用场景：
 * 1. 检查特定API是否可用
 * 2. 检查系统能力是否支持
 * 3. 提供API版本降级方案
 * 
 * @since API 12
 */
import { deviceInfo } from '@kit.BasicServicesKit';
import Logger from './Logger';

const TAG = 'ApiVersionUtil';

/**
 * API版本信息
 */
export interface ApiVersionInfo {
  /** OpenHarmony底座API版本（整数） */
  sdkApiVersion: number;
  /** HarmonyOS发行版API版本（数值格式） */
  distributionOSApiVersion: number;
  /** HarmonyOS发行版API版本（字符串格式，如"5.0.5"） */
  distributionOSApiName: string;
  /** 设备首个支持的API版本 */
  firstApiVersion: number;
  /** 设备类型 */
  deviceType: string;
}

/**
 * API版本检查结果
 */
export interface ApiCheckResult {
  /** 是否支持 */
  supported: boolean;
  /** 当前API版本 */
  currentVersion: number;
  /** 要求的最低API版本 */
  requiredVersion: number;
  /** 描述信息 */
  message: string;
}

/**
 * 系统能力检查结果
 */
export interface SysCapCheckResult {
  /** 是否支持 */
  supported: boolean;
  /** 系统能力名称 */
  sysCap: string;
  /** 描述信息 */
  message: string;
}

/**
 * API版本检查工具类
 * 
 * 提供API版本检查、系统能力检查、兼容性判断等功能
 */
export class ApiVersionUtil {
  private static instance: ApiVersionUtil | null = null;
  private versionInfo: ApiVersionInfo | null = null;
  
  private constructor() {
    this.initVersionInfo();
  }
  
  /**
   * 获取单例实例
   */
  static getInstance(): ApiVersionUtil {
    if (!ApiVersionUtil.instance) {
      ApiVersionUtil.instance = new ApiVersionUtil();
    }
    return ApiVersionUtil.instance;
  }
  
  /**
   * 初始化版本信息
   */
  private initVersionInfo(): void {
    try {
      this.versionInfo = {
        sdkApiVersion: deviceInfo.sdkApiVersion,
        distributionOSApiVersion: deviceInfo.distributionOSApiVersion,
        distributionOSApiName: this.convertToVersionName(deviceInfo.distributionOSApiVersion),
        firstApiVersion: deviceInfo.firstApiVersion,
        deviceType: deviceInfo.deviceType
      };
      Logger.info(TAG, `API Version Info: ${JSON.stringify(this.versionInfo)}`);
    } catch (err) {
      Logger.error(TAG, `Init version info failed: ${JSON.stringify(err)}`);
      // 设置默认值
      this.versionInfo = {
        sdkApiVersion: 12,
        distributionOSApiVersion: 50000,
        distributionOSApiName: '5.0.0',
        firstApiVersion: 12,
        deviceType: 'default'
      };
    }
  }
  
  /**
   * 将数值版本转换为字符串版本名
   * 例如: 50005 -> "5.0.5", 60002 -> "6.0.2"
   */
  private convertToVersionName(version: number): string {
    const major = Math.floor(version / 10000);
    const minor = Math.floor((version % 10000) / 100);
    const patch = version % 100;
    return `${major}.${minor}.${patch}`;
  }
  
  /**
   * 将字符串版本转换为数值版本
   * 例如: "5.0.5" -> 50005, "6.0.2" -> 60002
   */
  convertToVersionNumber(versionName: string): number {
    const parts = versionName.split('.');
    if (parts.length !== 3) {
      Logger.error(TAG, `Invalid version name: ${versionName}`);
      return 0;
    }
    const major = parseInt(parts[0]) || 0;
    const minor = parseInt(parts[1]) || 0;
    const patch = parseInt(parts[2]) || 0;
    return major * 10000 + minor * 100 + patch;
  }
  
  /**
   * 获取当前API版本信息
   */
  getVersionInfo(): ApiVersionInfo {
    if (!this.versionInfo) {
      this.initVersionInfo();
    }
    return this.versionInfo!;
  }
  
  /**
   * 获取OpenHarmony底座API版本
   */
  getSdkApiVersion(): number {
    return this.getVersionInfo().sdkApiVersion;
  }
  
  /**
   * 获取HarmonyOS发行版API版本（数值）
   */
  getDistributionOSApiVersion(): number {
    return this.getVersionInfo().distributionOSApiVersion;
  }
  
  /**
   * 获取HarmonyOS发行版API版本（字符串）
   */
  getDistributionOSApiName(): string {
    return this.getVersionInfo().distributionOSApiName;
  }
  
  /**
   * 检查OpenHarmony底座API版本是否满足要求
   * 
   * @param requiredVersion 要求的最低API版本（整数，如17、20、22）
   * @returns 检查结果
   * 
   * @example
   * // 检查是否支持API 20
   * const result = apiVersionUtil.checkSdkApiVersion(20);
   * if (result.supported) {
   *   // 调用API 20的新接口
   * } else {
   *   // 使用降级方案
   * }
   */
  checkSdkApiVersion(requiredVersion: number): ApiCheckResult {
    const currentVersion = this.getSdkApiVersion();
    const supported = currentVersion >= requiredVersion;
    return {
      supported: supported,
      currentVersion: currentVersion,
      requiredVersion: requiredVersion,
      message: supported 
        ? `API ${requiredVersion} is supported (current: ${currentVersion})`
        : `API ${requiredVersion} is NOT supported (current: ${currentVersion}, required: ${requiredVersion})`
    };
  }
  
  /**
   * 检查HarmonyOS发行版API版本是否满足要求
   * 
   * @param requiredVersion 要求的最低API版本（字符串，如"5.0.5"、"6.0.2"）
   * @returns 检查结果
   * 
   * @example
   * // 检查是否支持HarmonyOS 6.0.0
   * const result = apiVersionUtil.checkDistributionApiVersion("6.0.0");
   * if (result.supported) {
   *   // 调用HarmonyOS 6.0.0的新接口
   * } else {
   *   // 使用降级方案
   * }
   */
  checkDistributionApiVersion(requiredVersion: string): ApiCheckResult {
    const currentVersion = this.getDistributionOSApiVersion();
    const requiredVersionNumber = this.convertToVersionNumber(requiredVersion);
    const supported = currentVersion >= requiredVersionNumber;
    return {
      supported: supported,
      currentVersion: currentVersion,
      requiredVersion: requiredVersionNumber,
      message: supported 
        ? `HarmonyOS ${requiredVersion} is supported (current: ${this.getDistributionOSApiName()})`
        : `HarmonyOS ${requiredVersion} is NOT supported (current: ${this.getDistributionOSApiName()}, required: ${requiredVersion})`
    };
  }
  
  /**
   * 使用apiAvailable接口检查API是否可用（推荐方式，API 22+）
   * 
   * @param version API版本（字符串或数字）
   * @returns 是否支持
   * 
   * @example
   * // 检查API 22是否可用
   * if (apiVersionUtil.isApiAvailable(22)) {
   *   // 调用API 22的新接口
   * }
   * 
   * // 检查HarmonyOS 6.0.2是否可用
   * if (apiVersionUtil.isApiAvailable('6.0.2')) {
   *   // 调用HarmonyOS 6.0.2的新接口
   * }
   */
  isApiAvailable(version: string | number): boolean {
    // 使用手动检查（兼容所有API版本）
    if (typeof version === 'number') {
      // OpenHarmony底座接口，传入整数
      return this.getSdkApiVersion() >= version;
    } else {
      // HarmonyOS发行版接口，传入版本字符串
      const requiredVersionNumber = this.convertToVersionNumber(version);
      return this.getDistributionOSApiVersion() >= requiredVersionNumber;
    }
  }
  
  /**
   * 检查系统能力是否支持
   * 
   * @param sysCap 系统能力名称（如"SystemCapability.Location.Location.Core"）
   * @returns 检查结果
   * 
   * @example
   * // 检查位置服务能力
   * const result = apiVersionUtil.checkSysCap('SystemCapability.Location.Location.Core');
   * if (result.supported) {
   *   // 使用位置服务
   * } else {
   *   // 提示用户设备不支持
   * }
   */
  checkSysCap(sysCap: string): SysCapCheckResult {
    try {
      const supported = canIUse(sysCap);
      return {
        supported: supported,
        sysCap: sysCap,
        message: supported 
          ? `SysCap ${sysCap} is supported`
          : `SysCap ${sysCap} is NOT supported`
      };
    } catch (err) {
      Logger.error(TAG, `Check SysCap failed: ${JSON.stringify(err)}`);
      return {
        supported: false,
        sysCap: sysCap,
        message: `Check SysCap failed: ${JSON.stringify(err)}`
      };
    }
  }
  
  /**
   * 检查多个系统能力是否全部支持
   * 
   * @param sysCaps 系统能力名称数组
   * @returns 是否全部支持
   */
  checkSysCaps(sysCaps: string[]): boolean {
    for (const sysCap of sysCaps) {
      const result = this.checkSysCap(sysCap);
      if (!result.supported) {
        Logger.warn(TAG, `SysCap ${sysCap} is not supported`);
        return false;
      }
    }
    return true;
  }
  
  /**
   * 获取设备类型
   */
  getDeviceType(): string {
    return this.getVersionInfo().deviceType;
  }
  
  /**
   * 检查是否为手机设备
   */
  isPhone(): boolean {
    return this.getDeviceType() === 'phone';
  }
  
  /**
   * 检查是否为平板设备
   */
  isTablet(): boolean {
    return this.getDeviceType() === 'tablet';
  }
  
  /**
   * 检查是否为手表设备
   */
  isWearable(): boolean {
    return this.getDeviceType() === 'wearable';
  }
  
  /**
   * 检查是否为2合1设备
   */
  is2in1(): boolean {
    return this.getDeviceType() === '2in1';
  }
  
  /**
   * 检查是否为车机设备
   */
  isCar(): boolean {
    return this.getDeviceType() === 'car';
  }
  
  /**
   * 检查是否为智慧屏设备
   */
  isTv(): boolean {
    return this.getDeviceType() === 'tv';
  }
  
  /**
   * 获取兼容性报告
   */
  getCompatibilityReport(): string {
    const info = this.getVersionInfo();
    const report = `
========================================
      HarmonyOS API兼容性报告
========================================
设备类型: ${info.deviceType}
OpenHarmony API版本: ${info.sdkApiVersion}
HarmonyOS API版本: ${info.distributionOSApiName} (${info.distributionOSApiVersion})
首个支持API版本: ${info.firstApiVersion}

API版本对照表:
- API 12 (5.0.0): HarmonyOS 5.0 基础版本
- API 17 (5.0.5): HarmonyOS 5.0.5 增强版本
- API 20 (6.0.0): HarmonyOS 6.0 基础版本
- API 22 (6.0.2): HarmonyOS 6.0.2 增强版本
- API 24 (6.1.1): HarmonyOS 6.1.1 最新版本
========================================
    `;
    return report;
  }
  
  /**
   * 打印兼容性报告
   */
  printCompatibilityReport(): void {
    Logger.info(TAG, this.getCompatibilityReport());
  }
}

/**
 * 常用API版本常量
 */
export class ApiVersion {
  /** HarmonyOS 5.0.0 (API 12) */
  static readonly API_12 = 12;
  /** HarmonyOS 5.0.5 (API 17) */
  static readonly API_17 = 17;
  /** HarmonyOS 6.0.0 (API 20) */
  static readonly API_20 = 20;
  /** HarmonyOS 6.0.2 (API 22) */
  static readonly API_22 = 22;
  /** HarmonyOS 6.1.1 (API 24) */
  static readonly API_24 = 24;
  
  /** HarmonyOS 5.0.0 版本名 */
  static readonly VERSION_5_0_0 = '5.0.0';
  /** HarmonyOS 5.0.5 版本名 */
  static readonly VERSION_5_0_5 = '5.0.5';
  /** HarmonyOS 6.0.0 版本名 */
  static readonly VERSION_6_0_0 = '6.0.0';
  /** HarmonyOS 6.0.2 版本名 */
  static readonly VERSION_6_0_2 = '6.0.2';
  /** HarmonyOS 6.1.1 版本名 */
  static readonly VERSION_6_1_1 = '6.1.1';
}

/**
 * 常用系统能力常量
 */
export class SystemCapability {
  /** 位置服务核心能力 */
  static readonly LOCATION_CORE = 'SystemCapability.Location.Location.Core';
  /** 位置服务地理编码能力 */
  static readonly LOCATION_GEOCODE = 'SystemCapability.Location.Location.Geocode';
  /** 传感器服务能力 */
  static readonly SENSOR = 'SystemCapability.SensorService.Interface';
  /** 计步器能力 */
  static readonly PEDOMETER = 'SystemCapability.SensorService.Pedometer';
  /** 通知服务能力 */
  static readonly NOTIFICATION_CORE = 'SystemCapability.Notification.Notification';
  /** 后台任务能力 */
  static readonly BACKGROUND_TASK = 'SystemCapability.BackgroundTasks.BackgroundTaskManager';
  /** 媒体能力 */
  static readonly MEDIA = 'SystemCapability.Multimedia.Media.Core';
  /** 相机能力 */
  static readonly CAMERA = 'SystemCapability.Multimedia.Camera.Core';
  /** 网络能力 */
  static readonly NETWORK = 'SystemCapability.Communication.NetStack';
  /** 蓝牙能力 */
  static readonly BLUETOOTH = 'SystemCapability.Communication.Bluetooth.Core';
  /** WiFi能力 */
  static readonly WIFI = 'SystemCapability.Communication.WiFi.Core';
  /** 振动能力 */
  static readonly VIBRATOR = 'SystemCapability.SensorService.Vibrator';
}

/**
 * 获取API版本检查工具实例
 */
export function getApiVersionUtil(): ApiVersionUtil {
  return ApiVersionUtil.getInstance();
}

// 导出默认实例
export default ApiVersionUtil.getInstance();
