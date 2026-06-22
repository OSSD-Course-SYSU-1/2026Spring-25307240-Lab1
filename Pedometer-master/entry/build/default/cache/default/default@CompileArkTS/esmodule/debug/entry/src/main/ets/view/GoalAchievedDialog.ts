if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GoalAchievedDialog_Params {
    steps?: number;
    goal?: number;
    calories?: number;
    distance?: number;
    duration?: number;
    scaleValue?: number;
    opacityValue?: number;
    confettiY?: number;
    // 回调函数
    cancel?: () => void;
    confirm?: () => void;
    share?: () => void;
    // 弹窗控制器
    controller?: CustomDialogController;
}
import type { DialogData } from '../common/types/Types';
import curves from "@native:ohos.curves";
export class GoalAchievedDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__steps = new SynchedPropertySimpleOneWayPU(params.steps, this, "steps");
        this.__goal = new SynchedPropertySimpleOneWayPU(params.goal, this, "goal");
        this.__calories = new SynchedPropertySimpleOneWayPU(params.calories, this, "calories");
        this.__distance = new SynchedPropertySimpleOneWayPU(params.distance, this, "distance");
        this.__duration = new SynchedPropertySimpleOneWayPU(params.duration, this, "duration");
        this.__scaleValue = new ObservedPropertySimplePU(0, this, "scaleValue");
        this.__opacityValue = new ObservedPropertySimplePU(0, this, "opacityValue");
        this.__confettiY = new ObservedPropertySimplePU(0, this, "confettiY");
        this.cancel = undefined;
        this.confirm = undefined;
        this.share = undefined;
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GoalAchievedDialog_Params) {
        if (params.steps === undefined) {
            this.__steps.set(0);
        }
        if (params.goal === undefined) {
            this.__goal.set(0);
        }
        if (params.calories === undefined) {
            this.__calories.set(0);
        }
        if (params.distance === undefined) {
            this.__distance.set(0);
        }
        if (params.duration === undefined) {
            this.__duration.set(0);
        }
        if (params.scaleValue !== undefined) {
            this.scaleValue = params.scaleValue;
        }
        if (params.opacityValue !== undefined) {
            this.opacityValue = params.opacityValue;
        }
        if (params.confettiY !== undefined) {
            this.confettiY = params.confettiY;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.share !== undefined) {
            this.share = params.share;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: GoalAchievedDialog_Params) {
        this.__steps.reset(params.steps);
        this.__goal.reset(params.goal);
        this.__calories.reset(params.calories);
        this.__distance.reset(params.distance);
        this.__duration.reset(params.duration);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__steps.purgeDependencyOnElmtId(rmElmtId);
        this.__goal.purgeDependencyOnElmtId(rmElmtId);
        this.__calories.purgeDependencyOnElmtId(rmElmtId);
        this.__distance.purgeDependencyOnElmtId(rmElmtId);
        this.__duration.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleValue.purgeDependencyOnElmtId(rmElmtId);
        this.__opacityValue.purgeDependencyOnElmtId(rmElmtId);
        this.__confettiY.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__steps.aboutToBeDeleted();
        this.__goal.aboutToBeDeleted();
        this.__calories.aboutToBeDeleted();
        this.__distance.aboutToBeDeleted();
        this.__duration.aboutToBeDeleted();
        this.__scaleValue.aboutToBeDeleted();
        this.__opacityValue.aboutToBeDeleted();
        this.__confettiY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __steps: SynchedPropertySimpleOneWayPU<number>; // 完成的步数
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
    private __calories: SynchedPropertySimpleOneWayPU<number>; // 消耗的卡路里
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
    private __duration: SynchedPropertySimpleOneWayPU<number>; // 运动时长（分钟）
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    // 动画状态
    private __scaleValue: ObservedPropertySimplePU<number>;
    get scaleValue() {
        return this.__scaleValue.get();
    }
    set scaleValue(newValue: number) {
        this.__scaleValue.set(newValue);
    }
    private __opacityValue: ObservedPropertySimplePU<number>;
    get opacityValue() {
        return this.__opacityValue.get();
    }
    set opacityValue(newValue: number) {
        this.__opacityValue.set(newValue);
    }
    private __confettiY: ObservedPropertySimplePU<number>;
    get confettiY() {
        return this.__confettiY.get();
    }
    set confettiY(newValue: number) {
        this.__confettiY.set(newValue);
    }
    // 回调函数
    private cancel?: () => void;
    private confirm?: () => void;
    private share?: () => void;
    // 弹窗控制器
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.
        // 弹窗控制器
        controller = ctr;
    }
    aboutToAppear() {
        // 启动入场动画
        this.startAnimation();
    }
    /**
     * 启动入场动画
     */
    private startAnimation(): void {
        // 缩放动画
        Context.animateTo({
            duration: 500,
            curve: curves.springMotion(0.6, 0.8),
            onFinish: () => {
                // 启动彩带动画
                this.animateConfetti();
            }
        }, () => {
            this.scaleValue = 1;
            this.opacityValue = 1;
        });
    }
    /**
     * 彩带下落动画
     */
    private animateConfetti(): void {
        Context.animateTo({
            duration: 2000,
            curve: Curve.EaseOut,
            iterations: 1
        }, () => {
            this.confettiY = 100;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('rgba(0, 0, 0, 0.4)');
        }, Column);
        // 彩带效果（简化版）
        this.ConfettiEffect.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主要内容
            Column.create();
            // 主要内容
            Column.width('85%');
            // 主要内容
            Column.padding(25);
            // 主要内容
            Column.backgroundColor(Color.White);
            // 主要内容
            Column.borderRadius(20);
            // 主要内容
            Column.shadow({
                radius: 20,
                color: 'rgba(0, 0, 0, 0.15)',
                offsetX: 0,
                offsetY: 5
            });
            // 主要内容
            Column.scale({ x: this.scaleValue, y: this.scaleValue });
            // 主要内容
            Column.opacity(this.opacityValue);
        }, Column);
        // 庆祝图标
        this.CelebrationIcon.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 恭喜文字
            Text.create('恭喜达成目标！');
            // 恭喜文字
            Text.fontSize(24);
            // 恭喜文字
            Text.fontWeight(FontWeight.Bold);
            // 恭喜文字
            Text.fontColor('#333333');
            // 恭喜文字
            Text.margin({ top: 15, bottom: 10 });
        }, Text);
        // 恭喜文字
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 完成信息
            Text.create(`您今日已完成 ${this.steps} 步`);
            // 完成信息
            Text.fontSize(16);
            // 完成信息
            Text.fontColor('#666666');
            // 完成信息
            Text.margin({ bottom: 20 });
        }, Text);
        // 完成信息
        Text.pop();
        // 数据统计卡片
        this.StatsCard.bind(this)();
        // 按钮区域
        this.ButtonArea.bind(this)();
        // 主要内容
        Column.pop();
        Column.pop();
    }
    /**
     * 彩带效果组件
     */
    ConfettiEffect(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 简化的彩带效果，使用多个小圆形模拟
            Stack.create();
            // 简化的彩带效果，使用多个小圆形模拟
            Stack.width('100%');
            // 简化的彩带效果，使用多个小圆形模拟
            Stack.height(100);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Circle.create();
                    Circle.width(8);
                    Circle.height(8);
                    Circle.fill(this.getConfettiColor(item));
                    Circle.position({
                        x: `${10 + item * 10}%`,
                        y: this.confettiY
                    });
                    Circle.opacity(0.8);
                }, Circle);
            };
            this.forEachUpdateFunction(elmtId, [1, 2, 3, 4, 5, 6, 7, 8], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 简化的彩带效果，使用多个小圆形模拟
        Stack.pop();
    }
    /**
     * 获取彩带颜色
     */
    private getConfettiColor(index: number): string {
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA'];
        return colors[(index - 1) % colors.length];
    }
    /**
     * 庆祝图标组件
     */
    CelebrationIcon(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(80);
            Stack.height(80);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 外圈光晕
            Circle.create();
            // 外圈光晕
            Circle.width(80);
            // 外圈光晕
            Circle.height(80);
            // 外圈光晕
            Circle.fill('rgba(78, 205, 196, 0.2)');
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内圈
            Circle.create();
            // 内圈
            Circle.width(60);
            // 内圈
            Circle.height(60);
            // 内圈
            Circle.fill('#4ECDC4');
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 奖杯图标（使用文字代替）
            Text.create('🏆');
            // 奖杯图标（使用文字代替）
            Text.fontSize(30);
        }, Text);
        // 奖杯图标（使用文字代替）
        Text.pop();
        Stack.pop();
    }
    /**
     * 数据统计卡片
     */
    StatsCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('#F5F5F5');
            Column.borderRadius(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.margin({ bottom: 15 });
        }, Row);
        this.StatItem.bind(this)('目标', this.goal.toString(), '步');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(true);
            Divider.height(30);
            Divider.color('#E0E0E0');
        }, Divider);
        this.StatItem.bind(this)('实际', this.steps.toString(), '步');
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.StatItem.bind(this)('卡路里', this.calories.toFixed(1), '千卡');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(true);
            Divider.height(30);
            Divider.color('#E0E0E0');
        }, Divider);
        this.StatItem.bind(this)('距离', this.formatDistance(this.distance), '');
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
            Text.fontColor('#999999');
            Text.margin({ bottom: 3 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(16);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (unit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(unit);
                        Text.fontSize(10);
                        Text.fontColor('#999999');
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
     * 按钮区域
     */
    ButtonArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 关闭按钮
            Button.createWithLabel('关闭');
            // 关闭按钮
            Button.width('40%');
            // 关闭按钮
            Button.height(40);
            // 关闭按钮
            Button.fontSize(14);
            // 关闭按钮
            Button.fontColor('#666666');
            // 关闭按钮
            Button.backgroundColor('#F0F0F0');
            // 关闭按钮
            Button.borderRadius(20);
            // 关闭按钮
            Button.onClick(() => {
                this.controller.close();
                if (this.cancel) {
                    this.cancel();
                }
            });
        }, Button);
        // 关闭按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分享按钮
            Button.createWithLabel('分享成就');
            // 分享按钮
            Button.width('40%');
            // 分享按钮
            Button.height(40);
            // 分享按钮
            Button.fontSize(14);
            // 分享按钮
            Button.fontColor(Color.White);
            // 分享按钮
            Button.backgroundColor('#4ECDC4');
            // 分享按钮
            Button.borderRadius(20);
            // 分享按钮
            Button.onClick(() => {
                this.controller.close();
                if (this.share) {
                    this.share();
                }
            });
        }, Button);
        // 分享按钮
        Button.pop();
        Row.pop();
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
/**
 * 目标达成弹窗管理器
 * 用于在主页面中控制弹窗的显示
 */
