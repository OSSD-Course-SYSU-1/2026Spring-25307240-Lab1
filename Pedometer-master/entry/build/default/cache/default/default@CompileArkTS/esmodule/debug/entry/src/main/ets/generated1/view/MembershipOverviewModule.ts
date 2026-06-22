if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MembershipOverviewModule_Params {
    vipIcon?: Resource;
    vipLevel?: string;
    vipFunctionIcon1?: Resource;
    vipFunctionTitle1?: string;
    vipFunctionIcon2?: Resource;
    vipFunctionTitle2?: string;
    buttonText?: string;
    slogan?: string;
    expireText?: string;
    expireDate?: string;
    appPathStack?: NavPathStack;
}
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonConstants&";
export class MembershipOverviewModule extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__vipIcon = new ObservedPropertyObjectPU({ "id": 16777430, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, this, "vipIcon");
        this.__vipLevel = new ObservedPropertySimplePU("VIP 会员", this, "vipLevel");
        this.__vipFunctionIcon1 = new ObservedPropertyObjectPU({ "id": 16777477, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, this, "vipFunctionIcon1");
        this.__vipFunctionTitle1 = new ObservedPropertySimplePU("立即续费", this, "vipFunctionTitle1");
        this.__vipFunctionIcon2 = new ObservedPropertyObjectPU({ "id": 16777476, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, this, "vipFunctionIcon2");
        this.__vipFunctionTitle2 = new ObservedPropertySimplePU("消息通知", this, "vipFunctionTitle2");
        this.__buttonText = new ObservedPropertySimplePU("查看特权", this, "buttonText");
        this.__slogan = new ObservedPropertySimplePU("提高等级 享超多高价值权力", this, "slogan");
        this.__expireText = new ObservedPropertySimplePU("有效期至", this, "expireText");
        this.__expireDate = new ObservedPropertySimplePU("2019/07/01", this, "expireDate");
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MembershipOverviewModule_Params) {
        if (params.vipIcon !== undefined) {
            this.vipIcon = params.vipIcon;
        }
        if (params.vipLevel !== undefined) {
            this.vipLevel = params.vipLevel;
        }
        if (params.vipFunctionIcon1 !== undefined) {
            this.vipFunctionIcon1 = params.vipFunctionIcon1;
        }
        if (params.vipFunctionTitle1 !== undefined) {
            this.vipFunctionTitle1 = params.vipFunctionTitle1;
        }
        if (params.vipFunctionIcon2 !== undefined) {
            this.vipFunctionIcon2 = params.vipFunctionIcon2;
        }
        if (params.vipFunctionTitle2 !== undefined) {
            this.vipFunctionTitle2 = params.vipFunctionTitle2;
        }
        if (params.buttonText !== undefined) {
            this.buttonText = params.buttonText;
        }
        if (params.slogan !== undefined) {
            this.slogan = params.slogan;
        }
        if (params.expireText !== undefined) {
            this.expireText = params.expireText;
        }
        if (params.expireDate !== undefined) {
            this.expireDate = params.expireDate;
        }
    }
    updateStateVars(params: MembershipOverviewModule_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__vipIcon.purgeDependencyOnElmtId(rmElmtId);
        this.__vipLevel.purgeDependencyOnElmtId(rmElmtId);
        this.__vipFunctionIcon1.purgeDependencyOnElmtId(rmElmtId);
        this.__vipFunctionTitle1.purgeDependencyOnElmtId(rmElmtId);
        this.__vipFunctionIcon2.purgeDependencyOnElmtId(rmElmtId);
        this.__vipFunctionTitle2.purgeDependencyOnElmtId(rmElmtId);
        this.__buttonText.purgeDependencyOnElmtId(rmElmtId);
        this.__slogan.purgeDependencyOnElmtId(rmElmtId);
        this.__expireText.purgeDependencyOnElmtId(rmElmtId);
        this.__expireDate.purgeDependencyOnElmtId(rmElmtId);
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__vipIcon.aboutToBeDeleted();
        this.__vipLevel.aboutToBeDeleted();
        this.__vipFunctionIcon1.aboutToBeDeleted();
        this.__vipFunctionTitle1.aboutToBeDeleted();
        this.__vipFunctionIcon2.aboutToBeDeleted();
        this.__vipFunctionTitle2.aboutToBeDeleted();
        this.__buttonText.aboutToBeDeleted();
        this.__slogan.aboutToBeDeleted();
        this.__expireText.aboutToBeDeleted();
        this.__expireDate.aboutToBeDeleted();
        this.__appPathStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __vipIcon: ObservedPropertyObjectPU<Resource>;
    get vipIcon() {
        return this.__vipIcon.get();
    }
    set vipIcon(newValue: Resource) {
        this.__vipIcon.set(newValue);
    }
    private __vipLevel: ObservedPropertySimplePU<string>;
    get vipLevel() {
        return this.__vipLevel.get();
    }
    set vipLevel(newValue: string) {
        this.__vipLevel.set(newValue);
    }
    private __vipFunctionIcon1: ObservedPropertyObjectPU<Resource>;
    get vipFunctionIcon1() {
        return this.__vipFunctionIcon1.get();
    }
    set vipFunctionIcon1(newValue: Resource) {
        this.__vipFunctionIcon1.set(newValue);
    }
    private __vipFunctionTitle1: ObservedPropertySimplePU<string>;
    get vipFunctionTitle1() {
        return this.__vipFunctionTitle1.get();
    }
    set vipFunctionTitle1(newValue: string) {
        this.__vipFunctionTitle1.set(newValue);
    }
    private __vipFunctionIcon2: ObservedPropertyObjectPU<Resource>;
    get vipFunctionIcon2() {
        return this.__vipFunctionIcon2.get();
    }
    set vipFunctionIcon2(newValue: Resource) {
        this.__vipFunctionIcon2.set(newValue);
    }
    private __vipFunctionTitle2: ObservedPropertySimplePU<string>;
    get vipFunctionTitle2() {
        return this.__vipFunctionTitle2.get();
    }
    set vipFunctionTitle2(newValue: string) {
        this.__vipFunctionTitle2.set(newValue);
    }
    private __buttonText: ObservedPropertySimplePU<string>;
    get buttonText() {
        return this.__buttonText.get();
    }
    set buttonText(newValue: string) {
        this.__buttonText.set(newValue);
    }
    private __slogan: ObservedPropertySimplePU<string>;
    get slogan() {
        return this.__slogan.get();
    }
    set slogan(newValue: string) {
        this.__slogan.set(newValue);
    }
    private __expireText: ObservedPropertySimplePU<string>;
    get expireText() {
        return this.__expireText.get();
    }
    set expireText(newValue: string) {
        this.__expireText.set(newValue);
    }
    private __expireDate: ObservedPropertySimplePU<string>;
    get expireDate() {
        return this.__expireDate.get();
    }
    set expireDate(newValue: string) {
        this.__expireDate.set(newValue);
    }
    private __appPathStack: ObservedPropertyAbstractPU<NavPathStack>;
    get appPathStack() {
        return this.__appPathStack.get();
    }
    set appPathStack(newValue: NavPathStack) {
        this.__appPathStack.set(newValue);
    }
    jump(pageName: string = 'EmptyPagePathStack'): void {
        this.appPathStack.pushPathByName(pageName, null);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor({ "id": 16777292, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Column.height("120vp");
            Column.width('92%');
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.Start);
            Column.margin({ bottom: "10vp" });
            Column.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.SpaceBetween);
            Column.padding(12);
            Column.height(CommonConstants.FULL_PERCENT);
            Column.width(CommonConstants.FULL_PERCENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.alignItems(VerticalAlign.Center);
            Row.height("55%");
            Row.width(CommonConstants.FULL_PERCENT);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.width("55%");
            Column.height(CommonConstants.FULL_PERCENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ bottom: "4vp" });
            Row.width(CommonConstants.FULL_PERCENT);
            Row.onClick(() => this.jump());
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipIcon}
             */
            Image.create(this.vipIcon);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipIcon}
             */
            Image.height("28vp");
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipIcon}
             */
            Image.width("28vp");
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipIcon}
             */
            Image.margin({ right: "8vp" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipIcon}
             */
            Image.fillColor({ "id": 16777331, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipIcon}
             */
            Image.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipLevel}
             */
            Text.create(this.vipLevel);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipLevel}
             */
            Text.font({ size: { "id": 16777232, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, weight: FontWeight.Bold });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipLevel}
             */
            Text.fontColor({ "id": 16777319, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipLevel}
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipLevel}
             */
            Text.maxLines(1);
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * modify {@link MemberInformationModule#vipLevel}
         */
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.FULL_PERCENT);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireText}
             */
            Text.create(this.expireText);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireText}
             */
            Text.font({ size: { "id": 16777220, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, weight: FontWeight.Regular });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireText}
             */
            Text.fontColor({ "id": 16777323, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireText}
             */
            Text.margin({ bottom: "4vp" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireText}
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireText}
             */
            Text.maxLines(1);
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * modify {@link MemberInformationModule#expireText}
         */
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireDate}
             */
            Text.create(this.expireDate);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireDate}
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireDate}
             */
            Text.maxLines(1);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireDate}
             */
            Text.font({ size: { "id": 16777220, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, weight: FontWeight.Regular });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireDate}
             */
            Text.fontColor({ "id": 16777323, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireDate}
             */
            Text.padding({ left: 4 });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#expireDate}
             */
            Text.margin({ bottom: "4vp" });
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * modify {@link MemberInformationModule#expireDate}
         */
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.End);
            Row.width("45%");
            Row.height(CommonConstants.FULL_PERCENT);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ right: "8vp" });
            Column.height(CommonConstants.FULL_PERCENT);
            Column.width("45%");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon1}
             */
            Image.create(this.vipFunctionIcon1);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon1}
             */
            Image.height("28vp");
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon1}
             */
            Image.width("28vp");
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon1}
             */
            Image.fillColor({ "id": 16777331, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon1}
             */
            Image.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon1}
             */
            Image.margin({ bottom: "4vp" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon1}
             */
            Image.onClick(() => {
                this.jump();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionTitle1}
             */
            Text.create(this.vipFunctionTitle1);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionTitle1}
             */
            Text.font({ size: { "id": 16777220, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, weight: FontWeight.Regular });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionTitle1}
             */
            Text.fontColor({ "id": 16777321, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionTitle1}
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionTitle1}
             */
            Text.maxLines(1);
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * modify {@link MemberInformationModule#vipFunctionTitle1}
         */
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ right: "8vp" });
            Column.height(CommonConstants.FULL_PERCENT);
            Column.width("45%");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon2}
             */
            Image.create(this.vipFunctionIcon2);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon2}
             */
            Image.height("28vp");
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon2}
             */
            Image.width("28vp");
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon2}
             */
            Image.fillColor({ "id": 16777331, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon2}
             */
            Image.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon2}
             */
            Image.margin({ bottom: "4vp" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionIcon2}
             */
            Image.onClick(() => {
                this.jump();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionTitle2}
             */
            Text.create(this.vipFunctionTitle2);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionTitle2}
             */
            Text.font({ size: { "id": 16777220, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, weight: FontWeight.Regular });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionTitle2}
             */
            Text.fontColor({ "id": 16777321, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionTitle2}
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#vipFunctionTitle2}
             */
            Text.maxLines(1);
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * modify {@link MemberInformationModule#vipFunctionTitle2}
         */
        Text.pop();
        Column.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height("45%");
            Row.width(CommonConstants.FULL_PERCENT);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#slogan}
             */
            Text.create(this.slogan);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#slogan}
             */
            Text.fontColor({ "id": 16777321, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#slogan}
             */
            Text.font({ size: { "id": 16777229, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, weight: FontWeight.Medium });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#slogan}
             */
            Text.width("70%");
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#slogan}
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#slogan}
             */
            Text.maxLines(1);
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * modify {@link MemberInformationModule#slogan}
         */
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#buttonText}
             */
            Button.createWithLabel(this.buttonText, { controlSize: ControlSize.SMALL });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#buttonText}
             */
            Button.type(ButtonType.Capsule);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#buttonText}
             */
            Button.fontColor({ "id": 16777316, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#buttonText}
             */
            Button.backgroundColor({ "id": 16777285, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link MemberInformationModule#buttonText}
             */
            Button.onClick(() => {
                this.jump();
            });
        }, Button);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * modify {@link MemberInformationModule#buttonText}
         */
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
