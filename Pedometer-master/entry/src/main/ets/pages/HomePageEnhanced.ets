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

import { abilityAccessCtrl, common } from '@kit.AbilityKit';
import { geoLocationManager } from '@kit.LocationKit';
import { sensor } from '@kit.SensorServiceKit';
import { i18n } from '@kit.LocalizationKit';
import { router } from '@kit.ArkUI';
import { BackgroundUtil } from '../common/utils/BackgroundUtil';
import { CompletionStatus } from '../view/CompletionStatus';
import { CommonConstants } from '../common/constants/CommonConstants';
import { CurrentSituation } from '../view/CurrentSituation';
import { StatsCard, StepChart, ChartType, ChartDataItem } from '../view/StepChart';
import { GoalAchievedDialog, GoalAchievedDialogManager } from '../view/GoalAchievedDialog';
import LocationUtil from '../common/utils/LocationUtil';
import Logger from '../common/utils/Logger';
import NumberUtil from '../common/utils/NumberUtil';
import StepsUtil from '../common/utils/StepsUtil';
import { getStepDatabaseUtil, StepRecord } from '../common/utils/StepDatabaseUtil';
import { getSedentaryReminderUtil } from '../common/utils/SedentaryReminderUtil';
import { getSportsDataCalculator, SportsData } from '../common/utils/SportsDataCalculator';
import { DialogData } from '../common/types/Types';

const TAG: string = 'HomePageEnhanced';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');

/**
 * 增强版主页面
 * 
 * 新增功能:
 * 1. 每日步数目标设定与进度显示
 * 2. 运动数据可视化（卡路里、距离）
 * 3. 久坐提醒功能
 * 4. 历史数据存储与查询
 * 5. 目标达成弹窗提示
 * 
 * 使用的HarmonyOS API:
 * - @kit.SensorServiceKit.sensor: 计步器传感器
 * - @kit.LocationKit.geoLocationManager: 位置服务
 * - @kit.ArkData.relationalStore: 关系型数据库
 * - @kit.NotificationKit.notificationManager: 通知管理
 * - @kit.ArkUI.router: 页面路由
 */
@Entry
@Component
struct HomePageEnhanced {
  // 基础状态
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

  // 新增功能状态
  @State calories: number = 0;              // 卡路里消耗
  @State distance: number = 0;              // 运动距离（米）
  @State duration: number = 0;              // 运动时长（分钟）
  @State sedentaryMinutes: number = 0;      // 久坐时长（分钟）
  @State isSedentaryReminderEnabled: boolean = true; // 久坐提醒开关
  @State showStats: boolean = true;         // 是否显示统计卡片
  @State chartData: ChartDataItem[] = [];   // 图表数据

  // 工具类实例
  private context: common.UIAbilityContext = uiContext?.getHostContext() as common.UIAbilityContext;
  private dbUtil = getStepDatabaseUtil(this.context);
  private sedentaryUtil = getSedentaryReminderUtil(this.context);
  private sportsCalculator = getSportsDataCalculator();
  private goalDialogManager = new GoalAchievedDialogManager();
  private hasGoalAchieved: boolean = false; // 今日是否已达成目标

  // 传感器回调
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

      if (StepsUtil.checkStrIsEmpty(this.stepGoal) || !this.isStart) {
        return;
      }

      // 保存当前步数
      StepsUtil.putStorageValue(CommonConstants.CURRENT_STEPS, this.currentSteps);

      // 计算进度
      const currentStepsNum = NumberUtil._parseInt(this.currentSteps, 10);
      const goalStepsNum = NumberUtil._parseInt(this.stepGoal, 10);
      this.progressValue = StepsUtil.getProgressValue(goalStepsNum, currentStepsNum);
      StepsUtil.putStorageValue(CommonConstants.PROGRESS_VALUE_TAG, String(this.progressValue));

      // 计算运动数据（卡路里、距离）
      this.calculateSportsData(currentStepsNum);

