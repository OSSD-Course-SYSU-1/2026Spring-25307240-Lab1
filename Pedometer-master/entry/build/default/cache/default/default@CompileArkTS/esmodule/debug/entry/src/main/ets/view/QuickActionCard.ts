if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface QuickActionCard_Params {
    onStartRunning?: () => void;
    isPressed?: boolean;
    isHovered?: boolean;
}
import { DesignSystem } from "@normalized:N&&&entry/src/main/ets/common/constants/DesignSystem&";
export class QuickActionCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.onStartRunning = () => { };
        this.__isPressed = new ObservedPropertySimplePU(false, this, "isPressed");
        this.__isHovered = new ObservedPropertySimplePU(false, this, "isHovered");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: QuickActionCard_Params) {
        if (params.onStartRunning !== undefined) {
            this.onStartRunning = params.onStartRunning;
        }
        if (params.isPressed !== undefined) {
            this.isPressed = params.isPressed;
        }
        if (params.isHovered !== undefined) {
            this.isHovered = params.isHovered;
        }
    }
    updateStateVars(params: QuickActionCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isPressed.purgeDependencyOnElmtId(rmElmtId);
        this.__isHovered.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isPressed.aboutToBeDeleted();
        this.__isHovered.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private onStartRunning: () => void;
    private __isPressed: ObservedPropertySimplePU<boolean>;
    get isPressed() {
        return this.__isPressed.get();
    }
    set isPressed(newValue: boolean) {
        this.__isPressed.set(newValue);
    }
    private __isHovered: ObservedPropertySimplePU<boolean>;
    get isHovered() {
        return this.__isHovered.get();
    }
    set isHovered(newValue: boolean) {
        this.__isHovered.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(DesignSystem.SPACING_LG);
            Row.linearGradient({
                angle: 135,
                colors: [['rgba(40, 40, 48, 0.7)', 0], ['rgba(50, 50, 58, 0.5)', 1]]
            });
            Row.borderRadius(DesignSystem.RADIUS_LG);
            Row.margin({ top: DesignSystem.SPACING_LG, left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG });
            Row.border({
                width: 1,
                color: DesignSystem.BORDER_LIGHT
            });
            Row.backdropBlur(20);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 左区域：添加快捷功能
            Row.create();
            // 左区域：添加快捷功能
            Row.layoutWeight(1);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 白色圆形加号图标（带动画）
            Stack.create();
            // 白色圆形加号图标（带动画）
            Stack.width(DesignSystem.ICON_SIZE_XL);
            // 白色圆形加号图标（带动画）
            Stack.height(DesignSystem.ICON_SIZE_XL);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(DesignSystem.ICON_SIZE_XL);
            Circle.height(DesignSystem.ICON_SIZE_XL);
            Circle.fill(DesignSystem.TEXT_PRIMARY);
            Circle.shadow({
                radius: 8,
                color: 'rgba(255, 255, 255, 0.3)',
                offsetX: 0,
                offsetY: 2
            });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 加号图标
            Column.create();
            // 加号图标
            Column.width(DesignSystem.ICON_SIZE_XL);
            // 加号图标
            Column.height(DesignSystem.ICON_SIZE_XL);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(16);
            Row.height(2);
            Row.borderRadius(1);
            Row.backgroundColor(DesignSystem.BG_PRIMARY);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(2);
            Row.height(16);
            Row.borderRadius(1);
            Row.backgroundColor(DesignSystem.BG_PRIMARY);
            Row.position({ x: 19, y: 12 });
        }, Row);
        Row.pop();
        // 加号图标
        Column.pop();
        // 白色圆形加号图标（带动画）
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: DesignSystem.SPACING_MD });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('添加快捷功能');
            Text.fontSize(DesignSystem.FONT_SIZE_MD);
            Text.fontColor(DesignSystem.TEXT_SECONDARY);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('个性化您的首页');
            Text.fontSize(DesignSystem.FONT_SIZE_XS);
            Text.fontColor(DesignSystem.TEXT_TERTIARY);
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        // 左区域：添加快捷功能
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 右区域：开始跑步按钮
            Button.createWithChild();
            Context.animation({
                duration: DesignSystem.DURATION_FAST,
                curve: Curve.EaseOut
            });
            // 右区域：开始跑步按钮
            Button.linearGradient({
                angle: 135,
                colors: [[DesignSystem.COLOR_PRIMARY, 0], [DesignSystem.COLOR_PRIMARY_LIGHT, 1]]
            });
            // 右区域：开始跑步按钮
            Button.borderRadius(DesignSystem.RADIUS_XL);
            // 右区域：开始跑步按钮
            Button.height(DesignSystem.BTN_HEIGHT_MD);
            // 右区域：开始跑步按钮
            Button.padding({ left: DesignSystem.SPACING_2XL, right: DesignSystem.SPACING_2XL });
            // 右区域：开始跑步按钮
            Button.shadow({
                radius: this.isPressed ? 4 : 12,
                color: DesignSystem.withAlpha(DesignSystem.COLOR_PRIMARY, this.isPressed ? 0.3 : 0.5),
                offsetX: 0,
                offsetY: this.isPressed ? 2 : 4
            });
            // 右区域：开始跑步按钮
            Button.scale({ x: this.isPressed ? 0.95 : 1, y: this.isPressed ? 0.95 : 1 });
            Context.animation(null);
            // 右区域：开始跑步按钮
            Button.onClick(() => {
                this.isPressed = true;
                setTimeout(() => {
                    this.isPressed = false;
                    this.onStartRunning();
                }, 100);
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: DesignSystem.SPACING_SM });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 跑步图标
            Stack.create();
            // 跑步图标
            Stack.width(24);
            // 跑步图标
            Stack.height(24);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Path.create();
            Path.width(18);
            Path.height(18);
            Path.commands('M9 2C9 2 7 4 7 6C7 8 8 9 9 9C10 9 11 8 11 6C11 4 9 2 9 2Z M5 11L9 9L13 11M9 9L9 18M5 14L9 12L13 14');
            Path.stroke(DesignSystem.TEXT_PRIMARY);
            Path.strokeWidth(1.5);
            Path.fill('transparent');
        }, Path);
        // 跑步图标
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('开始跑步');
            Text.fontSize(DesignSystem.FONT_SIZE_MD);
            Text.fontColor(DesignSystem.TEXT_PRIMARY);
            Text.fontWeight(DesignSystem.FONT_WEIGHT_MEDIUM);
        }, Text);
        Text.pop();
        Row.pop();
        // 右区域：开始跑步按钮
        Button.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
