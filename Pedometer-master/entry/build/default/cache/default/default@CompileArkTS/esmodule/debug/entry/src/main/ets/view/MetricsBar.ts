if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MetricsBar_Params {
    calorieCurrent?: number;
    calorieGoal?: number;
    exerciseCurrent?: number;
    exerciseGoal?: number;
    hoursCurrent?: number;
    hoursGoal?: number;
    animatedCalorie?: number;
    animatedExercise?: number;
    animatedHours?: number;
}
import { DesignSystem } from "@normalized:N&&&entry/src/main/ets/common/constants/DesignSystem&";
export class MetricsBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__calorieCurrent = new SynchedPropertySimpleOneWayPU(params.calorieCurrent, this, "calorieCurrent");
        this.__calorieGoal = new SynchedPropertySimpleOneWayPU(params.calorieGoal, this, "calorieGoal");
        this.__exerciseCurrent = new SynchedPropertySimpleOneWayPU(params.exerciseCurrent, this, "exerciseCurrent");
        this.__exerciseGoal = new SynchedPropertySimpleOneWayPU(params.exerciseGoal, this, "exerciseGoal");
        this.__hoursCurrent = new SynchedPropertySimpleOneWayPU(params.hoursCurrent, this, "hoursCurrent");
        this.__hoursGoal = new SynchedPropertySimpleOneWayPU(params.hoursGoal, this, "hoursGoal");
        this.__animatedCalorie = new ObservedPropertySimplePU(0, this, "animatedCalorie");
        this.__animatedExercise = new ObservedPropertySimplePU(0, this, "animatedExercise");
        this.__animatedHours = new ObservedPropertySimplePU(0, this, "animatedHours");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MetricsBar_Params) {
        if (params.calorieCurrent === undefined) {
            this.__calorieCurrent.set(0);
        }
        if (params.calorieGoal === undefined) {
            this.__calorieGoal.set(270);
        }
        if (params.exerciseCurrent === undefined) {
            this.__exerciseCurrent.set(0);
        }
        if (params.exerciseGoal === undefined) {
            this.__exerciseGoal.set(25);
        }
        if (params.hoursCurrent === undefined) {
            this.__hoursCurrent.set(0);
        }
        if (params.hoursGoal === undefined) {
            this.__hoursGoal.set(12);
        }
        if (params.animatedCalorie !== undefined) {
            this.animatedCalorie = params.animatedCalorie;
        }
        if (params.animatedExercise !== undefined) {
            this.animatedExercise = params.animatedExercise;
        }
        if (params.animatedHours !== undefined) {
            this.animatedHours = params.animatedHours;
        }
    }
    updateStateVars(params: MetricsBar_Params) {
        this.__calorieCurrent.reset(params.calorieCurrent);
        this.__calorieGoal.reset(params.calorieGoal);
        this.__exerciseCurrent.reset(params.exerciseCurrent);
        this.__exerciseGoal.reset(params.exerciseGoal);
        this.__hoursCurrent.reset(params.hoursCurrent);
        this.__hoursGoal.reset(params.hoursGoal);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__calorieCurrent.purgeDependencyOnElmtId(rmElmtId);
        this.__calorieGoal.purgeDependencyOnElmtId(rmElmtId);
        this.__exerciseCurrent.purgeDependencyOnElmtId(rmElmtId);
        this.__exerciseGoal.purgeDependencyOnElmtId(rmElmtId);
        this.__hoursCurrent.purgeDependencyOnElmtId(rmElmtId);
        this.__hoursGoal.purgeDependencyOnElmtId(rmElmtId);
        this.__animatedCalorie.purgeDependencyOnElmtId(rmElmtId);
        this.__animatedExercise.purgeDependencyOnElmtId(rmElmtId);
        this.__animatedHours.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__calorieCurrent.aboutToBeDeleted();
        this.__calorieGoal.aboutToBeDeleted();
        this.__exerciseCurrent.aboutToBeDeleted();
        this.__exerciseGoal.aboutToBeDeleted();
        this.__hoursCurrent.aboutToBeDeleted();
        this.__hoursGoal.aboutToBeDeleted();
        this.__animatedCalorie.aboutToBeDeleted();
        this.__animatedExercise.aboutToBeDeleted();
        this.__animatedHours.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __calorieCurrent: SynchedPropertySimpleOneWayPU<number>;
    get calorieCurrent() {
        return this.__calorieCurrent.get();
    }
    set calorieCurrent(newValue: number) {
        this.__calorieCurrent.set(newValue);
    }
    private __calorieGoal: SynchedPropertySimpleOneWayPU<number>;
    get calorieGoal() {
        return this.__calorieGoal.get();
    }
    set calorieGoal(newValue: number) {
        this.__calorieGoal.set(newValue);
    }
    private __exerciseCurrent: SynchedPropertySimpleOneWayPU<number>;
    get exerciseCurrent() {
        return this.__exerciseCurrent.get();
    }
    set exerciseCurrent(newValue: number) {
        this.__exerciseCurrent.set(newValue);
    }
    private __exerciseGoal: SynchedPropertySimpleOneWayPU<number>;
    get exerciseGoal() {
        return this.__exerciseGoal.get();
    }
    set exerciseGoal(newValue: number) {
        this.__exerciseGoal.set(newValue);
    }
    private __hoursCurrent: SynchedPropertySimpleOneWayPU<number>;
    get hoursCurrent() {
        return this.__hoursCurrent.get();
    }
    set hoursCurrent(newValue: number) {
        this.__hoursCurrent.set(newValue);
    }
    private __hoursGoal: SynchedPropertySimpleOneWayPU<number>;
    get hoursGoal() {
        return this.__hoursGoal.get();
    }
    set hoursGoal(newValue: number) {
        this.__hoursGoal.set(newValue);
    }
    // 动画状态
    private __animatedCalorie: ObservedPropertySimplePU<number>;
    get animatedCalorie() {
        return this.__animatedCalorie.get();
    }
    set animatedCalorie(newValue: number) {
        this.__animatedCalorie.set(newValue);
    }
    private __animatedExercise: ObservedPropertySimplePU<number>;
    get animatedExercise() {
        return this.__animatedExercise.get();
    }
    set animatedExercise(newValue: number) {
        this.__animatedExercise.set(newValue);
    }
    private __animatedHours: ObservedPropertySimplePU<number>;
    get animatedHours() {
        return this.__animatedHours.get();
    }
    set animatedHours(newValue: number) {
        this.__animatedHours.set(newValue);
    }
    aboutToAppear(): void {
        // 启动数值动画
        this.animateValue('calorie', this.calorieCurrent);
        this.animateValue('exercise', this.exerciseCurrent);
        this.animateValue('hours', this.hoursCurrent);
    }
    private animateValue(type: string, target: number): void {
        setTimeout(() => {
            if (type === 'calorie') {
                this.animatedCalorie = target;
            }
            else if (type === 'exercise') {
                this.animatedExercise = target;
            }
            else if (type === 'hours') {
                this.animatedHours = target;
            }
        }, 100);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: DesignSystem.SPACING_2XL, bottom: DesignSystem.SPACING_2XL, left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        // 活动热量（红色）
        this.MetricItem.bind(this)(DesignSystem.COLOR_PRIMARY, DesignSystem.COLOR_PRIMARY_LIGHT, '活动热量', this.animatedCalorie, this.calorieGoal, '千卡', '🔥');
        // 锻炼时长（黄色）
        this.MetricItem.bind(this)(DesignSystem.COLOR_ACCENT, DesignSystem.COLOR_ACCENT_LIGHT, '锻炼时长', this.animatedExercise, this.exerciseGoal, '分钟', '⚡');
        // 活动小时数（蓝色）
        this.MetricItem.bind(this)(DesignSystem.COLOR_INFO, DesignSystem.COLOR_INFO_LIGHT, '活动小时', this.animatedHours, this.hoursGoal, '小时', '⏱');
        Row.pop();
        Column.pop();
    }
    MetricItem(color: string, lightColor: string, title: string, current: number, goal: number, unit: string, icon: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题行（彩色圆点 + 标题）
            Row.create();
            // 标题行（彩色圆点 + 标题）
            Row.width('100%');
            // 标题行（彩色圆点 + 标题）
            Row.margin({ bottom: DesignSystem.SPACING_MD });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 渐变圆点
            Stack.create();
            // 渐变圆点
            Stack.width(10);
            // 渐变圆点
            Stack.height(10);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(10);
            Circle.height(10);
            Circle.linearGradient({
                angle: 135,
                colors: [[color, 0], [lightColor, 1]]
            });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内发光效果
            Circle.create();
            // 内发光效果
            Circle.width(6);
            // 内发光效果
            Circle.height(6);
            // 内发光效果
            Circle.fill(DesignSystem.withAlpha(color, 0.5));
            // 内发光效果
            Circle.blur(2);
        }, Circle);
        // 渐变圆点
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(DesignSystem.FONT_SIZE_SM);
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
            Text.margin({ left: DesignSystem.SPACING_SM });
        }, Text);
        Text.pop();
        // 标题行（彩色圆点 + 标题）
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 数值行（当前值 / 目标值 + 单位）
            Row.create();
            // 数值行（当前值 / 目标值 + 单位）
            Row.width('100%');
            // 数值行（当前值 / 目标值 + 单位）
            Row.alignItems(VerticalAlign.Bottom);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${Math.round(current)}`);
            Context.animation({
                duration: DesignSystem.DURATION_NORMAL,
                curve: Curve.EaseOut
            });
            Text.fontSize(DesignSystem.FONT_SIZE_2XL);
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_BOLD);
            Context.animation(null);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(' / ');
            Text.fontSize(DesignSystem.FONT_SIZE_LG);
            Text.fontColor(DesignSystem.TEXT_TERTIARY);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${goal}`);
            Text.fontSize(DesignSystem.FONT_SIZE_LG);
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(' ' + unit);
            Text.fontSize(DesignSystem.FONT_SIZE_SM);
            Text.fontColor(DesignSystem.TEXT_TERTIARY);
        }, Text);
        Text.pop();
        // 数值行（当前值 / 目标值 + 单位）
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 进度条
            Stack.create({ alignContent: Alignment.Start });
            // 进度条
            Stack.width('100%');
            // 进度条
            Stack.margin({ top: DesignSystem.SPACING_SM });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 背景轨道
            Row.create();
            // 背景轨道
            Row.width('100%');
            // 背景轨道
            Row.height(3);
            // 背景轨道
            Row.borderRadius(2);
            // 背景轨道
            Row.backgroundColor(DesignSystem.BORDER_LIGHT);
        }, Row);
        // 背景轨道
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 进度填充
            Row.create();
            Context.animation({
                duration: DesignSystem.DURATION_SLOW,
                curve: Curve.EaseOut
            });
            // 进度填充
            Row.width(`${Math.min(100, (current / goal) * 100)}%`);
            // 进度填充
            Row.height(3);
            // 进度填充
            Row.borderRadius(2);
            // 进度填充
            Row.linearGradient({
                angle: 90,
                colors: [[color, 0], [lightColor, 1]]
            });
            Context.animation(null);
        }, Row);
        // 进度填充
        Row.pop();
        // 进度条
        Stack.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
