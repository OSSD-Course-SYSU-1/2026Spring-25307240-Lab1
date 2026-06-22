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


import { abilityAccessCtrl } from '@kit.AbilityKit';
import { common } from '@kit.AbilityKit';
import { geoLocationManager } from '@kit.LocationKit';
import { sensor } from '@kit.SensorServiceKit';
import { i18n } from '@kit.LocalizationKit';
import { router } from '@kit.ArkUI';
import { BackgroundUtil } from '../common/utils/BackgroundUtil';
import { CommonConstants } from '../common/constants/CommonConstants';
import LocationUtil from '../common/utils/LocationUtil';
import Logger from '../common/utils/Logger';
import NumberUtil from '../common/utils/NumberUtil';
import StepsUtil from '../common/utils/StepsUtil';
import { getSedentaryReminderUtil, SedentaryReminderUtil } from '../common/utils/SedentaryReminderUtil';
import { getUserProfileManager, UserProfile } from '../common/utils/UserProfileManager';
import { getHealthCalculator, CalorieResult, ExerciseIntensity } from '../common/utils/HealthCalculator';
import { getReminderManager } from '../common/utils/ReminderManager';
import { ArcProgressGauge } from '../view/ArcProgressGauge';
import { MetricsBar } from '../view/MetricsBar';
import { QuickActionCard } from '../view/QuickActionCard';
import { FeatureGrid } from '../view/FeatureGrid';
import { BottomNavBar } from '../view/BottomNavBar';
import { DesignSystem } from '../common/constants/DesignSystem';

const TAG: string = 'HomePage';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');

@Entry
@Component
struct HomePage {
  @State currentSteps: string = CommonConstants.INITIALIZATION_VALUE;
  @Provide stepGoal: string = '';
  @State oldSteps: string = '';
  @State startPosition: string = '';
  @State currentLocation: string = '';
  @State locale: string = i18n.System.getAppPreferredLanguage();
  @State latitude: number = 0;
  @State longitude: number = 0;
  @State progressValue: number = 0;
  @State isStart: boolean = false;
  @State sedentaryMinutes: number = 0; // 久坐时间（分钟）
  
  // 用户档案和卡路里消耗
  @State userProfile: UserProfile = {
    weight: 70,
    height: 170,
    age: 25,
    gender: 'male',
    strideLength: 0.7
  };
  @State calorieResult: CalorieResult = {
    totalCalories: 0,
    basalCalories: 0,
    activityCalories: 0,
    stepsCalories: 0,
    distanceCalories: 0
  };
  @State distance: number = 0; // 步行距离（米）
  
  private context: common.UIAbilityContext = uiContext?.getHostContext() as common.UIAbilityContext;
  private sedentaryReminderUtil: SedentaryReminderUtil | null = null; // 久坐监测工具
  private sedentaryUpdateTimer: number = -1; // 久坐时间更新定时器
  private profileManager = getUserProfileManager(this.context);
  private healthCalculator = getHealthCalculator();
  private reminderManager = getReminderManager(this.context);
  private sensorCallback: (data: sensor.PedometerResponse) => void = (data: sensor.PedometerResponse) => {
    try {
      if (this.isStart) {
        if (StepsUtil.checkStrIsEmpty(this.oldSteps)) {
          this.oldSteps = data.steps.toString();
          StepsUtil.putStorageValue(CommonConstants.OLD_STEPS, this.oldSteps);
        } else {
          this.currentSteps = (data.steps - NumberUtil._parseInt(this.oldSteps, 10)).toString();
        }
      } else {
        this.currentSteps = data.steps.toString();
      }

      // 更新久坐监测的活动状态
      if (this.sedentaryReminderUtil) {
        this.sedentaryReminderUtil.updateActivity(data.steps);
      }

      if (StepsUtil.checkStrIsEmpty(this.stepGoal) || !this.isStart) {
        return;
      }
      StepsUtil.putStorageValue(CommonConstants.CURRENT_STEPS, this.currentSteps);
      this.progressValue = StepsUtil.getProgressValue(NumberUtil._parseInt(this.stepGoal, 10),
        NumberUtil._parseInt(this.currentSteps, 10));
      StepsUtil.putStorageValue(CommonConstants.PROGRESS_VALUE_TAG, String(this.progressValue));
      
      // 更新卡路里消耗
      this.updateCalories();
      
      // 检查目标达成
      this.checkGoalAchievement();
    } catch (err) {
      Logger.error(TAG, 'Sensor on err' + JSON.stringify(err));
    }
  }
  private getGeolocation: (location: geoLocationManager.Location) => void = (location: geoLocationManager.Location) => {
    if (this.latitude === location.latitude && this.longitude === location.longitude) {
      return;
    }
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    let reverseGeocodeRequest: geoLocationManager.ReverseGeoCodeRequest = {
      'locale': this.locale.toString().includes('zh') ? 'zh' : 'en',
      'latitude': this.latitude,
      'longitude': this.longitude,
      'maxItems': 1
    };
    geoLocationManager.getAddressesFromLocation(reverseGeocodeRequest).then(data => {
      if (data[0].placeName) {
        this.currentLocation = data[0].placeName;
      }
    }).catch((err: Error) => {
      Logger.error(TAG, 'GetAddressesFromLocation err ' + JSON.stringify(err));
    });
  }

