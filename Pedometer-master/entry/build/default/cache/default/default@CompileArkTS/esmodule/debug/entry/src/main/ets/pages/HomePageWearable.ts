if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePageWearable_Params {
    currentSteps?: string;
    stepGoal?: string;
    oldSteps?: string;
    startPosition?: string;
    currentLocation?: string;
    locale?: string;
    latitude?: number;
    longitude?: number;
    progressValue?: number;
    isStart?: boolean;
    context?: common.UIAbilityContext;
    sensorCallback?: (data: sensor.PedometerResponse) => void;
    getGeolocation?: (location: geoLocationManager.Location) => void;
}
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type common from "@ohos:app.ability.common";
import geoLocationManager from "@ohos:geoLocationManager";
import sensor from "@ohos:sensor";
import i18n from "@ohos:i18n";
import { BackgroundUtil } from "@normalized:N&&&entry/src/main/ets/common/utils/BackgroundUtil&";
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/constants/CommonConstants&";
import LocationUtil from "@normalized:N&&&entry/src/main/ets/common/utils/LocationUtil&";
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
import NumberUtil from "@normalized:N&&&entry/src/main/ets/common/utils/NumberUtil&";
import StepsUtil from "@normalized:N&&&entry/src/main/ets/common/utils/StepsUtil&";
const TAG: string = 'HomePageWearable';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
class HomePageWearable extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentSteps = new ObservedPropertySimplePU(CommonConstants.INITIALIZATION_VALUE, this, "currentSteps");
        this.__stepGoal = new ObservedPropertySimplePU('', this, "stepGoal");
        this.addProvidedVar("stepGoal", this.__stepGoal, false);
        this.__oldSteps = new ObservedPropertySimplePU('', this, "oldSteps");
        this.__startPosition = new ObservedPropertySimplePU('', this, "startPosition");
        this.__currentLocation = new ObservedPropertySimplePU('', this, "currentLocation");
        this.__locale = new ObservedPropertySimplePU(i18n.System.getAppPreferredLanguage(), this, "locale");
        this.__latitude = new ObservedPropertySimplePU(0, this, "latitude");
        this.__longitude = new ObservedPropertySimplePU(0, this, "longitude");
        this.__progressValue = new ObservedPropertySimplePU(0, this, "progressValue");
        this.__isStart = new ObservedPropertySimplePU(false, this, "isStart");
        this.context = uiContext?.getHostContext() as common.UIAbilityContext;
        this.sensorCallback = (data: sensor.PedometerResponse) => {
            try {
                if (this.isStart) {
                    if (StepsUtil.checkStrIsEmpty(this.oldSteps)) {
                        this.oldSteps = data.steps.toString();
                        StepsUtil.putStorageValue(CommonConstants.OLD_STEPS, this.oldSteps);
                    }
                    else {
                        this.currentSteps = (data.steps - NumberUtil._parseInt(this.oldSteps, 10)).toString();
                    }
                }
                else {
                    this.currentSteps = data.steps.toString();
                }
                if (StepsUtil.checkStrIsEmpty(this.stepGoal) || !this.isStart) {
                    return;
                }
                StepsUtil.putStorageValue(CommonConstants.CURRENT_STEPS, this.currentSteps);
                this.progressValue = StepsUtil.getProgressValue(NumberUtil._parseInt(this.stepGoal, 10), NumberUtil._parseInt(this.currentSteps, 10));
                StepsUtil.putStorageValue(CommonConstants.PROGRESS_VALUE_TAG, String(this.progressValue));
            }
            catch (err) {
                Logger.error(TAG, 'Sensor on err' + JSON.stringify(err));
            }
        };
        this.getGeolocation = (location: geoLocationManager.Location) => {
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
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePageWearable_Params) {
        if (params.currentSteps !== undefined) {
            this.currentSteps = params.currentSteps;
        }
        if (params.stepGoal !== undefined) {
            this.stepGoal = params.stepGoal;
        }
        if (params.oldSteps !== undefined) {
            this.oldSteps = params.oldSteps;
        }
        if (params.startPosition !== undefined) {
            this.startPosition = params.startPosition;
        }
        if (params.currentLocation !== undefined) {
            this.currentLocation = params.currentLocation;
        }
        if (params.locale !== undefined) {
            this.locale = params.locale;
        }
        if (params.latitude !== undefined) {
            this.latitude = params.latitude;
        }
        if (params.longitude !== undefined) {
            this.longitude = params.longitude;
        }
        if (params.progressValue !== undefined) {
            this.progressValue = params.progressValue;
        }
        if (params.isStart !== undefined) {
            this.isStart = params.isStart;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.sensorCallback !== undefined) {
            this.sensorCallback = params.sensorCallback;
        }
        if (params.getGeolocation !== undefined) {
            this.getGeolocation = params.getGeolocation;
        }
    }
    updateStateVars(params: HomePageWearable_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentSteps.purgeDependencyOnElmtId(rmElmtId);
        this.__stepGoal.purgeDependencyOnElmtId(rmElmtId);
        this.__oldSteps.purgeDependencyOnElmtId(rmElmtId);
        this.__startPosition.purgeDependencyOnElmtId(rmElmtId);
        this.__currentLocation.purgeDependencyOnElmtId(rmElmtId);
        this.__locale.purgeDependencyOnElmtId(rmElmtId);
        this.__latitude.purgeDependencyOnElmtId(rmElmtId);
        this.__longitude.purgeDependencyOnElmtId(rmElmtId);
        this.__progressValue.purgeDependencyOnElmtId(rmElmtId);
        this.__isStart.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentSteps.aboutToBeDeleted();
        this.__stepGoal.aboutToBeDeleted();
        this.__oldSteps.aboutToBeDeleted();
        this.__startPosition.aboutToBeDeleted();
        this.__currentLocation.aboutToBeDeleted();
        this.__locale.aboutToBeDeleted();
        this.__latitude.aboutToBeDeleted();
        this.__longitude.aboutToBeDeleted();
        this.__progressValue.aboutToBeDeleted();
        this.__isStart.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentSteps: ObservedPropertySimplePU<string>;
    get currentSteps() {
        return this.__currentSteps.get();
    }
    set currentSteps(newValue: string) {
        this.__currentSteps.set(newValue);
    }
    private __stepGoal: ObservedPropertySimplePU<string>;
    get stepGoal() {
        return this.__stepGoal.get();
    }
    set stepGoal(newValue: string) {
        this.__stepGoal.set(newValue);
    }
    private __oldSteps: ObservedPropertySimplePU<string>;
    get oldSteps() {
        return this.__oldSteps.get();
    }
    set oldSteps(newValue: string) {
        this.__oldSteps.set(newValue);
    }
    private __startPosition: ObservedPropertySimplePU<string>;
    get startPosition() {
        return this.__startPosition.get();
    }
    set startPosition(newValue: string) {
        this.__startPosition.set(newValue);
    }
    private __currentLocation: ObservedPropertySimplePU<string>;
    get currentLocation() {
        return this.__currentLocation.get();
    }
    set currentLocation(newValue: string) {
        this.__currentLocation.set(newValue);
    }
    private __locale: ObservedPropertySimplePU<string>;
    get locale() {
        return this.__locale.get();
    }
    set locale(newValue: string) {
        this.__locale.set(newValue);
    }
    private __latitude: ObservedPropertySimplePU<number>;
    get latitude() {
        return this.__latitude.get();
    }
    set latitude(newValue: number) {
        this.__latitude.set(newValue);
    }
    private __longitude: ObservedPropertySimplePU<number>;
    get longitude() {
        return this.__longitude.get();
    }
    set longitude(newValue: number) {
        this.__longitude.set(newValue);
    }
    private __progressValue: ObservedPropertySimplePU<number>;
    get progressValue() {
        return this.__progressValue.get();
    }
    set progressValue(newValue: number) {
        this.__progressValue.set(newValue);
    }
    private __isStart: ObservedPropertySimplePU<boolean>;
    get isStart() {
        return this.__isStart.get();
    }
    set isStart(newValue: boolean) {
        this.__isStart.set(newValue);
    }
    private context: common.UIAbilityContext;
    private sensorCallback: (data: sensor.PedometerResponse) => void;
    private getGeolocation: (location: geoLocationManager.Location) => void;
    onPageShow() {
        this.init();
        this.requestPermissions();
    }
    onPageHide() {
        try {
            sensor.off(sensor.SensorId.PEDOMETER);
        }
        catch (err) {
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
            }
            else {
                this.isStart = false;
            }
        });
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
                }
                catch (err) {
                    console.error('On fail, errCode: ' + JSON.stringify(err));
                }
                LocationUtil.geolocationOn(this.getGeolocation);
            }).catch((err: Error) => {
                Logger.error(TAG, 'requestPermissionsFromUser err' + JSON.stringify(err));
            });
        }
        catch (err) {
            Logger.error(TAG, 'requestPermissionsFromUser err' + JSON.stringify(err));
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#0A0A0F');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 应用图标和标题区域
            Row.create();
            // 应用图标和标题区域
            Row.width('100%');
            // 应用图标和标题区域
            Row.padding(12);
            // 应用图标和标题区域
            Row.justifyContent(FlexAlign.Start);
            // 应用图标和标题区域
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 应用图标 - 可点击进入应用
            Image.create({ "id": 16777435, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            // 应用图标 - 可点击进入应用
            Image.width(40);
            // 应用图标 - 可点击进入应用
            Image.height(40);
            // 应用图标 - 可点击进入应用
            Image.borderRadius(20);
            // 应用图标 - 可点击进入应用
            Image.onClick(() => {
                // 点击图标可以刷新数据或执行其他操作
                this.init();
                this.getUIContext().getPromptAction().showToast({
                    message: '计步器已启动',
                    duration: 1500
                });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日');
            Text.fontSize(18);
            Text.fontColor('#FFFFFF');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        // 应用图标和标题区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatSteps(this.currentSteps));
            Text.fontSize(40);
            Text.fontColor('#FFFFFF');
            Text.fontWeight(FontWeight.Bold);
            Text.alignSelf(ItemAlign.Center);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('步');
            Text.fontSize(14);
            Text.fontColor('#A8A8B3');
            Text.alignSelf(ItemAlign.Center);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isStart ? 'stop' : 'start', { stateEffect: true, type: ButtonType.Capsule });
            Button.width(120);
            Button.height(40);
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor('#007DFF');
            Button.enabled(true);
            Button.onClick(() => {
                this.handleStartRunning();
            });
        }, Button);
        Button.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('current steps:');
            Text.fontSize(12);
            Text.fontColor('#A8A8B3');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentSteps);
            Text.fontSize(12);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('start position:');
            Text.fontSize(12);
            Text.fontColor('#A8A8B3');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.startPosition);
            Text.fontSize(12);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('current location:');
            Text.fontSize(12);
            Text.fontColor('#A8A8B3');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentLocation);
            Text.fontSize(12);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 12, right: 12 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: 'placeholder' });
            TextInput.height(40);
            TextInput.width('100%');
            TextInput.placeholderColor('#A8A8B3');
            TextInput.backgroundColor('#FFFFFF');
            TextInput.placeholderFont({ size: 14 });
            TextInput.onChange((value: string) => {
                this.stepGoal = value;
            });
        }, TextInput);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('confirm', { stateEffect: true, type: ButtonType.Capsule });
            Button.width(120);
            Button.height(40);
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor('#007DFF');
            Button.enabled(true);
            Button.onClick(() => {
                StepsUtil.putStorageValue(CommonConstants.STEP_GOAL, this.stepGoal);
            });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
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
        }
        else {
            if (this.stepGoal === '' || this.currentLocation === '') {
                this.getUIContext().getPromptAction().showToast({ message: CommonConstants.WAIT });
            }
            else {
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HomePageWearable";
    }
}
registerNamedRoute(() => new HomePageWearable(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "pages/HomePageWearable", pageFullPath: "entry/src/main/ets/pages/HomePageWearable", integratedHsp: "false", moduleType: "followWithHap" });
