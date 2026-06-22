if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HistoryPage_Params {
    currentChartType?: ChartType;
    chartData?: ChartDataItem[];
    statistics?: StatisticsData;
    bestRecord?: StepRecord | null;
    isLoading?: boolean;
    selectedDate?: string;
    context?: common.UIAbilityContext;
    dbUtil?;
}
import type common from "@ohos:app.ability.common";
import { getStepDatabaseUtil } from "@normalized:N&&&entry/src/main/ets/common/utils/StepDatabaseUtil&";
import type { StepRecord } from "@normalized:N&&&entry/src/main/ets/common/utils/StepDatabaseUtil&";
import { StepChart, ChartType } from "@normalized:N&&&entry/src/main/ets/view/StepChart&";
import type { ChartDataItem } from "@normalized:N&&&entry/src/main/ets/view/StepChart&";
import type { StatisticsData } from '../common/types/Types';
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
const TAG: string = 'HistoryPage';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
class HistoryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentChartType = new ObservedPropertySimplePU(ChartType.WEEK, this, "currentChartType");
        this.__chartData = new ObservedPropertyObjectPU([], this, "chartData");
        this.__statistics = new ObservedPropertyObjectPU({
            totalDays: 0,
            totalSteps: 0,
            averageSteps: 0,
            totalCalories: 0,
            totalDistance: 0
        }, this, "statistics");
        this.__bestRecord = new ObservedPropertyObjectPU(null, this, "bestRecord");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__selectedDate = new ObservedPropertySimplePU('', this, "selectedDate");
        this.context = uiContext?.getHostContext() as common.UIAbilityContext;
        this.dbUtil = getStepDatabaseUtil(this.context);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HistoryPage_Params) {
        if (params.currentChartType !== undefined) {
            this.currentChartType = params.currentChartType;
        }
        if (params.chartData !== undefined) {
            this.chartData = params.chartData;
        }
        if (params.statistics !== undefined) {
            this.statistics = params.statistics;
        }
        if (params.bestRecord !== undefined) {
            this.bestRecord = params.bestRecord;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.selectedDate !== undefined) {
            this.selectedDate = params.selectedDate;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.dbUtil !== undefined) {
            this.dbUtil = params.dbUtil;
        }
    }
    updateStateVars(params: HistoryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentChartType.purgeDependencyOnElmtId(rmElmtId);
        this.__chartData.purgeDependencyOnElmtId(rmElmtId);
        this.__statistics.purgeDependencyOnElmtId(rmElmtId);
        this.__bestRecord.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDate.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentChartType.aboutToBeDeleted();
        this.__chartData.aboutToBeDeleted();
        this.__statistics.aboutToBeDeleted();
        this.__bestRecord.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__selectedDate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentChartType: ObservedPropertySimplePU<ChartType>; // 当前图表类型
    get currentChartType() {
        return this.__currentChartType.get();
    }
    set currentChartType(newValue: ChartType) {
        this.__currentChartType.set(newValue);
    }
    private __chartData: ObservedPropertyObjectPU<ChartDataItem[]>; // 图表数据
    get chartData() {
        return this.__chartData.get();
    }
    set chartData(newValue: ChartDataItem[]) {
        this.__chartData.set(newValue);
    }
    private __statistics: ObservedPropertyObjectPU<StatisticsData>; // 统计数据
    get statistics() {
        return this.__statistics.get();
    }
    set statistics(newValue: StatisticsData) {
        this.__statistics.set(newValue);
    }
    private __bestRecord: ObservedPropertyObjectPU<StepRecord | null>; // 最佳记录
    get bestRecord() {
        return this.__bestRecord.get();
    }
    set bestRecord(newValue: StepRecord | null) {
        this.__bestRecord.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>; // 加载状态
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __selectedDate: ObservedPropertySimplePU<string>; // 选中的日期
    get selectedDate() {
        return this.__selectedDate.get();
    }
    set selectedDate(newValue: string) {
        this.__selectedDate.set(newValue);
    }
    private context: common.UIAbilityContext;
    private dbUtil;
    aboutToAppear() {
        // 初始化数据
        this.loadData();
    }
    /**
     * 加载历史数据
     */
    async loadData(): Promise<void> {
        this.isLoading = true;
        try {
            // 加载图表数据
            await this.loadChartData();
            // 加载统计数据
            await this.loadStatistics();
            // 加载最佳记录
            await this.loadBestRecord();
            this.isLoading = false;
        }
        catch (err) {
            Logger.error(TAG, `Load data failed: ${JSON.stringify(err)}`);
            this.isLoading = false;
        }
    }
    /**
     * 加载图表数据
     */
    async loadChartData(): Promise<void> {
        let days = 7;
        if (this.currentChartType === ChartType.MONTH) {
            days = 30;
        }
        else if (this.currentChartType === ChartType.DAY) {
            days = 1;
        }
        const records = await this.dbUtil.getRecentRecords(days);
        // 转换为图表数据格式
        this.chartData = records.map((record: StepRecord): ChartDataItem => {
            return {
                label: record.date,
                value: record.steps,
                goal: record.goal
            };
        });
        // 如果数据不足，填充空数据
        if (this.chartData.length < days) {
            const filledData: ChartDataItem[] = [];
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
                const dateStr = this.formatDate(date);
                const existingData = this.chartData.find(d => d.label === dateStr);
                if (existingData) {
                    filledData.push(existingData);
                }
                else {
                    filledData.push({
                        label: dateStr,
                        value: 0,
                        goal: 0
                    });
                }
            }
            this.chartData = filledData;
        }
        Logger.info(TAG, `Chart data loaded: ${this.chartData.length} items`);
    }
    /**
     * 加载统计数据
     */
    async loadStatistics(): Promise<void> {
        this.statistics = await this.dbUtil.getStatistics();
        Logger.info(TAG, `Statistics loaded: ${JSON.stringify(this.statistics)}`);
    }
    /**
     * 加载最佳记录
     */
    async loadBestRecord(): Promise<void> {
        this.bestRecord = await this.dbUtil.getBestRecord();
        if (this.bestRecord) {
            Logger.info(TAG, `Best record: ${this.bestRecord.steps} steps on ${this.bestRecord.date}`);
        }
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
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 加载中
                        Column.create();
                        // 加载中
                        Column.width('100%');
                        // 加载中
                        Column.height('100%');
                        // 加载中
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(50);
                        LoadingProgress.height(50);
                        LoadingProgress.color('#4ECDC4');
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('加载中...');
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ top: 10 });
                    }, Text);
                    Text.pop();
                    // 加载中
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 内容区域
                        Scroll.create();
                        // 内容区域
                        Scroll.width('100%');
                        // 内容区域
                        Scroll.layoutWeight(1);
                        // 内容区域
                        Scroll.scrollBar(BarState.Off);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(15);
                    }, Column);
                    // 图表类型选择器
                    this.ChartTypeSelector.bind(this)();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ top: 10 });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new 
                                // 步数趋势图
                                StepChart(this, {
                                    chartData: this.chartData,
                                    chartType: this.currentChartType,
                                    title: this.getChartTitle()
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HistoryPage.ets", line: 179, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        chartData: this.chartData,
                                        chartType: this.currentChartType,
                                        title: this.getChartTitle()
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    chartData: this.chartData,
                                    chartType: this.currentChartType,
                                    title: this.getChartTitle()
                                });
                            }
                        }, { name: "StepChart" });
                    }
                    __Common__.pop();
                    // 统计数据卡片
                    this.StatisticsCard.bind(this)();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 最佳记录卡片
                        if (this.bestRecord) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.BestRecordCard.bind(this)();
                            });
                        }
                        // 历史记录列表
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    // 历史记录列表
                    this.HistoryList.bind(this)();
                    Column.pop();
                    // 内容区域
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
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
            Row.padding({ left: 10, right: 10 });
            Row.linearGradient({
                angle: 135,
                colors: [['#4ECDC4', 0], ['#45B7AA', 1]]
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回按钮
            Button.createWithChild();
            // 返回按钮
            Button.width(40);
            // 返回按钮
            Button.height(40);
            // 返回按钮
            Button.backgroundColor(Color.Transparent);
            // 返回按钮
            Button.onClick(() => {
                // 返回主页
                this.context.terminateSelf();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize(20);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Row.pop();
        // 返回按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('历史数据');
            Text.fontSize(18);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Medium);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 占位
            Blank.create();
            // 占位
            Blank.width(40);
        }, Blank);
        // 占位
        Blank.pop();
        Row.pop();
    }
    /**
     * 图表类型选择器
     */
    ChartTypeSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 10, bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('周');
            Button.width(60);
            Button.height(32);
            Button.fontSize(14);
            Button.fontColor(this.currentChartType === ChartType.WEEK ? Color.White : '#4ECDC4');
            Button.backgroundColor(this.currentChartType === ChartType.WEEK ? '#4ECDC4' : Color.White);
            Button.borderRadius(16);
            Button.border({ width: 1, color: '#4ECDC4' });
            Button.onClick(async () => {
                if (this.currentChartType !== ChartType.WEEK) {
                    this.currentChartType = ChartType.WEEK;
                    await this.loadChartData();
                }
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('月');
            Button.width(60);
            Button.height(32);
            Button.fontSize(14);
            Button.fontColor(this.currentChartType === ChartType.MONTH ? Color.White : '#4ECDC4');
            Button.backgroundColor(this.currentChartType === ChartType.MONTH ? '#4ECDC4' : Color.White);
            Button.borderRadius(16);
            Button.border({ width: 1, color: '#4ECDC4' });
            Button.onClick(async () => {
                if (this.currentChartType !== ChartType.MONTH) {
                    this.currentChartType = ChartType.MONTH;
                    await this.loadChartData();
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
    }
    /**
     * 统计数据卡片
     */
    StatisticsCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor(Color.White);
            Column.borderRadius(12);
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('数据统计');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.margin({ bottom: 15 });
        }, Row);
        this.StatItem.bind(this)('总天数', `${this.statistics.totalDays}`, '天');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(true);
            Divider.height(40);
            Divider.color('#E0E0E0');
        }, Divider);
        this.StatItem.bind(this)('总步数', `${this.statistics.totalSteps}`, '步');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(true);
            Divider.height(40);
            Divider.color('#E0E0E0');
        }, Divider);
        this.StatItem.bind(this)('平均步数', `${this.statistics.averageSteps}`, '步');
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.StatItem.bind(this)('总卡路里', `${Math.round(this.statistics.totalCalories)}`, '千卡');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(true);
            Divider.height(40);
            Divider.color('#E0E0E0');
        }, Divider);
        this.StatItem.bind(this)('总距离', this.formatDistance(this.statistics.totalDistance), '');
        Row.pop();
        Column.pop();
    }
    /**
     * 统计项组件
     */
    StatItem(label: string, value: string, unit: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ bottom: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(18);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (unit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(unit);
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                        Text.margin({ left: 2 });
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
        Column.pop();
    }
    /**
     * 最佳记录卡片
     */
    BestRecordCard(parent = null) {
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
            Row.margin({ bottom: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🏆 历史最佳');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.bestRecord?.date || '');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('步数');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.bestRecord?.steps || 0}`);
            Text.fontSize(24);
            Text.fontColor('#4ECDC4');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('卡路里');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${(this.bestRecord?.calories || 0).toFixed(1)}`);
            Text.fontSize(24);
            Text.fontColor('#FF6B6B');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('距离');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatDistance(this.bestRecord?.distance || 0));
            Text.fontSize(20);
            Text.fontColor('#FFE66D');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    /**
     * 历史记录列表
     */
    HistoryList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor(Color.White);
            Column.borderRadius(12);
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('最近记录');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.width('100%');
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.chartData.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            this.HistoryItem.bind(this)(item, index);
                        };
                        this.forEachUpdateFunction(elmtId, this.chartData.slice().reverse().slice(0, 7), forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无历史记录');
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    /**
     * 历史记录项
     */
    HistoryItem(item: ChartDataItem, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 10, bottom: 10 });
            Row.border({
                width: { bottom: index < 6 ? 0.5 : 0 },
                color: '#E0E0E0'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatDisplayDate(item.label));
            Text.fontSize(14);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${item.value} 步`);
            Text.fontSize(14);
            Text.fontColor('#4ECDC4');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 完成状态
            if ((item.goal ?? 0) > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(30);
                        Column.alignItems(HorizontalAlign.End);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(item.value >= (item.goal ?? 0) ? '✓' : '');
                        Text.fontSize(16);
                        Text.fontColor(item.value >= (item.goal ?? 0) ? '#4ECDC4' : '#CCCCCC');
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    /**
     * 获取图表标题
     */
    private getChartTitle(): string {
        switch (this.currentChartType) {
            case ChartType.WEEK:
                return '近7天步数趋势';
            case ChartType.MONTH:
                return '近30天步数趋势';
            default:
                return '步数趋势';
        }
    }
    /**
     * 格式化日期
     */
    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    /**
     * 格式化显示日期
     */
    private formatDisplayDate(dateStr: string): string {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        if (this.formatDate(today) === dateStr) {
            return '今天';
        }
        else if (this.formatDate(yesterday) === dateStr) {
            return '昨天';
        }
        else {
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${month}月${day}日`;
        }
    }
    /**
     * 格式化距离
     */
    private formatDistance(meters: number): string {
        if (meters < 1000) {
            return `${Math.round(meters)}米`;
        }
        else {
            return `${(meters / 1000).toFixed(1)}公里`;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HistoryPage";
    }
}
registerNamedRoute(() => new HistoryPage(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "pages/HistoryPage", pageFullPath: "entry/src/main/ets/pages/HistoryPage", integratedHsp: "false", moduleType: "followWithHap" });
