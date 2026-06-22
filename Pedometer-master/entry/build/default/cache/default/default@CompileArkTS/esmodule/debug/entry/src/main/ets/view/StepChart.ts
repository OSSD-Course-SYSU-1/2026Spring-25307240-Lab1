if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StatsCard_Params {
    calories?: number;
    distance?: number;
    steps?: number;
    goal?: number;
}
interface StepChart_Params {
    chartData?: ChartDataItem[];
    chartType?: ChartType;
    title?: string;
    selectedIndex?: number;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    renderConfig?: ChartRenderConfig | null;
    lastDataHash?: string;
    drawDebounceTimer?: number;
    cacheManager?;
    CHART_PADDING_LEFT?: number;
    CHART_PADDING_RIGHT?: number;
    CHART_PADDING_TOP?: number;
    CHART_PADDING_BOTTOM?: number;
    BAR_RADIUS?: number;
    GOAL_LINE_COLOR?: string;
    BAR_COLOR?: string;
    BAR_COLOR_SELECTED?: string;
    TEXT_COLOR?: string;
    GRID_COLOR?: string;
    lastRenderTime?: number;
    renderCount?: number;
}
import { getCacheManager } from "@normalized:N&&&entry/src/main/ets/common/utils/CacheManager&";
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
const TAG: string = 'StepChart';
/**
 * 图表数据项
 */
export interface ChartDataItem {
    label: string; // X轴标签（日期）
    value: number; // 数值（步数）
    goal?: number; // 目标值（可选）
}
/**
 * 图表渲染配置
 */
interface ChartRenderConfig {
    maxValue: number;
    yScale: number;
    chartWidth: number;
    chartHeight: number;
    barWidth: number;
    barGap: number;
}
/**
 * 图表类型枚举
 */
