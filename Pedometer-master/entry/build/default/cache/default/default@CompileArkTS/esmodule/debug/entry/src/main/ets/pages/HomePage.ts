if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
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
    sedentaryMinutes?: number;
    userProfile?: UserProfile;
    calorieResult?: CalorieResult;
    distance?: number;
    context?: common.UIAbilityContext;
    sedentaryReminderUtil?: SedentaryReminderUtil | null;
    sedentaryUpdateTimer?: number;
    profileManager?;
    healthCalculator?;
    reminderManager?;
    sensorCallback?: (data: sensor.PedometerResponse) => void;
    getGeolocation?: (location: geoLocationManager.Location) => void;
}
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type common from "@ohos:app.ability.common";
import geoLocationManager from "@ohos:geoLocationManager";
import sensor from "@ohos:sensor";
import i18n from "@ohos:i18n";
import router from "@ohos:router";
import { BackgroundUtil } from "@normalized:N&&&entry/src/main/ets/common/utils/BackgroundUtil&";
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/constants/CommonConstants&";
import LocationUtil from "@normalized:N&&&entry/src/main/ets/common/utils/LocationUtil&";
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
import NumberUtil from "@normalized:N&&&entry/src/main/ets/common/utils/NumberUtil&";
import StepsUtil from "@normalized:N&&&entry/src/main/ets/common/utils/StepsUtil&";
import { getSedentaryReminderUtil } from "@normalized:N&&&entry/src/main/ets/common/utils/SedentaryReminderUtil&";
import type { SedentaryReminderUtil } from "@normalized:N&&&entry/src/main/ets/common/utils/SedentaryReminderUtil&";
import { getUserProfileManager } from "@normalized:N&&&entry/src/main/ets/common/utils/UserProfileManager&";
import type { UserProfile } from "@normalized:N&&&entry/src/main/ets/common/utils/UserProfileManager&";
import { getHealthCalculator } from "@normalized:N&&&entry/src/main/ets/common/utils/HealthCalculator&";
import type { CalorieResult } from "@normalized:N&&&entry/src/main/ets/common/utils/HealthCalculator&";
import { getReminderManager } from "@normalized:N&&&entry/src/main/ets/common/utils/ReminderManager&";
import { ArcProgressGauge } from "@normalized:N&&&entry/src/main/ets/view/ArcProgressGauge&";
import { MetricsBar } from "@normalized:N&&&entry/src/main/ets/view/MetricsBar&";
import { QuickActionCard } from "@normalized:N&&&entry/src/main/ets/view/QuickActionCard&";
import { FeatureGrid } from "@normalized:N&&&entry/src/main/ets/view/FeatureGrid&";
import { BottomNavBar } from "@normalized:N&&&entry/src/main/ets/view/BottomNavBar&";
import { DesignSystem } from "@normalized:N&&&entry/src/main/ets/common/constants/DesignSystem&";
const TAG: string = 'HomePage';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
class HomePage extends ViewPU {
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
        this.__sedentaryMinutes = new ObservedPropertySimplePU(0, this, "sedentaryMinutes");
        this.__userProfile = new ObservedPropertyObjectPU({
            weight: 70,
            height: 170,
            age: 25,
            gender: 'male',
            strideLength: 0.7
        }, this, "userProfile");
        this.__calorieResult = new ObservedPropertyObjectPU({
            totalCalories: 0,
            basalCalories: 0,
            activityCalories: 0,
            stepsCalories: 0,
            distanceCalories: 0
        }, this, "calorieResult");
        this.__distance = new ObservedPropertySimplePU(0, this, "distance");
        this.context = uiContext?.getHostContext() as common.UIAbilityContext;
        this.sedentaryReminderUtil = null;
        this.sedentaryUpdateTimer = -1;
        this.profileManager = getUserProfileManager(this.context);
        this.healthCalculator = getHealthCalculator();
        this.reminderManager = getReminderManager(this.context);
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
                // 更新久坐监测的活动状态
                if (this.sedentaryReminderUtil) {
                    this.sedentaryReminderUtil.updateActivity(data.steps);
                }
                if (StepsUtil.checkStrIsEmpty(this.stepGoal) || !this.isStart) {
                    return;
                }
                StepsUtil.putStorageValue(CommonConstants.CURRENT_STEPS, this.currentSteps);
                this.progressValue = StepsUtil.getProgressValue(NumberUtil._parseInt(this.stepGoal, 10), NumberUtil._parseInt(this.currentSteps, 10));
                StepsUtil.putStorageValue(CommonConstants.PROGRESS_VALUE_TAG, String(this.progressValue));
                // 更新卡路里消耗
                this.updateCalories();
                // 检查目标达成
                this.checkGoalAchievement();
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
    setInitiallyProvidedValue(params: HomePage_Params) {
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
        if (params.sedentaryMinutes !== undefined) {
            this.sedentaryMinutes = params.sedentaryMinutes;
        }
        if (params.userProfile !== undefined) {
            this.userProfile = params.userProfile;
        }
        if (params.calorieResult !== undefined) {
            this.calorieResult = params.calorieResult;
        }
        if (params.distance !== undefined) {
            this.distance = params.distance;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.sedentaryReminderUtil !== undefined) {
            this.sedentaryReminderUtil = params.sedentaryReminderUtil;
        }
        if (params.sedentaryUpdateTimer !== undefined) {
            this.sedentaryUpdateTimer = params.sedentaryUpdateTimer;
        }
        if (params.profileManager !== undefined) {
            this.profileManager = params.profileManager;
        }
        if (params.healthCalculator !== undefined) {
            this.healthCalculator = params.healthCalculator;
        }
        if (params.reminderManager !== undefined) {
            this.reminderManager = params.reminderManager;
        }
        if (params.sensorCallback !== undefined) {
            this.sensorCallback = params.sensorCallback;
        }
        if (params.getGeolocation !== undefined) {
            this.getGeolocation = params.getGeolocation;
        }
    }
    updateStateVars(params: HomePage_Params) {
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
        this.__sedentaryMinutes.purgeDependencyOnElmtId(rmElmtId);
        this.__userProfile.purgeDependencyOnElmtId(rmElmtId);
        this.__calorieResult.purgeDependencyOnElmtId(rmElmtId);
        this.__distance.purgeDependencyOnElmtId(rmElmtId);
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
        this.__sedentaryMinutes.aboutToBeDeleted();
        this.__userProfile.aboutToBeDeleted();
        this.__calorieResult.aboutToBeDeleted();
        this.__distance.aboutToBeDeleted();
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
    private __sedentaryMinutes: ObservedPropertySimplePU<number>; // 久坐时间（分钟）
    get sedentaryMinutes() {
        return this.__sedentaryMinutes.get();
    }
    set sedentaryMinutes(newValue: number) {
        this.__sedentaryMinutes.set(newValue);
    }
    // 用户档案和卡路里消耗
    private __userProfile: ObservedPropertyObjectPU<UserProfile>;
    get userProfile() {
        return this.__userProfile.get();
    }
    set userProfile(newValue: UserProfile) {
        this.__userProfile.set(newValue);
    }
    private __calorieResult: ObservedPropertyObjectPU<CalorieResult>;
    get calorieResult() {
        return this.__calorieResult.get();
    }
    set calorieResult(newValue: CalorieResult) {
        this.__calorieResult.set(newValue);
    }
    private __distance: ObservedPropertySimplePU<number>; // 步行距离（米）
    get distance() {
        return this.__distance.get();
    }
    set distance(newValue: number) {
        this.__distance.set(newValue);
    }
    private context: common.UIAbilityContext;
    private sedentaryReminderUtil: SedentaryReminderUtil | null; // 久坐监测工具
    private sedentaryUpdateTimer: number; // 久坐时间更新定时器
    private profileManager;
    private healthCalculator;
    private reminderManager;
    private sensorCallback: (data: sensor.PedometerResponse) => void;
    private getGeolocation: (location: geoLocationManager.Location) => void;
    onPageShow() {
        this.init();
        this.requestPermissions();
        this.initSedentaryMonitoring();
    }
    onPageHide() {
        try {
            sensor.off(sensor.SensorId.PEDOMETER);
        }
        catch (err) {
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
        }
        catch (err) {
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
            this.sedentaryReminderUtil.startMonitoring(CommonConstants.SEDENTARY_THRESHOLD_MINUTES, CommonConstants.SEDENTARY_CHECK_INTERVAL_MINUTES);
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
        }
        catch (err) {
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
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 渐变背景
            Column.create();
            // 渐变背景
            Column.width('100%');
            // 渐变背景
            Column.height('100%');
            // 渐变背景
            Column.linearGradient({
                angle: 180,
                colors: [['#0A0A0F', 0], ['#1A1A24', 0.5], ['#0F0F18', 1]]
            });
        }, Column);
        // 渐变背景
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主内容区域
            Column.create();
            // 主内容区域
            Column.width('100%');
            // 主内容区域
            Column.height('100%');
        }, Column);
        // 顶部状态栏（模拟手机状态栏）
        this.StatusBar.bind(this)();
        // 页面头部区域
        this.HeaderSection.bind(this)();
        // 步数统计区
        this.StepsSection.bind(this)();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 核心环形半圆弧进度仪表盘
                    ArcProgressGauge(this, {
                        calorieProgress: this.progressValue,
                        exerciseProgress: this.progressValue * 0.8,
                        hoursProgress: this.progressValue * 0.6
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 356, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            calorieProgress: this.progressValue,
                            exerciseProgress: this.progressValue * 0.8,
                            hoursProgress: this.progressValue * 0.6
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        calorieProgress: this.progressValue,
                        exerciseProgress: this.progressValue * 0.8,
                        hoursProgress: this.progressValue * 0.6
                    });
                }
            }, { name: "ArcProgressGauge" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 三项指标横向数据栏
                    MetricsBar(this, {
                        calorieCurrent: this.calorieResult.totalCalories,
                        calorieGoal: 270,
                        exerciseCurrent: Math.floor(NumberUtil._parseInt(this.currentSteps, 10) / 60),
                        exerciseGoal: 25,
                        hoursCurrent: Math.floor(NumberUtil._parseInt(this.currentSteps, 10) / 360),
                        hoursGoal: 12
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 363, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            calorieCurrent: this.calorieResult.totalCalories,
                            calorieGoal: 270,
                            exerciseCurrent: Math.floor(NumberUtil._parseInt(this.currentSteps, 10) / 60),
                            exerciseGoal: 25,
                            hoursCurrent: Math.floor(NumberUtil._parseInt(this.currentSteps, 10) / 360),
                            hoursGoal: 12
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        calorieCurrent: this.calorieResult.totalCalories,
                        calorieGoal: 270,
                        exerciseCurrent: Math.floor(NumberUtil._parseInt(this.currentSteps, 10) / 60),
                        exerciseGoal: 25,
                        hoursCurrent: Math.floor(NumberUtil._parseInt(this.currentSteps, 10) / 360),
                        hoursGoal: 12
                    });
                }
            }, { name: "MetricsBar" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 快捷操作横条卡片
                    QuickActionCard(this, {
                        onStartRunning: () => {
                            this.handleStartRunning();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 373, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            onStartRunning: () => {
                                this.handleStartRunning();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "QuickActionCard" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 2×2网格功能卡片区
                    FeatureGrid(this, {
                        onStartExercise: () => {
                            this.handleStartRunning();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 380, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            onStartExercise: () => {
                                this.handleStartRunning();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "FeatureGrid" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 底部导航栏
                    BottomNavBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 387, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "BottomNavBar" });
        }
        // 主内容区域
        Column.pop();
        Stack.pop();
    }
    /**
     * 顶部状态栏（模拟手机状态栏）
     */
    StatusBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(DesignSystem.STATUS_BAR_HEIGHT);
            Row.padding({ left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG });
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 动态时间
            Text.create(this.getCurrentTime());
            // 动态时间
            Text.fontSize(DesignSystem.FONT_SIZE_MD);
            // 动态时间
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            // 动态时间
            Text.fontWeight(DesignSystem.FONT_WEIGHT_MEDIUM);
        }, Text);
        // 动态时间
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 右侧图标组
            Row.create({ space: DesignSystem.SPACING_SM });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // WiFi图标
            Stack.create();
            // WiFi图标
            Stack.width(20);
            // WiFi图标
            Stack.height(20);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Path.create();
            Path.width(16);
            Path.height(16);
            Path.commands('M1 12L8 5L15 12 M3 10L8 5L13 10 M5 8L8 5L11 8 M8 14V5');
            Path.stroke(DesignSystem.TEXT_PRIMARY);
            Path.strokeWidth(1.5);
            Path.fill('transparent');
        }, Path);
        // WiFi图标
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 5G信号
            Text.create('5G');
            // 5G信号
            Text.fontSize(DesignSystem.FONT_SIZE_XS);
            // 5G信号
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            // 5G信号
            Text.fontWeight(DesignSystem.FONT_WEIGHT_BOLD);
        }, Text);
        // 5G信号
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 电量图标
            Stack.create();
            // 电量图标
            Stack.width(26);
            // 电量图标
            Stack.height(14);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 电池外框
            Row.create();
            // 电池外框
            Row.width(22);
            // 电池外框
            Row.height(12);
            // 电池外框
            Row.borderRadius(2);
            // 电池外框
            Row.border({
                width: 1.5,
                color: DesignSystem.TEXT_PRIMARY
            });
        }, Row);
        // 电池外框
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 电量填充
            Row.create();
            // 电量填充
            Row.width(16);
            // 电量填充
            Row.height(8);
            // 电量填充
            Row.borderRadius(1);
            // 电量填充
            Row.linearGradient({
                angle: 90,
                colors: [[DesignSystem.COLOR_SUCCESS, 0], [DesignSystem.COLOR_SUCCESS_LIGHT, 1]]
            });
            // 电量填充
            Row.margin({ left: 2 });
        }, Row);
        // 电量填充
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 电池头
            Row.create();
            // 电池头
            Row.width(2);
            // 电池头
            Row.height(6);
            // 电池头
            Row.borderRadius(1);
            // 电池头
            Row.backgroundColor(DesignSystem.TEXT_PRIMARY);
            // 电池头
            Row.position({ x: 22, y: 3 });
        }, Row);
        // 电池头
        Row.pop();
        // 电量图标
        Stack.pop();
        // 右侧图标组
        Row.pop();
        Row.pop();
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
    HeaderSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG, top: DesignSystem.SPACING_LG, bottom: DesignSystem.SPACING_MD });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 左上角标题
            Column.create();
            // 左上角标题
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日');
            Text.fontSize(DesignSystem.FONT_SIZE_3XL);
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_BOLD);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 日期副标题
            Text.create(this.getDateString());
            // 日期副标题
            Text.fontSize(DesignSystem.FONT_SIZE_SM);
            // 日期副标题
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
            // 日期副标题
            Text.margin({ top: 2 });
        }, Text);
        // 日期副标题
        Text.pop();
        // 左上角标题
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 右上角操作图标
            Row.create({ space: DesignSystem.SPACING_MD });
        }, Row);
        // 搜索按钮
        this.IconButton.bind(this)('M15 15L21 21 M17 11C17 14.3137 14.3137 17 11 17C7.68629 17 5 14.3137 5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11Z', () => { });
        // 设置按钮
        this.IconButton.bind(this)('M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z M19.4 15C19.2669 15.6304 19.0418 16.2322 18.73 16.78L20.21 18.26C20.4 18.45 20.4 18.75 20.21 18.94L18.94 20.21C18.75 20.4 18.45 20.4 18.26 20.21L16.78 18.73C16.2322 19.0418 15.6304 19.2669 15 19.4V21.5C15 21.78 14.78 22 14.5 22H12.5C12.22 22 12 21.78 12 21.5V19.4C11.3696 19.2669 10.7678 19.0418 10.22 18.73L8.74 20.21C8.55 20.4 8.25 20.4 8.06 20.21L6.79 18.94C6.6 18.75 6.6 18.45 6.79 18.26L8.27 16.78C7.95824 16.2322 7.73314 15.6304 7.6 15H5.5C5.22 15 5 14.78 5 14.5V12.5C5 12.22 5.22 12 5.5 12H7.6C7.73314 11.3696 7.95824 10.7678 8.27 10.22L6.79 8.74C6.6 8.55 6.6 8.25 6.79 8.06L8.06 6.79C8.25 6.6 8.55 6.6 8.74 6.79L10.22 8.27C10.7678 7.95824 11.3696 7.73314 12 7.6V5.5C12 5.22 12.22 5 12.5 5H14.5C14.78 5 15 5.22 15 5.5V7.6C15.6304 7.73314 16.2322 7.95824 16.78 8.27L18.26 6.79C18.45 6.6 18.75 6.6 18.94 6.79L20.21 8.06C20.4 8.25 20.4 8.55 20.21 8.74L18.73 10.22C19.0418 10.7678 19.2669 11.3696 19.4 12H21.5C21.78 12 22 12.22 22 12.5V14.5C22 14.78 21.78 15 21.5 15H19.4Z', () => {
            router.pushUrl({ url: 'pages/SettingsPage' });
        });
        // 右上角操作图标
        Row.pop();
        Row.pop();
    }
    /**
     * 图标按钮
     */
    IconButton(pathCommands: string, onClick: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.width(DesignSystem.ICON_SIZE_XL);
            Button.height(DesignSystem.ICON_SIZE_XL);
            Button.backgroundColor('transparent');
            Button.padding(0);
            Button.onClick(onClick);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 圆形背景
            Circle.create();
            // 圆形背景
            Circle.width(DesignSystem.ICON_SIZE_XL);
            // 圆形背景
            Circle.height(DesignSystem.ICON_SIZE_XL);
            // 圆形背景
            Circle.fill(DesignSystem.BG_CARD);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 图标
            Path.create();
            // 图标
            Path.width(20);
            // 图标
            Path.height(20);
            // 图标
            Path.commands(pathCommands);
            // 图标
            Path.stroke(DesignSystem.TEXT_PRIMARY);
            // 图标
            Path.strokeWidth(1.5);
            // 图标
            Path.fill('transparent');
        }, Path);
        Stack.pop();
        Button.pop();
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
    StepsSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG, top: DesignSystem.SPACING_XL, bottom: DesignSystem.SPACING_XL });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 脚印图标容器
            Stack.create();
            // 脚印图标容器
            Stack.width(52);
            // 脚印图标容器
            Stack.height(52);
            // 脚印图标容器
            Stack.margin({ right: DesignSystem.SPACING_MD });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 背景光晕
            Circle.create();
            // 背景光晕
            Circle.width(52);
            // 背景光晕
            Circle.height(52);
            // 背景光晕
            Circle.fill(DesignSystem.withAlpha(DesignSystem.COLOR_PRIMARY, 0.15));
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 脚印矢量图标
            Path.create();
            // 脚印矢量图标
            Path.width(28);
            // 脚印矢量图标
            Path.height(28);
            // 脚印矢量图标
            Path.commands('M14 2C14 2 10 6 10 9C10 11 11 12 14 12C17 12 18 11 18 9C18 6 14 2 14 2Z M8 14C8 14 6 16 6 18C6 20 7 21 8 21C9 21 10 20 10 18C10 16 8 14 8 14Z M20 14C20 14 18 16 18 18C18 20 19 21 20 21C21 21 22 20 22 18C22 16 20 14 20 14Z M14 16C12 16 10 18 10 21C10 24 12 26 14 26C16 26 18 24 18 21C18 18 16 16 14 16Z');
            // 脚印矢量图标
            Path.stroke(DesignSystem.TEXT_PRIMARY);
            // 脚印矢量图标
            Path.strokeWidth(1.5);
            // 脚印矢量图标
            Path.fill('transparent');
        }, Path);
        // 脚印图标容器
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 步数文本
            Column.create();
            // 步数文本
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Bottom);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatSteps(this.currentSteps));
            Text.fontSize(DesignSystem.FONT_SIZE_4XL);
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_BOLD);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(' / ');
            Text.fontSize(DesignSystem.FONT_SIZE_2XL);
            Text.fontColor(DesignSystem.TEXT_TERTIARY);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.stepGoal || '20,000');
            Text.fontSize(DesignSystem.FONT_SIZE_2XL);
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('步');
            Text.fontSize(DesignSystem.FONT_SIZE_MD);
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 进度百分比
            if (this.progressValue > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(` · ${Math.round(this.progressValue)}%`);
                        Text.fontSize(DesignSystem.FONT_SIZE_MD);
                        Text.fontColor(DesignSystem.COLOR_PRIMARY);
                        Text.fontWeight(DesignSystem.FONT_WEIGHT_MEDIUM);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        // 步数文本
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 进度环形指示器
            Stack.create();
            // 进度环形指示器
            Stack.width(56);
            // 进度环形指示器
            Stack.height(56);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 背景圆环
            Circle.create();
            // 背景圆环
            Circle.width(56);
            // 背景圆环
            Circle.height(56);
            // 背景圆环
            Circle.stroke(DesignSystem.BORDER_LIGHT);
            // 背景圆环
            Circle.strokeWidth(4);
            // 背景圆环
            Circle.fill('transparent');
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 进度圆环
            Circle.create();
            // 进度圆环
            Circle.width(56);
            // 进度圆环
            Circle.height(56);
            // 进度圆环
            Circle.stroke(DesignSystem.COLOR_PRIMARY);
            // 进度圆环
            Circle.strokeWidth(4);
            // 进度圆环
            Circle.fill('transparent');
            // 进度圆环
            Circle.strokeDashArray([Math.PI * 56 * this.progressValue / 100, Math.PI * 56]);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 中心图标
            Text.create('👟');
            // 中心图标
            Text.fontSize(20);
        }, Text);
        // 中心图标
        Text.pop();
        // 进度环形指示器
        Stack.pop();
        Row.pop();
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
        return "HomePage";
    }
}
registerNamedRoute(() => new HomePage(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "pages/HomePage", pageFullPath: "entry/src/main/ets/pages/HomePage", integratedHsp: "false", moduleType: "followWithHap" });
