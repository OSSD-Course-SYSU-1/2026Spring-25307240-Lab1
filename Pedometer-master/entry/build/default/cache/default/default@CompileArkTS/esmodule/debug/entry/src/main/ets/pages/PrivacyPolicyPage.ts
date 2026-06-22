if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PrivacyPolicyPage_Params {
}
import router from "@ohos:router";
class PrivacyPolicyPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PrivacyPolicyPage_Params) {
    }
    updateStateVars(params: PrivacyPolicyPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
            Text.create('隐私政策');
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
            Scroll.scrollBar(BarState.Auto);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('隐私保护政策');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.PolicyContent.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    PolicyContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('更新日期：2024年1月1日');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.width('100%');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('生效日期：2024年1月1日');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.width('100%');
            Text.margin({ bottom: 30 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('引言');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('步数计应用（以下简称"我们"）非常重视用户的隐私保护。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('一、我们收集的信息');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1.1 基本信息：当您注册账号时，我们会收集您的手机号码、昵称等基本信息。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1.2 运动数据：我们会收集您的步数、运动距离、卡路里消耗等运动相关数据。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1.3 设备信息：我们会收集您的设备型号、操作系统版本等信息以优化服务。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1.4 位置信息：在获得您授权后，我们会收集您的位置信息用于记录运动轨迹。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('二、我们如何使用信息');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2.1 提供、维护和改进我们的服务。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2.2 向您发送服务通知和更新信息。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2.3 进行数据分析以改善用户体验。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2.4 保障服务安全，防止欺诈行为。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('三、信息存储与保护');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('3.1 我们采用行业标准的安全技术和管理措施保护您的个人信息。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('3.2 我们会对您的个人信息进行加密存储，防止未经授权的访问。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('3.3 我们会定期审查和更新安全措施，以应对新的安全威胁。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('四、信息共享');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('4.1 我们不会向第三方出售您的个人信息。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('4.2 我们仅在以下情况下共享您的信息：');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('   • 获得您的明确同意');
            Text.fontSize(14);
            Text.fontColor('#AAAAAA');
            Text.width('100%');
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('   • 法律法规要求');
            Text.fontSize(14);
            Text.fontColor('#AAAAAA');
            Text.width('100%');
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('   • 与授权合作伙伴共享（如数据分析服务商）');
            Text.fontSize(14);
            Text.fontColor('#AAAAAA');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('五、您的权利');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('5.1 您有权访问、更正和删除您的个人信息。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('5.2 您有权撤回对信息收集的授权同意。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('5.3 您有权注销账号，注销后我们将删除您的个人信息。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('六、未成年人保护');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('6.1 我们非常重视未成年人的隐私保护。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('6.2 如果您是未成年人，请在监护人陪同下阅读本政策，并在取得监护人同意后使用我们的服务。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('七、政策更新');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('7.1 我们可能会不时更新本隐私政策，更新后的政策将在应用内公布。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('7.2 如果您继续使用我们的服务，即表示您同意接受更新后的隐私政策。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('八、联系我们');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('邮箱：privacy@pedometer.example.com');
            Text.fontSize(14);
            Text.fontColor('#4ECDC4');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('客服电话：400-123-4567');
            Text.fontSize(14);
            Text.fontColor('#4ECDC4');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    Section(title: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#4ECDC4');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PrivacyPolicyPage";
    }
}
registerNamedRoute(() => new PrivacyPolicyPage(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "pages/PrivacyPolicyPage", pageFullPath: "entry/src/main/ets/pages/PrivacyPolicyPage", integratedHsp: "false", moduleType: "followWithHap" });