export class GoalAchievedDialogManager {
    private dialogController: CustomDialogController | null = null;
    private hasShown: boolean = false; // 防止重复显示
    /**
     * 显示目标达成弹窗
     *
     * @param uiContext UI上下文
     * @param data 弹窗数据
     */
    show(uiContext: UIContext, data: DialogData): void {
        // 如果已经显示过，不再重复显示
        if (this.hasShown) {
            return;
        }
        this.hasShown = true;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new GoalAchievedDialog(this, {
                    steps: data.steps,
                    goal: data.goal,
                    calories: data.calories,
                    distance: data.distance,
                    duration: data.duration,
                    cancel: () => {
                        this.hasShown = false;
                    },
                    share: () => {
                        this.handleShare(data);
                    }
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/view/GoalAchievedDialog.ets", line: 327, col: 16 });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        steps: data.steps,
                        goal: data.goal,
                        calories: data.calories,
                        distance: data.distance,
                        duration: data.duration,
                        cancel: () => {
                            this.hasShown = false;
                        },
                        share: () => {
                            this.handleShare(data);
                        }
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: false,
            customStyle: true,
            alignment: DialogAlignment.Center
        }, this);
        this.dialogController.open();
    }
    /**
     * 处理分享
     * 可以扩展为分享到社交媒体
     */
    private handleShare(data: DialogData): void {
        // 构建分享内容
        const shareText = `我今天走了${data.steps}步，消耗${data.calories.toFixed(1)}千卡，达成运动目标！`;
        // 这里可以调用系统分享API
        // 目前使用Toast提示
        console.info('Share content:', shareText);
    }
    /**
     * 重置状态
     * 每日重置时调用
     */
    reset(): void {
        this.hasShown = false;
    }
    /**
     * 关闭弹窗
     */
    close(): void {
        if (this.dialogController) {
            this.dialogController.close();
            this.dialogController = null;
        }
        this.hasShown = false;
    }
}
