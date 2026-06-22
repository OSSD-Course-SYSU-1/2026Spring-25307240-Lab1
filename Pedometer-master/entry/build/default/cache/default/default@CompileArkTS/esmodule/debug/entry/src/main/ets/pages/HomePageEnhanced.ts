if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePageEnhanced_Params {
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
    calories?: number;
    distance?: number;
    duration?: number;
    sedentaryMinutes?: number;
    isSedentaryReminderEnabled?: boolean;
    showStats?: boolean;
    chartData?: ChartDataItem[];
    context?: common.UIAbilityContext;
    dbUtil?;
    sedentaryUtil?;
    sportsCalculator?;
    goalDialogManager?;
    hasGoalAchieved?: boolean;
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
import { CompletionStatus } from "@normalized:N&&&entry/src/main/ets/view/CompletionStatus&";
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/constants/CommonConstants&";
import { CurrentSituation } from "@normalized:N&&&entry/src/main/ets/view/CurrentSituation&";
import { StatsCard } from "@normalized:N&&&entry/src/main/ets/view/StepChart&";
import type { ChartDataItem } from "@normalized:N&&&entry/src/main/ets/view/StepChart&";
import { GoalAchievedDialogManager } from "@normalized:N&&&entry/src/main/ets/view/GoalAchievedDialog&";
import LocationUtil from "@normalized:N&&&entry/src/main/ets/common/utils/LocationUtil&";
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
import NumberUtil from "@normalized:N&&&entry/src/main/ets/common/utils/NumberUtil&";
import StepsUtil from "@normalized:N&&&entry/src/main/ets/common/utils/StepsUtil&";
import { getStepDatabaseUtil } from "@normalized:N&&&entry/src/main/ets/common/utils/StepDatabaseUtil&";
import type { StepRecord } from "@normalized:N&&&entry/src/main/ets/common/utils/StepDatabaseUtil&";
import { getSedentaryReminderUtil } from "@normalized:N&&&entry/src/main/ets/common/utils/SedentaryReminderUtil&";
import { getSportsDataCalculator } from "@normalized:N&&&entry/src/main/ets/common/utils/SportsDataCalculator&";
import type { DialogData } from '../common/types/Types';
const TAG: string = 'HomePageEnhanced';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
class HomePageEnhanced extends ViewPU {
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
        this.__calories = new ObservedPropertySimplePU(0, this, "calories");
        this.__distance = new ObservedPropertySimplePU(0, this, "distance");
        this.__duration = new ObservedPropertySimplePU(0, this, "duration");
        this.__sedentaryMinutes = new ObservedPropertySimplePU(0, this, "sedentaryMinutes");
        this.__isSedentaryReminderEnabled = new ObservedPropertySimplePU(true, this, "isSedentaryReminderEnabled");
        this.__showStats = new ObservedPropertySimplePU(true, this, "showStats");
        this.__chartData = new ObservedPropertyObjectPU([], this, "chartData");
        this.context = uiContext?.getHostContext() as common.UIAbilityContext;
        this.dbUtil = getStepDatabaseUtil(this.context);
        this.sedentaryUtil = getSedentaryReminderUtil(this.context);
        this.sportsCalculator = getSportsDataCalculator();
        this.goalDialogManager = new GoalAchievedDialogManager();
        this.hasGoalAchieved = false;
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
    setInitiallyProvidedValue(params: HomePageEnhanced_Params) {
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
        if (params.calories !== undefined) {
            this.calories = params.calories;
        }
        if (params.distance !== undefined) {
            this.distance = params.distance;
        }
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.sedentaryMinutes !== undefined) {
            this.sedentaryMinutes = params.sedentaryMinutes;
        }
        if (params.isSedentaryReminderEnabled !== undefined) {
            this.isSedentaryReminderEnabled = params.isSedentaryReminderEnabled;
        }
        if (params.showStats !== undefined) {
            this.showStats = params.showStats;
        }
        if (params.chartData !== undefined) {
            this.chartData = params.chartData;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.dbUtil !== undefined) {
            this.dbUtil = params.dbUtil;
        }
        if (params.sedentaryUtil !== undefined) {
            this.sedentaryUtil = params.sedentaryUtil;
        }
        if (params.sportsCalculator !== undefined) {
            this.sportsCalculator = params.sportsCalculator;
        }
        if (params.goalDialogManager !== undefined) {
            this.goalDialogManager = params.goalDialogManager;
        }
        if (params.hasGoalAchieved !== undefined) {
            this.hasGoalAchieved = params.hasGoalAchieved;
        }
        if (params.sensorCallback !== undefined) {
            this.sensorCallback = params.sensorCallback;
        }
        if (params.getGeolocation !== undefined) {
            this.getGeolocation = params.getGeolocation;
        }
    }
    updateStateVars(params: HomePageEnhanced_Params) {
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
        this.__calories.purgeDependencyOnElmtId(rmElmtId);
        this.__distance.purgeDependencyOnElmtId(rmElmtId);
        this.__duration.purgeDependencyOnElmtId(rmElmtId);
        this.__sedentaryMinutes.purgeDependencyOnElmtId(rmElmtId);
        this.__isSedentaryReminderEnabled.purgeDependencyOnElmtId(rmElmtId);
        this.__showStats.purgeDependencyOnElmtId(rmElmtId);
        this.__chartData.purgeDependencyOnElmtId(rmElmtId);
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
        this.__calories.aboutToBeDeleted();
        this.__distance.aboutToBeDeleted();
        this.__duration.aboutToBeDeleted();
        this.__sedentaryMinutes.aboutToBeDeleted();
        this.__isSedentaryReminderEnabled.aboutToBeDeleted();
        this.__showStats.aboutToBeDeleted();
        this.__chartData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 基础状态
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
    // 新增功能状态
    private __calories: ObservedPropertySimplePU<number>; // 卡路里消耗
    get calories() {
        return this.__calories.get();
    }
    set calories(newValue: number) {
        this.__calories.set(newValue);
    }
    private __distance: ObservedPropertySimplePU<number>; // 运动距离（米）
    get distance() {
        return this.__distance.get();
    }
    set distance(newValue: number) {
        this.__distance.set(newValue);
    }
    private __duration: ObservedPropertySimplePU<number>; // 运动时长（分钟）
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    private __sedentaryMinutes: ObservedPropertySimplePU<number>; // 久坐时长（分钟）
    get sedentaryMinutes() {
        return this.__sedentaryMinutes.get();
    }
    set sedentaryMinutes(newValue: number) {
        this.__sedentaryMinutes.set(newValue);
    }
    private __isSedentaryReminderEnabled: ObservedPropertySimplePU<boolean>; // 久坐提醒开关
    get isSedentaryReminderEnabled() {
        return this.__isSedentaryReminderEnabled.get();
    }
    set isSedentaryReminderEnabled(newValue: boolean) {
        this.__isSedentaryReminderEnabled.set(newValue);
    }
    private __showStats: ObservedPropertySimplePU<boolean>; // 是否显示统计卡片
    get showStats() {
        return this.__showStats.get();
    }
    set showStats(newValue: boolean) {
        this.__showStats.set(newValue);
    }
    private __chartData: ObservedPropertyObjectPU<ChartDataItem[]>; // 图表数据
    get chartData() {
        return this.__chartData.get();
    }
    set chartData(newValue: ChartDataItem[]) {
        this.__chartData.set(newValue);
    }
    // 工具类实例
    private context: common.UIAbilityContext;
    private dbUtil;
    private sedentaryUtil;
    private sportsCalculator;
    private goalDialogManager;
    private hasGoalAchieved: boolean; // 今日是否已达成目标
    // 传感器回调
    private sensorCallback: (data: sensor.PedometerResponse) => void;
    // 位置回调
    private getGeolocation: (location: geoLocationManager.Location) => void;
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
        }
        catch (err) {
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
            }
            else {
                this.isStart = false;
            }
        });
        StepsUtil.getStorageValue(CommonConstants.STEP_GOAL).then((res: string) => {
            if (StepsUtil.checkStrIsEmpty(res)) {
                // 设置默认目标
                this.stepGoal = CommonConstants.DEFAULT_STEP_GOAL.toString();
                StepsUtil.putStorageValue(CommonConstants.STEP_GOAL, this.stepGoal);
            }
            else {
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
                }
                catch (err) {
                    console.error('On fail, errCode: ' + JSON.stringify(err));
                }
                // 订阅位置服务
                LocationUtil.geolocationOn(this.getGeolocation);
            }).catch((err: Error) => {
                Logger.error(TAG, 'requestPermissionsFromUser err' + JSON.stringify(err));
            });
        }
        catch (err) {
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        // 标题栏
        this.TitleBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 15, right: 15, bottom: 20 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 进度显示区域
                    CompletionStatus(this, {
                        progressValue: this.__progressValue
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePageEnhanced.ets", line: 345, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            progressValue: this.progressValue
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "CompletionStatus" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 当前状态显示
                    CurrentSituation(this, {
                        currentSteps: this.currentSteps,
                        startPosition: this.startPosition,
                        currentLocation: this.currentLocation
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePageEnhanced.ets", line: 350, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            currentSteps: this.currentSteps,
                            startPosition: this.startPosition,
                            currentLocation: this.currentLocation
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        currentSteps: this.currentSteps,
                        startPosition: this.startPosition,
                        currentLocation: this.currentLocation
                    });
                }
            }, { name: "CurrentSituation" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 运动数据统计卡片
            if (this.showStats && this.isStart) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatsCard(this, {
                                    calories: this.calories,
                                    distance: this.distance,
                                    steps: NumberUtil._parseInt(this.currentSteps, 10),
                                    goal: NumberUtil._parseInt(this.stepGoal, 10)
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePageEnhanced.ets", line: 358, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        calories: this.calories,
                                        distance: this.distance,
                                        steps: NumberUtil._parseInt(this.currentSteps, 10),
                                        goal: NumberUtil._parseInt(this.stepGoal, 10)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    calories: this.calories,
                                    distance: this.distance,
                                    steps: NumberUtil._parseInt(this.currentSteps, 10),
                                    goal: NumberUtil._parseInt(this.stepGoal, 10)
                                });
                            }
                        }, { name: "StatsCard" });
                    }
                });
            }
            // 久坐提醒状态
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 久坐提醒状态
            if (this.isSedentaryReminderEnabled && this.isStart) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.SedentaryStatusCard.bind(this)();
                });
            }
            // 控制按钮区域
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 控制按钮区域
        this.ControlButtons.bind(this)();
        // 快捷功能入口
        this.QuickActions.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    /**
     * 标题栏
     */
    TitleBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 15, right: 10 });
            Row.linearGradient({
                angle: 135,
                colors: [['#4ECDC4', 0], ['#45B7AA', 1]]
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('计步器');
            Text.fontSize(20);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设置按钮
            Button.createWithChild();
            // 设置按钮
            Button.width(40);
            // 设置按钮
            Button.height(40);
            // 设置按钮
            Button.backgroundColor(Color.Transparent);
            // 设置按钮
            Button.onClick(() => {
                // 打开设置页面
                // router.pushUrl({ url: 'pages/SettingsPage' });
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⚙');
            Text.fontSize(20);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        // 设置按钮
        Button.pop();
        Row.pop();
    }
    /**
     * 久坐状态卡片
     */
    SedentaryStatusCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor(Color.White);
            Column.borderRadius(12);
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('久坐提醒');
            Text.fontSize(14);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 开关
            Toggle.create({ type: ToggleType.Switch, isOn: this.isSedentaryReminderEnabled });
            // 开关
            Toggle.onChange((isOn: boolean) => {
                this.isSedentaryReminderEnabled = isOn;
                StepsUtil.putStorageValue(CommonConstants.SEDENTARY_REMINDER_ENABLED, String(isOn));
                if (isOn) {
                    this.sedentaryUtil.startMonitoring(CommonConstants.SEDENTARY_THRESHOLD_MINUTES);
                }
                else {
                    this.sedentaryUtil.stopMonitoring();
                }
            });
        }, Toggle);
        // 开关
        Toggle.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isSedentaryReminderEnabled) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('未活动时间:');
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.sedentaryUtil.getInactiveMinutes()} 分钟`);
                        Text.fontSize(12);
                        Text.fontColor('#4ECDC4');
                        Text.margin({ left: 5 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`提醒阈值: ${CommonConstants.SEDENTARY_THRESHOLD_MINUTES}分钟`);
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    /**
     * 控制按钮区域
     */
    ControlButtons(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isStart ? '停止' : '开始');
            Button.width('45%');
            Button.height(50);
            Button.borderRadius(25);
            Button.backgroundColor(this.isStart ? '#FF6B6B' : '#4ECDC4');
            Button.fontSize(16);
            Button.fontColor(Color.White);
            Button.fontWeight(FontWeight.Medium);
            Button.onClick(() => {
                this.handleStartStop();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 保存按钮
            Button.createWithLabel('保存');
            // 保存按钮
            Button.width('45%');
            // 保存按钮
            Button.height(50);
            // 保存按钮
            Button.borderRadius(25);
            // 保存按钮
            Button.backgroundColor('#FFE66D');
            // 保存按钮
            Button.fontSize(16);
            // 保存按钮
            Button.fontColor('#333333');
            // 保存按钮
            Button.fontWeight(FontWeight.Medium);
            // 保存按钮
            Button.onClick(async () => {
                await this.saveTodayData(NumberUtil._parseInt(this.currentSteps, 10), NumberUtil._parseInt(this.stepGoal, 10));
                this.getUIContext().getPromptAction().showToast({ message: '数据已保存' });
            });
        }, Button);
        // 保存按钮
        Button.pop();
        Row.pop();
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
            this.saveTodayData(NumberUtil._parseInt(this.currentSteps, 10), NumberUtil._parseInt(this.stepGoal, 10));
        }
        else {
            // 开始计步
            if (this.stepGoal === '' || this.currentLocation === '') {
                this.getUIContext().getPromptAction().showToast({ message: CommonConstants.WAIT });
            }
            else {
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
    QuickActions(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor(Color.White);
            Column.borderRadius(12);
            Column.margin({ top: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('更多功能');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        // 历史数据
        this.ActionItem.bind(this)('📊', '历史数据', () => {
            router.pushUrl({ url: 'pages/HistoryPage' });
        });
        // 数据统计
        this.ActionItem.bind(this)('📈', '数据统计', () => {
            this.showStats = !this.showStats;
        });
        // 设置目标
        this.ActionItem.bind(this)('🎯', '设置目标', () => {
            // 打开目标设置对话框
        });
        Row.pop();
        Column.pop();
    }
    /**
     * 快捷功能项
     */
    ActionItem(icon: string, label: string, action: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('30%');
            Column.padding(15);
            Column.backgroundColor('#F5F5F5');
            Column.borderRadius(10);
            Column.onClick(action);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(30);
            Text.margin({ bottom: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HomePageEnhanced";
    }
}
registerNamedRoute(() => new HomePageEnhanced(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "pages/HomePageEnhanced", pageFullPath: "entry/src/main/ets/pages/HomePageEnhanced", integratedHsp: "false", moduleType: "followWithHap" });
