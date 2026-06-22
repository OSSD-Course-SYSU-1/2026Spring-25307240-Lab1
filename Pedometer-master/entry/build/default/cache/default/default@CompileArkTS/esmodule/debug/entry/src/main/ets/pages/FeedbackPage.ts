if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FeedbackPage_Params {
    feedbackType?: number;
    feedbackContent?: string;
    contactInfo?: string;
}
import router from "@ohos:router";
class FeedbackPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__feedbackType = new ObservedPropertySimplePU(0, this, "feedbackType");
        this.__feedbackContent = new ObservedPropertySimplePU('', this, "feedbackContent");
        this.__contactInfo = new ObservedPropertySimplePU('', this, "contactInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FeedbackPage_Params) {
        if (params.feedbackType !== undefined) {
            this.feedbackType = params.feedbackType;
        }
        if (params.feedbackContent !== undefined) {
            this.feedbackContent = params.feedbackContent;
        }
        if (params.contactInfo !== undefined) {
            this.contactInfo = params.contactInfo;
        }
    }
    updateStateVars(params: FeedbackPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__feedbackType.purgeDependencyOnElmtId(rmElmtId);
        this.__feedbackContent.purgeDependencyOnElmtId(rmElmtId);
        this.__contactInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__feedbackType.aboutToBeDeleted();
        this.__feedbackContent.aboutToBeDeleted();
        this.__contactInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __feedbackType: ObservedPropertySimplePU<number>; // 0: 功能建议, 1: 问题反馈, 2: 其他
    get feedbackType() {
        return this.__feedbackType.get();
    }
    set feedbackType(newValue: number) {
        this.__feedbackType.set(newValue);
    }
    private __feedbackContent: ObservedPropertySimplePU<string>;
    get feedbackContent() {
        return this.__feedbackContent.get();
    }
    set feedbackContent(newValue: string) {
        this.__feedbackContent.set(newValue);
    }
    private __contactInfo: ObservedPropertySimplePU<string>;
    get contactInfo() {
        return this.__contactInfo.get();
    }
    set contactInfo(newValue: string) {
        this.__contactInfo.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#000000');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.height(56);
            // 标题栏
            Row.padding({ left: 10, right: 10 });
            // 标题栏
            Row.linearGradient({
                angle: 135,
                colors: [['#4ECDC4', 0], ['#45B7AA', 1]]
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.width(40);
            Button.height(40);
            Button.backgroundColor(Color.Transparent);
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize(20);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('意见反馈');
            Text.fontSize(18);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Medium);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.width(40);
        }, Blank);
        Blank.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 反馈类型选择
            Column.create();
            // 反馈类型选择
            Column.width('100%');
            // 反馈类型选择
            Column.padding(15);
            // 反馈类型选择
            Column.backgroundColor('#1A1A1A');
            // 反馈类型选择
            Column.borderRadius(12);
            // 反馈类型选择
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('反馈类型');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.TypeButton.bind(this)('功能建议', 0);
        this.TypeButton.bind(this)('问题反馈', 1);
        this.TypeButton.bind(this)('其他', 2);
        Row.pop();
        // 反馈类型选择
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 反馈内容
            Column.create();
            // 反馈内容
            Column.width('100%');
            // 反馈内容
            Column.padding(15);
            // 反馈内容
            Column.backgroundColor('#1A1A1A');
            // 反馈内容
            Column.borderRadius(12);
            // 反馈内容
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('反馈内容');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '请详细描述您的建议或遇到的问题...' });
            TextArea.width('100%');
            TextArea.height(150);
            TextArea.backgroundColor('#2A2A2A');
            TextArea.borderRadius(8);
            TextArea.fontColor('#FFFFFF');
            TextArea.placeholderColor('#666666');
            TextArea.onChange((value: string) => {
                this.feedbackContent = value;
            });
        }, TextArea);
        // 反馈内容
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 联系方式
            Column.create();
            // 联系方式
            Column.width('100%');
            // 联系方式
            Column.padding(15);
            // 联系方式
            Column.backgroundColor('#1A1A1A');
            // 联系方式
            Column.borderRadius(12);
            // 联系方式
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('联系方式（选填）');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入您的邮箱或手机号' });
            TextInput.width('100%');
            TextInput.height(45);
            TextInput.backgroundColor('#2A2A2A');
            TextInput.borderRadius(8);
            TextInput.fontColor('#FFFFFF');
            TextInput.placeholderColor('#666666');
            TextInput.onChange((value: string) => {
                this.contactInfo = value;
            });
        }, TextInput);
        // 联系方式
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 提交按钮
            Button.createWithLabel('提交反馈');
            // 提交按钮
            Button.width('100%');
            // 提交按钮
            Button.height(50);
            // 提交按钮
            Button.backgroundColor('#4ECDC4');
            // 提交按钮
            Button.borderRadius(25);
            // 提交按钮
            Button.fontColor('#FFFFFF');
            // 提交按钮
            Button.fontSize(16);
            // 提交按钮
            Button.fontWeight(FontWeight.Medium);
            // 提交按钮
            Button.margin({ top: 20 });
            // 提交按钮
            Button.onClick(() => {
                this.submitFeedback();
            });
        }, Button);
        // 提交按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 提示信息
            Text.create('感谢您的反馈！我们会认真处理您的意见和建议。');
            // 提示信息
            Text.fontSize(12);
            // 提示信息
            Text.fontColor('#999999');
            // 提示信息
            Text.width('100%');
            // 提示信息
            Text.textAlign(TextAlign.Center);
            // 提示信息
            Text.margin({ top: 15 });
        }, Text);
        // 提示信息
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    TypeButton(text: string, type: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(text);
            Button.width('30%');
            Button.height(40);
            Button.backgroundColor(this.feedbackType === type ? '#4ECDC4' : '#2A2A2A');
            Button.borderRadius(20);
            Button.fontColor(this.feedbackType === type ? '#FFFFFF' : '#CCCCCC');
            Button.fontSize(14);
            Button.onClick(() => {
                this.feedbackType = type;
            });
        }, Button);
        Button.pop();
    }
    private submitFeedback(): void {
        if (this.feedbackContent.trim() === '') {
            this.getUIContext().getPromptAction().showToast({
                message: '请输入反馈内容',
                duration: 2000
            });
            return;
        }
        // 模拟提交反馈
        this.getUIContext().getPromptAction().showToast({
            message: '感谢您的反馈！',
            duration: 2000
        });
        // 清空输入
        this.feedbackContent = '';
        this.contactInfo = '';
        // 延迟返回上一页
        setTimeout(() => {
            router.back();
        }, 1500);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FeedbackPage";
    }
}
registerNamedRoute(() => new FeedbackPage(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "pages/FeedbackPage", pageFullPath: "entry/src/main/ets/pages/FeedbackPage", integratedHsp: "false", moduleType: "followWithHap" });