  onPageShow() {
    this.init();
    this.requestPermissions();
    this.initSedentaryMonitoring();
  }

  onPageHide() {
    try {
      sensor.off(sensor.SensorId.PEDOMETER);
    } catch (err) {
      Logger.error(TAG, `close sensor failed Cause:  ${JSON.stringify(err)}`);
    }
    this.stopSedentaryMonitoring();
  }

  init() {
    StepsUtil.getStorageValue(CommonConstants.IS_START).then((res: string) => {
      if (res === CommonConstants.TRUE) {
        this.isStart = true;
        StepsUtil.getStorageValue(CommonConstants.CURRENT_STEPS).then((res: string) => {
          if (StepsUtil.checkStrIsEmpty(res)) {
            return;
          }
          this.currentSteps = res;
          this.updateCalories();
          this.checkGoalAchievement();
        });

        StepsUtil.getStorageValue(CommonConstants.PROGRESS_VALUE_TAG).then((res: string) => {
          if (StepsUtil.checkStrIsEmpty(res)) {
            return;
          }
          this.progressValue = NumberUtil._parseInt(res, 10);
        });

        StepsUtil.getStorageValue(CommonConstants.START_POSITION).then((res: string) => {
          if (StepsUtil.checkStrIsEmpty(res)) {
            return;
          }
          this.startPosition = res;
        });

        StepsUtil.getStorageValue(CommonConstants.OLD_STEPS).then((res: string) => {
          if (StepsUtil.checkStrIsEmpty(res)) {
            return;
          }
          this.oldSteps = res;
        });
      } else {
        this.isStart = false;
      }
    })

    StepsUtil.getStorageValue(CommonConstants.STEP_GOAL).then((res: string) => {
      if (StepsUtil.checkStrIsEmpty(res)) {
        return;
      }
      this.stepGoal = res;
    });
    
    // 加载用户档案
    this.loadUserProfile();
    
    // 加载提醒设置
    this.reminderManager.loadSettings();
  }
  
  /**
   * 加载用户档案
   */
  private async loadUserProfile(): Promise<void> {
    try {
      const profile = await this.profileManager.getUserProfile();
      if (profile) {
        this.userProfile = profile;
        this.updateCalories();
      }
      Logger.info(TAG, 'User profile loaded');
    } catch (err) {
      Logger.error(TAG, `Load user profile failed: ${JSON.stringify(err)}`);
    }
  }
  
