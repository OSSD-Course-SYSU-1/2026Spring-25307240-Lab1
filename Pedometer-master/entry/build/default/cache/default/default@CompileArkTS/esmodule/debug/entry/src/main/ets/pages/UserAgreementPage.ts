if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UserAgreementPage_Params {
}
import router from "@ohos:router";
class UserAgreementPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UserAgreementPage_Params) {
    }
    updateStateVars(params: UserAgreementPage_Params) {
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
            Text.create('用户协议');
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
            Text.create('用户服务协议');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.AgreementContent.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    AgreementContent(parent = null) {
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
        this.Section.bind(this)('一、服务条款的确认和接纳');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1.1 本协议是您与步数计应用（以下简称"本应用"）之间关于使用本应用服务所订立的协议。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1.2 请您仔细阅读本协议的全部内容，如果您不同意本协议的任何内容，请立即停止使用本应用提供的服务。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1.3 您一旦使用本应用的服务，即视为您已了解并完全同意本协议各项内容。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('二、服务内容');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2.1 本应用为您提供步数统计、运动数据记录、健康指标计算等服务。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2.2 本应用有权在必要时修改服务条款，修改后的条款将在应用内公布。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2.3 本应用保留随时中断或终止服务的权利，无需对用户或第三方承担责任。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('三、用户注册与账号管理');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('3.1 用户应按照注册页面提示完成注册流程，确保提供的信息真实、准确、完整。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('3.2 用户应妥善保管账号和密码，因用户保管不当造成的损失由用户自行承担。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('3.3 用户发现账号被盗用或存在安全漏洞时，应立即通知本应用。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('四、用户行为规范');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('4.1 用户不得利用本应用从事违法违规活动。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('4.2 用户不得干扰或破坏本应用的正常运营。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('4.3 用户不得以任何方式侵犯他人的合法权益。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('五、知识产权');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('5.1 本应用的所有内容，包括但不限于文字、图片、音频、视频、软件等，其知识产权归本应用所有。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('5.2 未经本应用书面许可，用户不得复制、转载、引用本应用的任何内容。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('六、免责声明');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('6.1 本应用不对因网络状况、通讯线路等任何原因造成的服务中断或不能满足用户要求的情况承担责任。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('6.2 本应用不对第三方的侵权行为承担责任。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('6.3 用户使用本应用服务所存在的风险由用户自行承担。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('七、协议修改');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('7.1 本应用有权随时修改本协议，修改后的协议将在应用内公布。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('7.2 用户继续使用本应用服务，即表示用户接受修改后的协议。');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 25 });
        }, Text);
        Text.pop();
        this.Section.bind(this)('八、联系我们');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('如果您对本协议有任何疑问，请通过以下方式联系我们：');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('邮箱：support@pedometer.example.com');
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
        return "UserAgreementPage";
    }
}
registerNamedRoute(() => new UserAgreementPage(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "pages/UserAgreementPage", pageFullPath: "entry/src/main/ets/pages/UserAgreementPage", integratedHsp: "false", moduleType: "followWithHap" });
