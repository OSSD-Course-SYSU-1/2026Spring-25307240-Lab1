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
import { DeviceUtil } from '../common/utils/DeviceUtil';

const TAG: string = 'HomePageWearable';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');

@Entry
@Component
struct HomePageWearable {
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

  private context: common.UIAbilityContext = uiContext?.getHostContext() as common.UIAbilityContext;
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
      StepsUtil.putStorageValue(CommonConstants.CURRENT_STEPS, this.currentSteps);
      this.progressValue = StepsUtil.getProgressValue(NumberUtil._parseInt(this.stepGoal, 10),
        NumberUtil._parseInt(this.currentSteps, 10));
      StepsUtil.putStorageValue(CommonConstants.PROGRESS_VALUE_TAG, String(this.progressValue));
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
  }

  onPageHide() {
    try {
      sensor.off(sensor.SensorId.PEDOMETER);
    } catch (err) {
      Logger.error(TAG, `close sensor failed Cause:  ${JSON.stringify(err)}`);
    }
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
    Column() {
      // 应用图标和标题区域
      Row() {
        // 应用图标 - 可点击进入应用
        Image($r('app.media.icon'))
          .width(40)
          .height(40)
          .borderRadius(20)
          .onClick(() => {
            // 点击图标可以刷新数据或执行其他操作
            this.init();
            this.getUIContext().getPromptAction().showToast({ 
              message: '计步器已启动',
              duration: 1500
            });
          })
        
        Text('今日')
          .fontSize(18)
          .fontColor('#FFFFFF')
          .fontWeight(FontWeight.Bold)
          .margin({ left: 12 })
      }
      .width('100%')
      .padding(12)
      .justifyContent(FlexAlign.Start)
      .alignItems(VerticalAlign.Center)

      Column() {
        Text(this.formatSteps(this.currentSteps))
          .fontSize(40)
          .fontColor('#FFFFFF')
          .fontWeight(FontWeight.Bold)
          .alignSelf(ItemAlign.Center)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Center)

      Column() {
        Text('步')
          .fontSize(14)
          .fontColor('#A8A8B3')
          .alignSelf(ItemAlign.Center)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Center)

      Column() {
        Button(this.isStart ? 'stop' : 'start', { stateEffect: true, type: ButtonType.Capsule })
          .width(120)
          .height(40)
          .fontSize(16)
          .fontWeight(FontWeight.Medium)
          .backgroundColor('#007DFF')
          .enabled(true)
          .onClick(() => {
            this.handleStartRunning();
          })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Center)

      Column() {
        Row() {
          Text('current steps:')
            .fontSize(12)
            .fontColor('#A8A8B3')
          Text(this.currentSteps)
            .fontSize(12)
            .fontColor('#FFFFFF')
        }
        .width('100%')
        .justifyContent(FlexAlign.Start)
        .alignItems(VerticalAlign.Center)

        Row() {
          Text('start position:')
            .fontSize(12)
            .fontColor('#A8A8B3')
          Text(this.startPosition)
            .fontSize(12)
            .fontColor('#FFFFFF')
        }
        .width('100%')
        .justifyContent(FlexAlign.Start)
        .alignItems(VerticalAlign.Center)

        Row() {
          Text('current location:')
            .fontSize(12)
            .fontColor('#A8A8B3')
          Text(this.currentLocation)
            .fontSize(12)
            .fontColor('#FFFFFF')
        }
        .width('100%')
        .justifyContent(FlexAlign.Start)
        .alignItems(VerticalAlign.Center)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)

      Column() {
        TextInput({ placeholder: 'placeholder' })
          .height(40)
          .width('100%')
          .placeholderColor('#A8A8B3')
          .backgroundColor('#FFFFFF')
          .placeholderFont({ size: 14 })
          .onChange((value: string) => {
            this.stepGoal = value;
          })
      }
      .width('100%')
      .padding({ left: 12, right: 12 })
      .alignItems(HorizontalAlign.Start)

      Column() {
        Button('confirm', { stateEffect: true, type: ButtonType.Capsule })
          .width(120)
          .height(40)
          .fontSize(16)
          .fontWeight(FontWeight.Medium)
          .backgroundColor('#007DFF')
          .enabled(true)
          .onClick(() => {
            StepsUtil.putStorageValue(CommonConstants.STEP_GOAL, this.stepGoal);
          })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Center)
    }
    .width('100%')
    .backgroundColor('#0A0A0F')
  }

  private formatSteps(steps: string): string {
    const num = NumberUtil._parseInt(steps, 10);
    return num.toLocaleString();
  }

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