  /**
   * 更新卡路里消耗计算
   */
  private updateCalories(): void {
    const steps = NumberUtil._parseInt(this.currentSteps, 10);
    if (steps <= 0 || !this.userProfile.strideLength) {
      return;
    }
    
    // 计算距离
    this.distance = this.healthCalculator.calculateDistance(steps, this.userProfile.strideLength);
    
    // 估算运动时长（假设平均每分钟60步）
    const duration = this.healthCalculator.calculateDuration(steps, 60);
    
    // 评估运动强度
    const intensity = this.healthCalculator.assessIntensity(60);
    
    // 计算卡路里消耗
    this.calorieResult = this.healthCalculator.calculateCalories(this.userProfile, {
      steps: steps,
      distance: this.distance,
      duration: duration,
      intensity: intensity
    });
  }
  
  /**
   * 检查目标达成
   */
  private checkGoalAchievement(): void {
    const currentSteps = NumberUtil._parseInt(this.currentSteps, 10);
    const goalSteps = NumberUtil._parseInt(this.stepGoal, 10);
    
    if (currentSteps > 0 && goalSteps > 0) {
      this.reminderManager.checkGoalAchievement(currentSteps, goalSteps);
    }
  }

  /**
   * 初始化久坐监测
   */
  initSedentaryMonitoring(): void {
    try {
      // 获取久坐监测工具实例
      this.sedentaryReminderUtil = getSedentaryReminderUtil(this.context);
      
      // 启动久坐监测，默认60分钟阈值
      this.sedentaryReminderUtil.startMonitoring(
        CommonConstants.SEDENTARY_THRESHOLD_MINUTES,
        CommonConstants.SEDENTARY_CHECK_INTERVAL_MINUTES
      );
      
      // 启动定时器更新久坐时间显示（每分钟更新一次）
      this.sedentaryUpdateTimer = setInterval(() => {
        if (this.sedentaryReminderUtil) {
          this.sedentaryMinutes = this.sedentaryReminderUtil.getInactiveMinutes();
        }
      }, 60000); // 每分钟更新一次
      
      // 立即更新一次
      if (this.sedentaryReminderUtil) {
        this.sedentaryMinutes = this.sedentaryReminderUtil.getInactiveMinutes();
      }
      
      Logger.info(TAG, 'Sedentary monitoring initialized');
    } catch (err) {
      Logger.error(TAG, `Init sedentary monitoring failed: ${JSON.stringify(err)}`);
    }
  }

  /**
   * 停止久坐监测
   */
  stopSedentaryMonitoring(): void {
    // 停止定时器
    if (this.sedentaryUpdateTimer !== -1) {
      clearInterval(this.sedentaryUpdateTimer);
      this.sedentaryUpdateTimer = -1;
    }
    
    // 停止久坐监测
    if (this.sedentaryReminderUtil) {
      this.sedentaryReminderUtil.stopMonitoring();
    }
    
    Logger.info(TAG, 'Sedentary monitoring stopped');
  }

  requestPermissions(): void {
    let atManager = abilityAccessCtrl.createAtManager();
    try {
      atManager.requestPermissionsFromUser(this.context, CommonConstants.REQUEST_PERMISSIONS).then((data) => {
        if (data.authResults[0] !== 0 || data.authResults[1] !== 0) {
          return;
        }
        const that = this;
        try {
          sensor.on(sensor.SensorId.PEDOMETER, this.sensorCallback, { interval: CommonConstants.SENSOR_INTERVAL });

        } catch (err) {
          console.error('On fail, errCode: ' + JSON.stringify(err));
        }

        LocationUtil.geolocationOn(this.getGeolocation);
      }).catch((err: Error) => {
        Logger.error(TAG, 'requestPermissionsFromUser err' + JSON.stringify(err));
      })
    } catch (err) {
      Logger.error(TAG, 'requestPermissionsFromUser err' + JSON.stringify(err));
    }
  }