      // 更新久坐提醒
      if (this.isSedentaryReminderEnabled) {
        this.sedentaryUtil.updateActivity(currentStepsNum);
      }

      // 检查目标达成
      this.checkGoalAchieved(currentStepsNum, goalStepsNum);

    } catch (err) {
      Logger.error(TAG, 'Sensor on err' + JSON.stringify(err));
    }
  }

  // 位置回调
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

  async aboutToAppear() {
    // 初始化数据库
    await this.dbUtil.initDatabase();
    
    // 初始化数据
    this.init();
    
    // 请求权限
    this.requestPermissions();
    
    // 加载图表数据
    await this.loadChartData();
  }

  onPageShow() {
    this.init();
    this.requestPermissions();
  }

  onPageHide() {
    try {
      sensor.off(sensor.SensorId.PEDOMETER);
      this.sedentaryUtil.stopMonitoring();
    } catch (err) {
      Logger.error(TAG, `close sensor failed Cause:  ${JSON.stringify(err)}`);
    }
  }

  /**
   * 初始化数据
   */
  init() {
    StepsUtil.getStorageValue(CommonConstants.IS_START).then((res: string) => {
      if (res === CommonConstants.TRUE) {
        this.isStart = true;
        StepsUtil.getStorageValue(CommonConstants.CURRENT_STEPS).then((res: string) => {
          if (StepsUtil.checkStrIsEmpty(res)) {
            return;
          }
          this.currentSteps = res;
          // 计算运动数据
          this.calculateSportsData(NumberUtil._parseInt(res, 10));
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
        // 设置默认目标
        this.stepGoal = CommonConstants.DEFAULT_STEP_GOAL.toString();
        StepsUtil.putStorageValue(CommonConstants.STEP_GOAL, this.stepGoal);
      } else {
        this.stepGoal = res;
      }
    });

    // 加载久坐提醒设置
    StepsUtil.getStorageValue(CommonConstants.SEDENTARY_REMINDER_ENABLED).then((res: string) => {
      this.isSedentaryReminderEnabled = res !== CommonConstants.FALSE;
    });
  }

  /**
   * 请求权限
   */
  requestPermissions(): void {
    let atManager = abilityAccessCtrl.createAtManager();
    try {
      atManager.requestPermissionsFromUser(this.context, CommonConstants.REQUEST_PERMISSIONS).then((data) => {
        if (data.authResults[0] !== 0 || data.authResults[1] !== 0) {
          return;
        }
        try {
          // 订阅计步器传感器
          sensor.on(sensor.SensorId.PEDOMETER, this.sensorCallback, { interval: CommonConstants.SENSOR_INTERVAL });
        } catch (err) {
          console.error('On fail, errCode: ' + JSON.stringify(err));
        }

        // 订阅位置服务
        LocationUtil.geolocationOn(this.getGeolocation);
      }).catch((err: Error) => {
        Logger.error(TAG, 'requestPermissionsFromUser err' + JSON.stringify(err));
      })
    } catch (err) {
      Logger.error(TAG, 'requestPermissionsFromUser err' + JSON.stringify(err));
    }
  }

  /**
   * 计算运动数据（卡路里、距离）
   */
  private calculateSportsData(steps: number): void {
    const sportsData = this.sportsCalculator.calculateSportsData(steps);
    this.calories = sportsData.calories;
    this.distance = sportsData.distance;
    this.duration = sportsData.duration;
  }

  /**
   * 检查目标达成
   */
  private checkGoalAchieved(currentSteps: number, goalSteps: number): void {
    if (currentSteps >= goalSteps && !this.hasGoalAchieved) {
      this.hasGoalAchieved = true;
      
      // 保存今日数据到数据库
      this.saveTodayData(currentSteps, goalSteps);
      
      // 显示目标达成弹窗
      this.showGoalAchievedDialog(currentSteps, goalSteps);
    }
  }

  /**
   * 保存今日数据到数据库
   */
  private async saveTodayData(steps: number, goal: number): Promise<void> {
    const today = this.dbUtil.getTodayDate();
    const record: StepRecord = {
      date: today,
      steps: steps,
      goal: goal,
      calories: this.calories,
      distance: this.distance
    };
    
    await this.dbUtil.saveStepRecord(record);
    Logger.info(TAG, `Today's data saved: ${steps} steps`);
  }

  /**
   * 显示目标达成弹窗
   */
  private showGoalAchievedDialog(steps: number, goal: number): void {
    if (uiContext) {
      const dialogData: DialogData = {
        steps: steps,
        goal: goal,
        calories: this.calories,
        distance: this.distance,
        duration: this.duration
      };
      this.goalDialogManager.show(uiContext, dialogData);
    }
  }

  /**
   * 加载图表数据
   */
  private async loadChartData(): Promise<void> {
    const records = await this.dbUtil.getRecentRecords(7);
    this.chartData = records.map((record: StepRecord): ChartDataItem => {
      return {
        label: record.date,
        value: record.steps,
        goal: record.goal
      };
    });
  }

  build() {
    Column() {
      // 标题栏
      this.TitleBar()

      Scroll() {
        Column() {
          // 进度显示区域
          CompletionStatus({
            progressValue: $progressValue
          })

          // 当前状态显示
          CurrentSituation({
            currentSteps: this.currentSteps,
            startPosition: this.startPosition,
            currentLocation: this.currentLocation
          })

          // 运动数据统计卡片
          if (this.showStats && this.isStart) {
            StatsCard({
              calories: this.calories,
              distance: this.distance,
              steps: NumberUtil._parseInt(this.currentSteps, 10),
              goal: NumberUtil._parseInt(this.stepGoal, 10)
            })
          }

          // 久坐提醒状态
          if (this.isSedentaryReminderEnabled && this.isStart) {
            this.SedentaryStatusCard()
          }

          // 控制按钮区域
          this.ControlButtons()

          // 快捷功能入口
          this.QuickActions()
        }
        .width('100%')
        .padding({ left: 15, right: 15, bottom: 20 })
      }
      .width('100%')
      .layoutWeight(1)
      .scrollBar(BarState.Off)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  /**
   * 标题栏
   */
  @Builder
  TitleBar() {
    Row() {
      Text('计步器')
        .fontSize(20)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Medium)

      Blank()

      // 设置按钮
      Button() {
        Text('⚙')
          .fontSize(20)
          .fontColor(Color.White)
      }
      .width(40)
      .height(40)
      .backgroundColor(Color.Transparent)
      .onClick(() => {
        // 打开设置页面
        // router.pushUrl({ url: 'pages/SettingsPage' });
      })
    }
    .width('100%')
    .height(56)
    .padding({ left: 15, right: 10 })
    .linearGradient({
      angle: 135,
      colors: [['#4ECDC4', 0], ['#45B7AA', 1]]
    })
  }

  /**
   * 久坐状态卡片
   */
  @Builder
  SedentaryStatusCard() {
    Column() {
      Row() {
        Text('久坐提醒')
          .fontSize(14)
          .fontColor('#333333')
          .fontWeight(FontWeight.Medium)

        Blank()

        // 开关
        Toggle({ type: ToggleType.Switch, isOn: this.isSedentaryReminderEnabled })
          .onChange((isOn: boolean) => {
            this.isSedentaryReminderEnabled = isOn;
            StepsUtil.putStorageValue(CommonConstants.SEDENTARY_REMINDER_ENABLED, String(isOn));
            
            if (isOn) {
              this.sedentaryUtil.startMonitoring(CommonConstants.SEDENTARY_THRESHOLD_MINUTES);
            } else {
              this.sedentaryUtil.stopMonitoring();
            }
          })
      }
      .width('100%')
      .margin({ bottom: 10 })

      if (this.isSedentaryReminderEnabled) {
        Row() {
          Text('未活动时间:')
            .fontSize(12)
            .fontColor('#666666')

          Text(`${this.sedentaryUtil.getInactiveMinutes()} 分钟`)
            .fontSize(12)
            .fontColor('#4ECDC4')
            .margin({ left: 5 })

          Blank()

          Text(`提醒阈值: ${CommonConstants.SEDENTARY_THRESHOLD_MINUTES}分钟`)
            .fontSize(12)
            .fontColor('#999999')
        }
        .width('100%')
      }
    }
    .width('100%')
    .padding(15)
    .backgroundColor(Color.White)
    .borderRadius(12)
    .margin({ top: 10 })
  }

  /**
   * 控制按钮区域
   */
  @Builder
  ControlButtons() {
    Row() {
      Button(this.isStart ? '停止' : '开始')
        .width('45%')
        .height(50)
        .borderRadius(25)
        .backgroundColor(this.isStart ? '#FF6B6B' : '#4ECDC4')
        .fontSize(16)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Medium)
        .onClick(() => {
          this.handleStartStop();
        })

      // 保存按钮
      Button('保存')
        .width('45%')
        .height(50)
        .borderRadius(25)
        .backgroundColor('#FFE66D')
        .fontSize(16)
        .fontColor('#333333')
        .fontWeight(FontWeight.Medium)
        .onClick(async () => {
          await this.saveTodayData(
            NumberUtil._parseInt(this.currentSteps, 10),
            NumberUtil._parseInt(this.stepGoal, 10)
          );
          this.getUIContext().getPromptAction().showToast({ message: '数据已保存' });
        })
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .margin({ top: 20 })
  }

  /**
   * 处理开始/停止
   */
  private handleStartStop(): void {
    if (this.isStart) {
      // 停止计步
      this.isStart = false;
      this.oldSteps = '';
      StepsUtil.CleanStepsData();
      BackgroundUtil.stopContinuousTask(this.context);
      this.sedentaryUtil.stopMonitoring();
      
      // 保存今日数据
      this.saveTodayData(
        NumberUtil._parseInt(this.currentSteps, 10),
        NumberUtil._parseInt(this.stepGoal, 10)
      );
    } else {
      // 开始计步
      if (this.stepGoal === '' || this.currentLocation === '') {
        this.getUIContext().getPromptAction().showToast({ message: CommonConstants.WAIT });
      } else {
        this.isStart = true;
        this.startPosition = this.currentLocation;
        StepsUtil.putStorageValue(CommonConstants.START_POSITION, this.startPosition);
        this.currentSteps = CommonConstants.INITIALIZATION_VALUE;
        this.progressValue = 0;
        this.hasGoalAchieved = false;
        BackgroundUtil.startContinuousTask(this.context);
        
        // 启动久坐提醒
        if (this.isSedentaryReminderEnabled) {
          this.sedentaryUtil.startMonitoring(CommonConstants.SEDENTARY_THRESHOLD_MINUTES);
        }
      }
    }
    StepsUtil.putStorageValue(CommonConstants.IS_START, String(this.isStart));
  }

  /**
   * 快捷功能入口
   */
  @Builder
  QuickActions() {
    Column() {
      Text('更多功能')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .width('100%')
        .margin({ bottom: 15 })

      Row() {
        // 历史数据
        this.ActionItem('📊', '历史数据', () => {
          router.pushUrl({ url: 'pages/HistoryPage' });
        })

        // 数据统计
        this.ActionItem('📈', '数据统计', () => {
          this.showStats = !this.showStats;
        })

        // 设置目标
        this.ActionItem('🎯', '设置目标', () => {
          // 打开目标设置对话框
        })
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .width('100%')
    .padding(15)
    .backgroundColor(Color.White)
    .borderRadius(12)
    .margin({ top: 20 })
  }

  /**
   * 快捷功能项
   */
  @Builder
  ActionItem(icon: string, label: string, action: () => void) {
    Column() {
      Text(icon)
        .fontSize(30)
        .margin({ bottom: 5 })

      Text(label)
        .fontSize(12)
        .fontColor('#666666')
    }
    .width('30%')
    .padding(15)
    .backgroundColor('#F5F5F5')
    .borderRadius(10)
    .onClick(action)
  }
}