export enum ChartType {
    DAY = "day",
    WEEK = "week",
    MONTH = "month" // 月视图
}
export class StepChart extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__chartData = new SynchedPropertyObjectOneWayPU(params.chartData, this, "chartData");
        this.__chartType = new SynchedPropertySimpleOneWayPU(params.chartType, this, "chartType");
        this.__title = new SynchedPropertySimpleOneWayPU(params.title, this, "title");
        this.__selectedIndex = new ObservedPropertySimplePU(-1, this, "selectedIndex");
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.renderConfig = null;
        this.lastDataHash = '';
        this.drawDebounceTimer = -1;
        this.cacheManager = getCacheManager();
        this.CHART_PADDING_LEFT = 50;
        this.CHART_PADDING_RIGHT = 20;
        this.CHART_PADDING_TOP = 40;
        this.CHART_PADDING_BOTTOM = 40;
        this.BAR_RADIUS = 4;
        this.GOAL_LINE_COLOR = '#FF6B6B';
        this.BAR_COLOR = '#4ECDC4';
        this.BAR_COLOR_SELECTED = '#45B7AA';
        this.TEXT_COLOR = '#333333';
        this.GRID_COLOR = '#E0E0E0';
        this.lastRenderTime = 0;
        this.renderCount = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StepChart_Params) {
        if (params.chartData === undefined) {
            this.__chartData.set([]);
        }
        if (params.chartType === undefined) {
            this.__chartType.set(ChartType.WEEK);
        }
        if (params.title === undefined) {
            this.__title.set('步数趋势');
        }
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.renderConfig !== undefined) {
            this.renderConfig = params.renderConfig;
        }
        if (params.lastDataHash !== undefined) {
            this.lastDataHash = params.lastDataHash;
        }
        if (params.drawDebounceTimer !== undefined) {
            this.drawDebounceTimer = params.drawDebounceTimer;
        }
        if (params.cacheManager !== undefined) {
            this.cacheManager = params.cacheManager;
        }
        if (params.CHART_PADDING_LEFT !== undefined) {
            this.CHART_PADDING_LEFT = params.CHART_PADDING_LEFT;
        }
        if (params.CHART_PADDING_RIGHT !== undefined) {
            this.CHART_PADDING_RIGHT = params.CHART_PADDING_RIGHT;
        }
        if (params.CHART_PADDING_TOP !== undefined) {
            this.CHART_PADDING_TOP = params.CHART_PADDING_TOP;
        }
        if (params.CHART_PADDING_BOTTOM !== undefined) {
            this.CHART_PADDING_BOTTOM = params.CHART_PADDING_BOTTOM;
        }
        if (params.BAR_RADIUS !== undefined) {
            this.BAR_RADIUS = params.BAR_RADIUS;
        }
        if (params.GOAL_LINE_COLOR !== undefined) {
            this.GOAL_LINE_COLOR = params.GOAL_LINE_COLOR;
        }
        if (params.BAR_COLOR !== undefined) {
            this.BAR_COLOR = params.BAR_COLOR;
        }
        if (params.BAR_COLOR_SELECTED !== undefined) {
            this.BAR_COLOR_SELECTED = params.BAR_COLOR_SELECTED;
        }
        if (params.TEXT_COLOR !== undefined) {
            this.TEXT_COLOR = params.TEXT_COLOR;
        }
        if (params.GRID_COLOR !== undefined) {
            this.GRID_COLOR = params.GRID_COLOR;
        }
        if (params.lastRenderTime !== undefined) {
            this.lastRenderTime = params.lastRenderTime;
        }
        if (params.renderCount !== undefined) {
            this.renderCount = params.renderCount;
        }
    }
    updateStateVars(params: StepChart_Params) {
        this.__chartData.reset(params.chartData);
        this.__chartType.reset(params.chartType);
        this.__title.reset(params.title);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__chartData.purgeDependencyOnElmtId(rmElmtId);
        this.__chartType.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__chartData.aboutToBeDeleted();
        this.__chartType.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __chartData: SynchedPropertySimpleOneWayPU<ChartDataItem[]>; // 图表数据
    get chartData() {
        return this.__chartData.get();
    }
    set chartData(newValue: ChartDataItem[]) {
        this.__chartData.set(newValue);
    }
    private __chartType: SynchedPropertySimpleOneWayPU<ChartType>; // 图表类型
    get chartType() {
        return this.__chartType.get();
    }
    set chartType(newValue: ChartType) {
        this.__chartType.set(newValue);
    }
    private __title: SynchedPropertySimpleOneWayPU<string>; // 图表标题
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __selectedIndex: ObservedPropertySimplePU<number>; // 选中的数据索引
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    // 画布上下文
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    // 性能优化：缓存渲染配置
    private renderConfig: ChartRenderConfig | null;
    private lastDataHash: string;
    private drawDebounceTimer: number;
    private cacheManager;
    // 图表配置
    private readonly CHART_PADDING_LEFT: number;
    private readonly CHART_PADDING_RIGHT: number;
    private readonly CHART_PADDING_TOP: number;
    private readonly CHART_PADDING_BOTTOM: number;
    private readonly BAR_RADIUS: number;
    private readonly GOAL_LINE_COLOR: string;
    private readonly BAR_COLOR: string;
    private readonly BAR_COLOR_SELECTED: string;
    private readonly TEXT_COLOR: string;
    private readonly GRID_COLOR: string;
    // 性能监控
    private lastRenderTime: number;
    private renderCount: number;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor(Color.White);
            Column.borderRadius(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Text.create(this.title);
            // 标题
            Text.fontSize(18);
            // 标题
            Text.fontWeight(FontWeight.Medium);
            // 标题
            Text.fontColor(this.TEXT_COLOR);
            // 标题
            Text.margin({ bottom: 10 });
        }, Text);
        // 标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 图表画布
            Canvas.create(this.context);
            // 图表画布
            Canvas.width('100%');
            // 图表画布
            Canvas.height(250);
            // 图表画布
            Canvas.onReady(() => {
                this.drawChart();
            });
            // 图表画布
            Canvas.onTouch((event: TouchEvent) => {
                this.handleTouch(event);
            });
        }, Canvas);
        // 图表画布
        Canvas.pop();
        // 图例
        this.Legend.bind(this)();
        Column.pop();
    }
    /**
     * 图例组件
     */
    Legend(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 步数图例
            Row.create();
            // 步数图例
            Row.margin({ right: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(10);
            Circle.height(10);
            Circle.fill(this.BAR_COLOR);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('步数');
            Text.fontSize(12);
            Text.fontColor(this.TEXT_COLOR);
            Text.margin({ left: 5 });
        }, Text);
        Text.pop();
        // 步数图例
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 目标线图例
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Line.create();
            Line.width(20);
            Line.height(2);
            Line.stroke(this.GOAL_LINE_COLOR);
            Line.strokeWidth(2);
        }, Line);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('目标');
            Text.fontSize(12);
            Text.fontColor(this.TEXT_COLOR);
            Text.margin({ left: 5 });
        }, Text);
        Text.pop();
        // 目标线图例
        Row.pop();
        Row.pop();
    }
    /**
     * 绘制图表
     * 性能优化：使用缓存和防抖
     */
    private drawChart(): void {
        // 性能监控：记录渲染开始时间
        const startTime = Date.now();
        if (this.chartData.length === 0) {
            this.drawEmptyChart();
            return;
        }
        const canvasWidth = this.context.width;
        const canvasHeight = this.context.height;
        // 性能优化：检查是否需要重新计算配置
        const dataHash = this.generateDataHash();
        if (dataHash !== this.lastDataHash || !this.renderConfig) {
            this.renderConfig = this.calculateRenderConfig(canvasWidth, canvasHeight);
            this.lastDataHash = dataHash;
        }
        // 清空画布
        this.context.clearRect(0, 0, canvasWidth, canvasHeight);
        // 使用缓存的渲染配置
        const config = this.renderConfig;
        // 绘制网格线
        this.drawGridLines(config.chartWidth, config.chartHeight, config.maxValue);
        // 绘制目标线
        this.drawGoalLine(config.chartWidth, config.chartHeight, config.yScale);
        // 绘制柱状图
        this.drawBars(config.chartWidth, config.chartHeight, config.yScale);
        // 绘制X轴标签
        this.drawXLabels(config.chartWidth, config.chartHeight);
        // 性能监控
        this.lastRenderTime = Date.now() - startTime;
        this.renderCount++;
        if (this.renderCount % 10 === 0) {
            Logger.debug(TAG, `Chart render time: ${this.lastRenderTime}ms, total renders: ${this.renderCount}`);
        }
    }
    /**
     * 计算渲染配置
     * 性能优化：缓存计算结果
     */
    private calculateRenderConfig(canvasWidth: number, canvasHeight: number): ChartRenderConfig {
        const chartWidth = canvasWidth - this.CHART_PADDING_LEFT - this.CHART_PADDING_RIGHT;
        const chartHeight = canvasHeight - this.CHART_PADDING_TOP - this.CHART_PADDING_BOTTOM;
        // 获取最大值用于计算比例
        const maxValue = Math.max(...this.chartData.map(d => Math.max(d.value, d.goal || 0)));
        const yScale = chartHeight / (maxValue * 1.1); // 留10%顶部空间
        const barCount = this.chartData.length;
        const barWidth = (chartWidth / barCount) * 0.6; // 柱子宽度
        const barGap = (chartWidth / barCount) * 0.4; // 柱子间距
        return {
            maxValue,
            yScale,
            chartWidth,
            chartHeight,
            barWidth,
            barGap
        };
    }
    /**
     * 生成数据哈希
     * 用于检测数据变化
     */
    private generateDataHash(): string {
        return `${this.chartData.length}_${this.chartData.map(d => `${d.value}_${d.goal}`).join('_')}_${this.selectedIndex}`;
    }
    /**
     * 绘制空图表提示
     */
    private drawEmptyChart(): void {
        const canvasWidth = this.context.width;
        const canvasHeight = this.context.height;
        this.context.clearRect(0, 0, canvasWidth, canvasHeight);
        this.context.fillStyle = this.TEXT_COLOR;
        this.context.font = '14px sans-serif';
        this.context.textAlign = 'center';
        this.context.fillText('暂无数据', canvasWidth / 2, canvasHeight / 2);
    }
    /**
     * 绘制网格线
     */
    private drawGridLines(chartWidth: number, chartHeight: number, maxValue: number): void {
        this.context.strokeStyle = this.GRID_COLOR;
        this.context.lineWidth = 1;
        // 绘制5条水平网格线
        const gridCount = 5;
        for (let i = 0; i <= gridCount; i++) {
            const y = this.CHART_PADDING_TOP + (chartHeight / gridCount) * i;
            this.context.beginPath();
            this.context.moveTo(this.CHART_PADDING_LEFT, y);
            this.context.lineTo(this.CHART_PADDING_LEFT + chartWidth, y);
            this.context.stroke();
            // 绘制Y轴刻度值
            const value = Math.round(maxValue * (1 - i / gridCount));
            this.context.fillStyle = this.TEXT_COLOR;
            this.context.font = '10px sans-serif';
            this.context.textAlign = 'right';
            this.context.fillText(value.toString(), this.CHART_PADDING_LEFT - 5, y + 4);
        }
    }
    /**
     * 绘制目标线
     */
    private drawGoalLine(chartWidth: number, chartHeight: number, yScale: number): void {
        // 获取平均目标值
        const goals = this.chartData.filter(d => d.goal && d.goal > 0).map(d => d.goal as number);
        if (goals.length === 0) {
            return;
        }
        const avgGoal = goals.reduce((a, b) => a + b, 0) / goals.length;
        const goalY = this.CHART_PADDING_TOP + chartHeight - avgGoal * yScale;
        this.context.strokeStyle = this.GOAL_LINE_COLOR;
        this.context.lineWidth = 2;
        this.context.setLineDash([5, 5]); // 虚线
        this.context.beginPath();
        this.context.moveTo(this.CHART_PADDING_LEFT, goalY);
        this.context.lineTo(this.CHART_PADDING_LEFT + chartWidth, goalY);
        this.context.stroke();
        this.context.setLineDash([]); // 重置为实线
    }
    /**
     * 绘制柱状图
     * 性能优化：使用缓存的配置
     */
    private drawBars(chartWidth: number, chartHeight: number, yScale: number): void {
        if (!this.renderConfig) {
            return;
        }
        const barCount = this.chartData.length;
        const barWidth = this.renderConfig.barWidth;
        const barGap = this.renderConfig.barGap;
        // 性能优化：批量设置样式
        this.context.fillStyle = this.BAR_COLOR;
        this.chartData.forEach((item, index) => {
            const x = this.CHART_PADDING_LEFT + (chartWidth / barCount) * index + barGap / 2;
            const barHeight = item.value * yScale;
            const y = this.CHART_PADDING_TOP + chartHeight - barHeight;
            // 设置柱子颜色（只在选中状态改变时更新）
            const color = index === this.selectedIndex ? this.BAR_COLOR_SELECTED : this.BAR_COLOR;
            if (this.context.fillStyle !== color) {
                this.context.fillStyle = color;
            }
            // 绘制圆角矩形
            this.drawRoundedRect(x, y, barWidth, barHeight, this.BAR_RADIUS);
            // 如果选中，显示数值
            if (index === this.selectedIndex) {
                this.context.fillStyle = this.TEXT_COLOR;
                this.context.font = 'bold 12px sans-serif';
                this.context.textAlign = 'center';
                this.context.fillText(item.value.toString(), x + barWidth / 2, y - 8);
            }
        });
    }
    /**
     * 绘制圆角矩形
     */
    private drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): void {
        this.context.beginPath();
        this.context.moveTo(x + radius, y);
        this.context.lineTo(x + width - radius, y);
        this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.context.lineTo(x + width, y + height);
        this.context.lineTo(x, y + height);
        this.context.lineTo(x, y + radius);
        this.context.quadraticCurveTo(x, y, x + radius, y);
        this.context.closePath();
        this.context.fill();
    }
    /**
     * 绘制X轴标签
     */
    private drawXLabels(chartWidth: number, chartHeight: number): void {
        const barCount = this.chartData.length;
        this.context.fillStyle = this.TEXT_COLOR;
        this.context.font = '10px sans-serif';
        this.context.textAlign = 'center';
        this.chartData.forEach((item, index) => {
            const x = this.CHART_PADDING_LEFT + (chartWidth / barCount) * (index + 0.5);
            const y = this.CHART_PADDING_TOP + chartHeight + 20;
            // 根据图表类型格式化标签
            let label = item.label;
            if (this.chartType === ChartType.WEEK) {
                // 周视图只显示星期几
                const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
                const date = new Date(item.label);
                label = '周' + weekDays[date.getDay()];
            }
            else if (this.chartType === ChartType.MONTH) {
                // 月视图只显示日期
                label = item.label.split('-')[2];
            }
            this.context.fillText(label, x, y);
        });
    }
    /**
     * 处理触摸事件
     * 性能优化：添加防抖机制
     */
    private handleTouch(event: TouchEvent): void {
        if (event.type === TouchType.Down || event.type === TouchType.Move) {
            // 性能优化：防抖处理
            if (this.drawDebounceTimer !== -1) {
                clearTimeout(this.drawDebounceTimer);
            }
            this.drawDebounceTimer = setTimeout(() => {
                this.processTouch(event);
            }, 16); // 约60fps
        }
        else if (event.type === TouchType.Up) {
            // 清理防抖定时器
            if (this.drawDebounceTimer !== -1) {
                clearTimeout(this.drawDebounceTimer);
                this.drawDebounceTimer = -1;
            }
        }
    }
    /**
     * 处理触摸逻辑
     */
    private processTouch(event: TouchEvent): void {
        const touchX = event.touches[0].x;
        const canvasWidth = this.context.width;
        const chartWidth = canvasWidth - this.CHART_PADDING_LEFT - this.CHART_PADDING_RIGHT;
        // 计算触摸位置对应的数据索引
        const relativeX = touchX - this.CHART_PADDING_LEFT;
        if (relativeX >= 0 && relativeX <= chartWidth) {
            const index = Math.floor((relativeX / chartWidth) * this.chartData.length);
            if (index >= 0 && index < this.chartData.length && index !== this.selectedIndex) {
                this.selectedIndex = index;
                this.drawChart();
            }
        }
    }
    /**
     * 组件销毁时清理资源
     */
    aboutToDisappear() {
        if (this.drawDebounceTimer !== -1) {
            clearTimeout(this.drawDebounceTimer);
            this.drawDebounceTimer = -1;
        }
        Logger.debug(TAG, `Chart component destroyed, total renders: ${this.renderCount}`);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class StatsCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__calories = new SynchedPropertySimpleOneWayPU(params.calories, this, "calories");
        this.__distance = new SynchedPropertySimpleOneWayPU(params.distance, this, "distance");
        this.__steps = new SynchedPropertySimpleOneWayPU(params.steps, this, "steps");
        this.__goal = new SynchedPropertySimpleOneWayPU(params.goal, this, "goal");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StatsCard_Params) {
        if (params.calories === undefined) {
            this.__calories.set(0);
        }
        if (params.distance === undefined) {
            this.__distance.set(0);
        }
        if (params.steps === undefined) {
            this.__steps.set(0);
        }
        if (params.goal === undefined) {
            this.__goal.set(0);
        }
    }
    updateStateVars(params: StatsCard_Params) {
        this.__calories.reset(params.calories);
        this.__distance.reset(params.distance);
        this.__steps.reset(params.steps);
        this.__goal.reset(params.goal);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__calories.purgeDependencyOnElmtId(rmElmtId);
        this.__distance.purgeDependencyOnElmtId(rmElmtId);
        this.__steps.purgeDependencyOnElmtId(rmElmtId);
        this.__goal.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__calories.aboutToBeDeleted();
        this.__distance.aboutToBeDeleted();
        this.__steps.aboutToBeDeleted();
        this.__goal.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __calories: SynchedPropertySimpleOneWayPU<number>; // 卡路里消耗
    get calories() {
        return this.__calories.get();
    }
    set calories(newValue: number) {
        this.__calories.set(newValue);
    }
    private __distance: SynchedPropertySimpleOneWayPU<number>; // 运动距离（米）
    get distance() {
        return this.__distance.get();
    }
    set distance(newValue: number) {
        this.__distance.set(newValue);
    }
    private __steps: SynchedPropertySimpleOneWayPU<number>; // 步数
    get steps() {
        return this.__steps.get();
    }
    set steps(newValue: number) {
        this.__steps.set(newValue);
    }
    private __goal: SynchedPropertySimpleOneWayPU<number>; // 目标步数
    get goal() {
        return this.__goal.get();
    }
    set goal(newValue: number) {
        this.__goal.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor(Color.White);
            Column.borderRadius(12);
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Text.create('今日运动数据');
            // 标题
            Text.fontSize(16);
            // 标题
            Text.fontWeight(FontWeight.Medium);
            // 标题
            Text.margin({ bottom: 15 });
        }, Text);
        // 标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 数据网格
            Row.create();
            // 数据网格
            Row.width('100%');
            // 数据网格
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        // 步数
        this.StatItem.bind(this)('步数', this.steps.toString(), '步');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(true);
            Divider.height(40);
            Divider.color('#E0E0E0');
        }, Divider);
        // 卡路里
        this.StatItem.bind(this)('卡路里', this.calories.toFixed(1), '千卡');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(true);
            Divider.height(40);
            Divider.color('#E0E0E0');
        }, Divider);
        // 距离
        this.StatItem.bind(this)('距离', this.formatDistance(this.distance), '');
        // 数据网格
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 进度条
            if (this.goal > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.margin({ top: 15 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ bottom: 5 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('目标进度');
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${Math.min(100, Math.round(this.steps / this.goal * 100))}%`);
                        Text.fontSize(12);
                        Text.fontColor('#4ECDC4');
                        Text.fontWeight(FontWeight.Medium);
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Progress.create({
                            value: this.steps,
                            total: this.goal,
                            type: ProgressType.Linear
                        });
                        Progress.color('#4ECDC4');
                        Progress.backgroundColor('#E0E0E0');
                        Progress.height(8);
                        Progress.borderRadius(4);
                    }, Progress);
                    Column.pop();
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
            Text.fontSize(20);
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
     * 格式化距离
     */
    private formatDistance(meters: number): string {
        if (meters < 1000) {
            return `${Math.round(meters)}米`;
        }
        else {
            return `${(meters / 1000).toFixed(2)}公里`;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