  build() {
    Stack() {
      // 渐变背景
      Column()
        .width('100%')
        .height('100%')
        .linearGradient({
          angle: 180,
          colors: [['#0A0A0F', 0], ['#1A1A24', 0.5], ['#0F0F18', 1]]
        })
      
      // 主内容区域
      Column() {
        // 顶部状态栏（模拟手机状态栏）
        this.StatusBar()
        
        // 页面头部区域
        this.HeaderSection()
        
        // 步数统计区
        this.StepsSection()
        
        // 核心环形半圆弧进度仪表盘
        ArcProgressGauge({
          calorieProgress: this.progressValue,
          exerciseProgress: this.progressValue * 0.8,
          hoursProgress: this.progressValue * 0.6
        })
        
        // 三项指标横向数据栏
        MetricsBar({
          calorieCurrent: this.calorieResult.totalCalories,
          calorieGoal: 270,
          exerciseCurrent: Math.floor(NumberUtil._parseInt(this.currentSteps, 10) / 60),
          exerciseGoal: 25,
          hoursCurrent: Math.floor(NumberUtil._parseInt(this.currentSteps, 10) / 360),
          hoursGoal: 12
        })
        
        // 快捷操作横条卡片
        QuickActionCard({
          onStartRunning: () => {
            this.handleStartRunning();
          }
        })
        
        // 2×2网格功能卡片区
        FeatureGrid({
          onStartExercise: () => {
            this.handleStartRunning();
          }
        })
        
        // 底部导航栏
        BottomNavBar()
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }
  
  /**
   * 顶部状态栏（模拟手机状态栏）
   */
  @Builder
  StatusBar() {
    Row() {
      // 动态时间
      Text(this.getCurrentTime())
        .fontSize(DesignSystem.FONT_SIZE_MD)
        .fontColor(DesignSystem.TEXT_PRIMARY)
        .fontWeight(DesignSystem.FONT_WEIGHT_MEDIUM)
      
      Blank()
      
      // 右侧图标组
      Row({ space: DesignSystem.SPACING_SM }) {
        // WiFi图标
        Stack() {
          Path()
            .width(16)
            .height(16)
            .commands('M1 12L8 5L15 12 M3 10L8 5L13 10 M5 8L8 5L11 8 M8 14V5')
            .stroke(DesignSystem.TEXT_PRIMARY)
            .strokeWidth(1.5)
            .fill('transparent')
        }
        .width(20)
        .height(20)
        
        // 5G信号
        Text('5G')
          .fontSize(DesignSystem.FONT_SIZE_XS)
          .fontColor(DesignSystem.TEXT_PRIMARY)
          .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
        
        // 电量图标
        Stack() {
          // 电池外框
          Row()
            .width(22)
            .height(12)
            .borderRadius(2)
            .border({
              width: 1.5,
              color: DesignSystem.TEXT_PRIMARY
            })
          
          // 电量填充
          Row()
            .width(16)
            .height(8)
            .borderRadius(1)
            .linearGradient({
              angle: 90,
              colors: [[DesignSystem.COLOR_SUCCESS, 0], [DesignSystem.COLOR_SUCCESS_LIGHT, 1]]
            })
            .margin({ left: 2 })
          
          // 电池头
          Row()
            .width(2)
            .height(6)
            .borderRadius(1)
            .backgroundColor(DesignSystem.TEXT_PRIMARY)
            .position({ x: 22, y: 3 })
        }
        .width(26)
        .height(14)
      }
    }
    .width('100%')
    .height(DesignSystem.STATUS_BAR_HEIGHT)
    .padding({ left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG })
    .justifyContent(FlexAlign.SpaceBetween)
    .alignItems(VerticalAlign.Center)
  }
  
  /**
   * 获取当前时间
   */
  private getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  /**
   * 页面头部区域
   */
  @Builder
  HeaderSection() {
    Row() {
      // 左上角标题
      Column() {
        Text('今日')
          .fontSize(DesignSystem.FONT_SIZE_3XL)
          .fontColor(DesignSystem.TEXT_PRIMARY)
          .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
        
        // 日期副标题
        Text(this.getDateString())
          .fontSize(DesignSystem.FONT_SIZE_SM)
          .fontColor(DesignSystem.TEXT_SECONDARY)
          .margin({ top: 2 })
      }
      .alignItems(HorizontalAlign.Start)
      
      Blank()
      
      // 右上角操作图标
      Row({ space: DesignSystem.SPACING_MD }) {
        // 搜索按钮
        this.IconButton(
          'M15 15L21 21 M17 11C17 14.3137 14.3137 17 11 17C7.68629 17 5 14.3137 5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11Z',
          () => {}
        )
        
        // 设置按钮
        this.IconButton(
          'M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z M19.4 15C19.2669 15.6304 19.0418 16.2322 18.73 16.78L20.21 18.26C20.4 18.45 20.4 18.75 20.21 18.94L18.94 20.21C18.75 20.4 18.45 20.4 18.26 20.21L16.78 18.73C16.2322 19.0418 15.6304 19.2669 15 19.4V21.5C15 21.78 14.78 22 14.5 22H12.5C12.22 22 12 21.78 12 21.5V19.4C11.3696 19.2669 10.7678 19.0418 10.22 18.73L8.74 20.21C8.55 20.4 8.25 20.4 8.06 20.21L6.79 18.94C6.6 18.75 6.6 18.45 6.79 18.26L8.27 16.78C7.95824 16.2322 7.73314 15.6304 7.6 15H5.5C5.22 15 5 14.78 5 14.5V12.5C5 12.22 5.22 12 5.5 12H7.6C7.73314 11.3696 7.95824 10.7678 8.27 10.22L6.79 8.74C6.6 8.55 6.6 8.25 6.79 8.06L8.06 6.79C8.25 6.6 8.55 6.6 8.74 6.79L10.22 8.27C10.7678 7.95824 11.3696 7.73314 12 7.6V5.5C12 5.22 12.22 5 12.5 5H14.5C14.78 5 15 5.22 15 5.5V7.6C15.6304 7.73314 16.2322 7.95824 16.78 8.27L18.26 6.79C18.45 6.6 18.75 6.6 18.94 6.79L20.21 8.06C20.4 8.25 20.4 8.55 20.21 8.74L18.73 10.22C19.0418 10.7678 19.2669 11.3696 19.4 12H21.5C21.78 12 22 12.22 22 12.5V14.5C22 14.78 21.78 15 21.5 15H19.4Z',
          () => {
            router.pushUrl({ url: 'pages/SettingsPage' });
          }
        )
      }
    }
    .width('100%')
    .padding({ left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG, top: DesignSystem.SPACING_LG, bottom: DesignSystem.SPACING_MD })
    .justifyContent(FlexAlign.SpaceBetween)
  }
  
  /**
   * 图标按钮
   */
  @Builder
  IconButton(pathCommands: string, onClick: () => void) {
    Button() {
      Stack() {
        // 圆形背景
        Circle()
          .width(DesignSystem.ICON_SIZE_XL)
          .height(DesignSystem.ICON_SIZE_XL)
          .fill(DesignSystem.BG_CARD)
        
        // 图标
        Path()
          .width(20)
          .height(20)
          .commands(pathCommands)
          .stroke(DesignSystem.TEXT_PRIMARY)
          .strokeWidth(1.5)
          .fill('transparent')
      }
    }
    .width(DesignSystem.ICON_SIZE_XL)
    .height(DesignSystem.ICON_SIZE_XL)
    .backgroundColor('transparent')
    .padding(0)
    .onClick(onClick)
  }
  
  /**
   * 获取日期字符串
   */
  private getDateString(): string {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[now.getDay()];
    return `${month}月${day}日 ${weekday}`;
  }
  
  /**
   * 步数统计区
   */
  @Builder
  StepsSection() {
    Row() {
      // 脚印图标容器
      Stack() {
        // 背景光晕
        Circle()
          .width(52)
          .height(52)
          .fill(DesignSystem.withAlpha(DesignSystem.COLOR_PRIMARY, 0.15))
        
        // 脚印矢量图标
        Path()
          .width(28)
          .height(28)
          .commands('M14 2C14 2 10 6 10 9C10 11 11 12 14 12C17 12 18 11 18 9C18 6 14 2 14 2Z M8 14C8 14 6 16 6 18C6 20 7 21 8 21C9 21 10 20 10 18C10 16 8 14 8 14Z M20 14C20 14 18 16 18 18C18 20 19 21 20 21C21 21 22 20 22 18C22 16 20 14 20 14Z M14 16C12 16 10 18 10 21C10 24 12 26 14 26C16 26 18 24 18 21C18 18 16 16 14 16Z')
          .stroke(DesignSystem.TEXT_PRIMARY)
          .strokeWidth(1.5)
          .fill('transparent')
      }
      .width(52)
      .height(52)
      .margin({ right: DesignSystem.SPACING_MD })
      
      // 步数文本
      Column() {
        Row() {
          Text(this.formatSteps(this.currentSteps))
            .fontSize(DesignSystem.FONT_SIZE_4XL)
            .fontColor(DesignSystem.TEXT_PRIMARY)
            .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
          
          Text(' / ')
            .fontSize(DesignSystem.FONT_SIZE_2XL)
            .fontColor(DesignSystem.TEXT_TERTIARY)
          
          Text(this.stepGoal || '20,000')
            .fontSize(DesignSystem.FONT_SIZE_2XL)
            .fontColor(DesignSystem.TEXT_SECONDARY)
        }
        .alignItems(VerticalAlign.Bottom)
        
        Row() {
          Text('步')
            .fontSize(DesignSystem.FONT_SIZE_MD)
            .fontColor(DesignSystem.TEXT_SECONDARY)
          
          // 进度百分比
          if (this.progressValue > 0) {
            Text(` · ${Math.round(this.progressValue)}%`)
              .fontSize(DesignSystem.FONT_SIZE_MD)
              .fontColor(DesignSystem.COLOR_PRIMARY)
              .fontWeight(DesignSystem.FONT_WEIGHT_MEDIUM)
          }
        }
        .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      
      Blank()
      
      // 进度环形指示器
      Stack() {
        // 背景圆环
        Circle()
          .width(56)
          .height(56)
          .stroke(DesignSystem.BORDER_LIGHT)
          .strokeWidth(4)
          .fill('transparent')
        
        // 进度圆环
        Circle()
          .width(56)
          .height(56)
          .stroke(DesignSystem.COLOR_PRIMARY)
          .strokeWidth(4)
          .fill('transparent')
          .strokeDashArray([Math.PI * 56 * this.progressValue / 100, Math.PI * 56])
        
        // 中心图标
        Text('👟')
          .fontSize(20)
      }
      .width(56)
      .height(56)
    }
    .width('100%')
    .padding({ left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG, top: DesignSystem.SPACING_XL, bottom: DesignSystem.SPACING_XL })
    .alignItems(VerticalAlign.Center)
  }
  
  /**
   * 格式化步数（添加千分位）
   */
  private formatSteps(steps: string): string {
    const num = NumberUtil._parseInt(steps, 10);
    return num.toLocaleString();
  }
  
  /**
   * 处理开始跑步
   */
  private handleStartRunning(): void {
    if (this.isStart) {
      this.isStart = false;
      this.oldSteps = '';
      StepsUtil.CleanStepsData();
      BackgroundUtil.stopContinuousTask(this.context);
    } else {
      if (this.stepGoal === '' || this.currentLocation === '') {
        this.getUIContext().getPromptAction().showToast({ message: CommonConstants.WAIT });
      } else {
        this.isStart = true;
        this.startPosition = this.currentLocation;
        StepsUtil.putStorageValue(CommonConstants.START_POSITION, this.startPosition);
        this.currentSteps = CommonConstants.INITIALIZATION_VALUE;
        this.progressValue = 0;
        BackgroundUtil.startContinuousTask(this.context);
      }
    }
    StepsUtil.putStorageValue(CommonConstants.IS_START, String(this.isStart));
  }
}
