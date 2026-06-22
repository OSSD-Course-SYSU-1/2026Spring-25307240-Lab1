if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FeatureGrid_Params {
    onStartExercise?: () => void;
    pressedCard?: number;
}
import { DesignSystem } from "@normalized:N&&&entry/src/main/ets/common/constants/DesignSystem&";
export class FeatureGrid extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.onStartExercise = () => { };
        this.__pressedCard = new ObservedPropertySimplePU(-1, this, "pressedCard");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FeatureGrid_Params) {
        if (params.onStartExercise !== undefined) {
            this.onStartExercise = params.onStartExercise;
        }
        if (params.pressedCard !== undefined) {
            this.pressedCard = params.pressedCard;
        }
    }
    updateStateVars(params: FeatureGrid_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pressedCard.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pressedCard.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private onStartExercise: () => void;
    private __pressedCard: ObservedPropertySimplePU<number>;
    get pressedCard() {
        return this.__pressedCard.get();
    }
    set pressedCard(newValue: number) {
        this.__pressedCard.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG, top: DesignSystem.SPACING_LG });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 第一行
            Row.create();
            // 第一行
            Row.width('100%');
            // 第一行
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 第一行
            Row.margin({ bottom: DesignSystem.SPACING_MD });
        }, Row);
        this.ExerciseRecordCard.bind(this)();
        this.TrainingRecommendCard.bind(this)();
        // 第一行
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 第二行
            Row.create();
            // 第二行
            Row.width('100%');
            // 第二行
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.SleepCard.bind(this)();
        this.HeartHealthCard.bind(this)();
        // 第二行
        Row.pop();
        Column.pop();
    }
    ExerciseRecordCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({
                duration: DesignSystem.DURATION_FAST,
                curve: Curve.EaseOut
            });
            Column.width('45%');
            Column.height(130);
            Column.backgroundColor(DesignSystem.BG_CARD_SOLID);
            Column.borderRadius(DesignSystem.RADIUS_LG);
            Column.border({
                width: 1,
                color: DesignSystem.BORDER_LIGHT
            });
            Column.shadow({
                radius: 8,
                color: 'rgba(0, 0, 0, 0.2)',
                offsetX: 0,
                offsetY: 4
            });
            Column.scale({ x: this.pressedCard === 0 ? 0.95 : 1, y: this.pressedCard === 0 ? 0.95 : 1 });
            Context.animation(null);
            Column.onClick(() => {
                this.pressedCard = 0;
                setTimeout(() => {
                    this.pressedCard = -1;
                    this.onStartExercise();
                }, 100);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部装饰渐变
            Row.create();
            // 顶部装饰渐变
            Row.width('100%');
            // 顶部装饰渐变
            Row.height(3);
            // 顶部装饰渐变
            Row.linearGradient({
                angle: 90,
                colors: [[DesignSystem.COLOR_PRIMARY, 0], [DesignSystem.COLOR_PRIMARY_LIGHT, 1]]
            });
            // 顶部装饰渐变
            Row.borderRadius({ topLeft: DesignSystem.RADIUS_LG, topRight: DesignSystem.RADIUS_LG });
        }, Row);
        // 顶部装饰渐变
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(DesignSystem.SPACING_MD);
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.SpaceBetween);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('运动记录');
            Text.fontSize(DesignSystem.FONT_SIZE_LG);
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_BOLD);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 火焰图标
            Text.create('🔥');
            // 火焰图标
            Text.fontSize(DesignSystem.FONT_SIZE_LG);
        }, Text);
        // 火焰图标
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1公里跑步');
            Text.fontSize(DesignSystem.FONT_SIZE_SM);
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ top: DesignSystem.SPACING_XS });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('开始运动');
            Button.fontSize(DesignSystem.FONT_SIZE_SM);
            Button.linearGradient({
                angle: 135,
                colors: [[DesignSystem.COLOR_PRIMARY, 0], [DesignSystem.COLOR_PRIMARY_LIGHT, 1]]
            });
            Button.fontColor(DesignSystem.TEXT_PRIMARY);
            Button.borderRadius(DesignSystem.RADIUS_LG);
            Button.height(DesignSystem.BTN_HEIGHT_SM);
            Button.alignSelf(ItemAlign.Start);
            Button.onClick(() => {
                this.onStartExercise();
            });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
    }
    TrainingRecommendCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('45%');
            Column.height(130);
            Column.backgroundColor(DesignSystem.BG_CARD_SOLID);
            Column.borderRadius(DesignSystem.RADIUS_LG);
            Column.border({
                width: 1,
                color: DesignSystem.BORDER_LIGHT
            });
            Column.shadow({
                radius: 8,
                color: 'rgba(0, 0, 0, 0.2)',
                offsetX: 0,
                offsetY: 4
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部装饰渐变
            Row.create();
            // 顶部装饰渐变
            Row.width('100%');
            // 顶部装饰渐变
            Row.height(3);
            // 顶部装饰渐变
            Row.linearGradient({
                angle: 90,
                colors: [[DesignSystem.COLOR_ACCENT, 0], [DesignSystem.COLOR_ACCENT_LIGHT, 1]]
            });
            // 顶部装饰渐变
            Row.borderRadius({ topLeft: DesignSystem.RADIUS_LG, topRight: DesignSystem.RADIUS_LG });
        }, Row);
        // 顶部装饰渐变
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(DesignSystem.SPACING_MD);
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.SpaceBetween);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('40分钟有氧跑');
            Text.fontSize(DesignSystem.FONT_SIZE_LG);
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_BOLD);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('×');
            Text.fontSize(DesignSystem.FONT_SIZE_LG);
            Text.fontColor(DesignSystem.TEXT_TERTIARY);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('带你越跑越轻松！');
            Text.fontSize(DesignSystem.FONT_SIZE_SM);
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ top: DesignSystem.SPACING_XS });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignSelf(ItemAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('即刻开练');
            Text.fontSize(DesignSystem.FONT_SIZE_SM);
            Text.fontColor(DesignSystem.COLOR_ACCENT);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_MEDIUM);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(' →');
            Text.fontSize(DesignSystem.FONT_SIZE_SM);
            Text.fontColor(DesignSystem.COLOR_ACCENT);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    SleepCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('45%');
            Column.height(130);
            Column.backgroundColor(DesignSystem.BG_CARD_SOLID);
            Column.borderRadius(DesignSystem.RADIUS_LG);
            Column.border({
                width: 1,
                color: DesignSystem.BORDER_LIGHT
            });
            Column.shadow({
                radius: 8,
                color: 'rgba(0, 0, 0, 0.2)',
                offsetX: 0,
                offsetY: 4
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部装饰渐变
            Row.create();
            // 顶部装饰渐变
            Row.width('100%');
            // 顶部装饰渐变
            Row.height(3);
            // 顶部装饰渐变
            Row.linearGradient({
                angle: 90,
                colors: [[DesignSystem.COLOR_INFO, 0], [DesignSystem.COLOR_INFO_LIGHT, 1]]
            });
            // 顶部装饰渐变
            Row.borderRadius({ topLeft: DesignSystem.RADIUS_LG, topRight: DesignSystem.RADIUS_LG });
        }, Row);
        // 顶部装饰渐变
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(DesignSystem.SPACING_MD);
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.SpaceBetween);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('睡眠');
            Text.fontSize(DesignSystem.FONT_SIZE_LG);
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_BOLD);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🌙');
            Text.fontSize(DesignSystem.FONT_SIZE_LG);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Bottom);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('6');
            Text.fontSize(DesignSystem.FONT_SIZE_3XL);
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_BOLD);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('小时');
            Text.fontSize(DesignSystem.FONT_SIZE_MD);
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
            Text.margin({ left: DesignSystem.SPACING_XS });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('35');
            Text.fontSize(DesignSystem.FONT_SIZE_3XL);
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_BOLD);
            Text.margin({ left: DesignSystem.SPACING_MD });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('分钟');
            Text.fontSize(DesignSystem.FONT_SIZE_MD);
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
            Text.margin({ left: DesignSystem.SPACING_XS });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    HeartHealthCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('45%');
            Column.height(130);
            Column.backgroundColor(DesignSystem.BG_CARD_SOLID);
            Column.borderRadius(DesignSystem.RADIUS_LG);
            Column.border({
                width: 1,
                color: DesignSystem.BORDER_LIGHT
            });
            Column.shadow({
                radius: 8,
                color: 'rgba(0, 0, 0, 0.2)',
                offsetX: 0,
                offsetY: 4
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部装饰渐变
            Row.create();
            // 顶部装饰渐变
            Row.width('100%');
            // 顶部装饰渐变
            Row.height(3);
            // 顶部装饰渐变
            Row.linearGradient({
                angle: 90,
                colors: [[DesignSystem.COLOR_SUCCESS, 0], [DesignSystem.COLOR_SUCCESS_LIGHT, 1]]
            });
            // 顶部装饰渐变
            Row.borderRadius({ topLeft: DesignSystem.RADIUS_LG, topRight: DesignSystem.RADIUS_LG });
        }, Row);
        // 顶部装饰渐变
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(DesignSystem.SPACING_MD);
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.SpaceBetween);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('心脏健康');
            Text.fontSize(DesignSystem.FONT_SIZE_LG);
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_BOLD);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('❤️');
            Text.fontSize(DesignSystem.FONT_SIZE_LG);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('心率监测');
            Text.fontSize(DesignSystem.FONT_SIZE_SM);
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('心电图解读');
            Text.fontSize(DesignSystem.FONT_SIZE_SM);
            Text.fontColor(DesignSystem.TEXT_TERTIARY);
            Text.margin({ top: DesignSystem.SPACING_XS });
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
