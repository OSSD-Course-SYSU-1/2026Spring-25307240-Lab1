if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SettingsPage_Params {
    stepGoal?: string;
    userProfile?: UserProfile;
    cacheSize?: string;
    isLoggedIn?: boolean;
    userName?: string;
    context?: common.UIAbilityContext;
    profileManager?;
    cacheManager?;
}
import type common from "@ohos:app.ability.common";
import router from "@ohos:router";
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/constants/CommonConstants&";
import StepsUtil from "@normalized:N&&&entry/src/main/ets/common/utils/StepsUtil&";
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
import { getUserProfileManager } from "@normalized:N&&&entry/src/main/ets/common/utils/UserProfileManager&";
import type { UserProfile } from "@normalized:N&&&entry/src/main/ets/common/utils/UserProfileManager&";
import { getCacheManager } from "@normalized:N&&&entry/src/main/ets/common/utils/CacheManager&";
const TAG: string = 'SettingsPage';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
class SettingsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__stepGoal = new ObservedPropertySimplePU('', this, "stepGoal");
        this.__userProfile = new ObservedPropertyObjectPU({
            weight: 70,
            height: 170,
            age: 25,
            gender: 'male',
            strideLength: 0.7
        }, this, "userProfile");
        this.__cacheSize = new ObservedPropertySimplePU('0 KB', this, "cacheSize");
        this.__isLoggedIn = new ObservedPropertySimplePU(false, this, "isLoggedIn");
        this.__userName = new ObservedPropertySimplePU('未登录', this, "userName");
        this.context = uiContext?.getHostContext() as common.UIAbilityContext;
        this.profileManager = getUserProfileManager(this.context);
        this.cacheManager = getCacheManager();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SettingsPage_Params) {
        if (params.stepGoal !== undefined) {
            this.stepGoal = params.stepGoal;
        }
        if (params.userProfile !== undefined) {
            this.userProfile = params.userProfile;
        }
        if (params.cacheSize !== undefined) {
            this.cacheSize = params.cacheSize;
        }
        if (params.isLoggedIn !== undefined) {
            this.isLoggedIn = params.isLoggedIn;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.profileManager !== undefined) {
            this.profileManager = params.profileManager;
        }
        if (params.cacheManager !== undefined) {
            this.cacheManager = params.cacheManager;
        }
    }
    updateStateVars(params: SettingsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__stepGoal.purgeDependencyOnElmtId(rmElmtId);
        this.__userProfile.purgeDependencyOnElmtId(rmElmtId);
        this.__cacheSize.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoggedIn.purgeDependencyOnElmtId(rmElmtId);
        this.__userName.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__stepGoal.aboutToBeDeleted();
        this.__userProfile.aboutToBeDeleted();
        this.__cacheSize.aboutToBeDeleted();
        this.__isLoggedIn.aboutToBeDeleted();
        this.__userName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __stepGoal: ObservedPropertySimplePU<string>;
    get stepGoal() {
        return this.__stepGoal.get();
    }
    set stepGoal(newValue: string) {
        this.__stepGoal.set(newValue);
    }
    private __userProfile: ObservedPropertyObjectPU<UserProfile>;
    get userProfile() {
        return this.__userProfile.get();
    }
    set userProfile(newValue: UserProfile) {
        this.__userProfile.set(newValue);
    }
    private __cacheSize: ObservedPropertySimplePU<string>;
    get cacheSize() {
        return this.__cacheSize.get();
    }
    set cacheSize(newValue: string) {
        this.__cacheSize.set(newValue);
    }
    private __isLoggedIn: ObservedPropertySimplePU<boolean>;
    get isLoggedIn() {
        return this.__isLoggedIn.get();
    }
    set isLoggedIn(newValue: boolean) {
        this.__isLoggedIn.set(newValue);
    }
    private __userName: ObservedPropertySimplePU<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    private context: common.UIAbilityContext;
    private profileManager;
    private cacheManager;
    async aboutToAppear() {
        await this.loadSettings();
        this.calculateCacheSize();
    }
    private async loadSettings(): Promise<void> {
        try {
            const goalStr = await StepsUtil.getStorageValue(CommonConstants.STEP_GOAL);
            if (goalStr && !StepsUtil.checkStrIsEmpty(goalStr)) {
                this.stepGoal = goalStr;
            }
            const profile = await this.profileManager.getUserProfile();
            if (profile) {
                this.userProfile = profile;
            }
            Logger.info(TAG, 'Settings loaded');
        }
        catch (err) {
            Logger.error(TAG, `Load settings failed: ${JSON.stringify(err)}`);
        }
    }
    /**
     * 计算缓存大小
     */
    private calculateCacheSize(): void {
        const stats = this.cacheManager.getStatistics();
        const sizeInKB = stats.totalSize / 1024;
        if (sizeInKB < 1024) {
            this.cacheSize = `${sizeInKB.toFixed(2)} KB`;
        }
        else {
            const sizeInMB = sizeInKB / 1024;
            this.cacheSize = `${sizeInMB.toFixed(2)} MB`;
        }
    }
    /**
     * 清除缓存
     */
    private clearCache(): void {
        try {
            this.cacheManager.clear();
            this.calculateCacheSize();
            this.getUIContext().getPromptAction().showToast({
                message: '缓存已清除',
                duration: 2000
            });
            Logger.info(TAG, 'Cache cleared');
        }
        catch (err) {
            Logger.error(TAG, `Clear cache failed: ${JSON.stringify(err)}`);
            this.getUIContext().getPromptAction().showToast({
                message: '清除缓存失败',
                duration: 2000
            });
        }
    }
    /**
     * 退出登录
     */
    private logout(): void {
        this.isLoggedIn = false;
        this.userName = '未登录';
        this.getUIContext().getPromptAction().showToast({
            message: '已退出登录',
            duration: 2000
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#000000');
        }, Column);
        // 标题栏
        this.HeaderBar.bind(this)();
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
        // 账号管理
        this.AccountSection.bind(this)();
        // 基础通用设置
        this.BasicSettingsSection.bind(this)();
        // 关于我们
        this.AboutSection.bind(this)();
        // 反馈与帮助
        this.FeedbackSection.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    /**
     * 标题栏
     */
    HeaderBar(parent = null) {
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
            Text.create('设置');
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
        Row.pop();
    }
    /**
     * 账号管理
     */
    AccountSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('#1A1A1A');
            Column.borderRadius(12);
            Column.margin({ top: 10 });
            Column.shadow({
                radius: 20,
                color: '#33D3D3D3',
                offsetX: 0,
                offsetY: 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('账号管理');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录/用户信息
            Row.create();
            // 登录/用户信息
            Row.width('100%');
            // 登录/用户信息
            Row.height(60);
            // 登录/用户信息
            Row.onClick(() => {
                if (this.isLoggedIn) {
                    // 显示账号管理选项
                    this.showAccountOptions();
                }
                else {
                    // 模拟登录
                    this.isLoggedIn = true;
                    this.userName = '用户123456';
                    this.getUIContext().getPromptAction().showToast({
                        message: '登录成功',
                        duration: 2000
                    });
                }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('👤');
            Text.fontSize(24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isLoggedIn ? this.userName : '点击登录');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoggedIn) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('已登录');
                        Text.fontSize(12);
                        Text.fontColor('#4ECDC4');
                        Text.margin({ top: 4 });
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
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('>');
            Text.fontSize(16);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 登录/用户信息
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#33FFFFFF');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 退出登录
            if (this.isLoggedIn) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.height(50);
                        Row.onClick(() => {
                            this.logout();
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('退出登录');
                        Text.fontSize(14);
                        Text.fontColor('#FF6B6B');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('>');
                        Text.fontSize(16);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    Row.pop();
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
     * 基础通用设置
     */
    BasicSettingsSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('#1A1A1A');
            Column.borderRadius(12);
            Column.margin({ top: 10 });
            Column.shadow({
                radius: 20,
                color: '#33D3D3D3',
                offsetX: 0,
                offsetY: 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基础通用设置');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 步数目标
            Row.create();
            // 步数目标
            Row.width('100%');
            // 步数目标
            Row.height(50);
            // 步数目标
            Row.onClick(() => {
                // TODO: 打开步数目标设置页面
                this.getUIContext().getPromptAction().showToast({
                    message: '步数目标设置',
                    duration: 2000
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('每日步数目标');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.stepGoal || '20000'} 步`);
            Text.fontSize(14);
            Text.fontColor('#AAAAAA');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('>');
            Text.fontSize(16);
            Text.fontColor('#666666');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 步数目标
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#33FFFFFF');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户档案
            Row.create();
            // 用户档案
            Row.width('100%');
            // 用户档案
            Row.height(50);
            // 用户档案
            Row.onClick(() => {
                // TODO: 打开用户档案设置页面
                this.getUIContext().getPromptAction().showToast({
                    message: '用户档案设置',
                    duration: 2000
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('用户档案');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.userProfile.height}cm / ${this.userProfile.weight}kg`);
            Text.fontSize(14);
            Text.fontColor('#AAAAAA');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('>');
            Text.fontSize(16);
            Text.fontColor('#666666');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 用户档案
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#33FFFFFF');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 清除缓存
            Row.create();
            // 清除缓存
            Row.width('100%');
            // 清除缓存
            Row.height(50);
            // 清除缓存
            Row.onClick(() => {
                this.clearCache();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('清除缓存');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cacheSize);
            Text.fontSize(14);
            Text.fontColor('#AAAAAA');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('>');
            Text.fontSize(16);
            Text.fontColor('#666666');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 清除缓存
        Row.pop();
        Column.pop();
    }
    /**
     * 关于我们
     */
    AboutSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('#1A1A1A');
            Column.borderRadius(12);
            Column.margin({ top: 10 });
            Column.shadow({
                radius: 20,
                color: '#33D3D3D3',
                offsetX: 0,
                offsetY: 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('关于我们');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 版本号
            Row.create();
            // 版本号
            Row.width('100%');
            // 版本号
            Row.height(50);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('版本号');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1.0.0');
            Text.fontSize(14);
            Text.fontColor('#AAAAAA');
        }, Text);
        Text.pop();
        // 版本号
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#33FFFFFF');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户协议
            Row.create();
            // 用户协议
            Row.width('100%');
            // 用户协议
            Row.height(50);
            // 用户协议
            Row.onClick(() => {
                router.pushUrl({
                    url: 'pages/UserAgreementPage'
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('用户协议');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('>');
            Text.fontSize(16);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 用户协议
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#33FFFFFF');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 隐私政策
            Row.create();
            // 隐私政策
            Row.width('100%');
            // 隐私政策
            Row.height(50);
            // 隐私政策
            Row.onClick(() => {
                router.pushUrl({
                    url: 'pages/PrivacyPolicyPage'
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('隐私政策');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('>');
            Text.fontSize(16);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 隐私政策
        Row.pop();
        Column.pop();
    }
    /**
     * 反馈与帮助
     */
    FeedbackSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('#1A1A1A');
            Column.borderRadius(12);
            Column.margin({ top: 10 });
            Column.shadow({
                radius: 20,
                color: '#33D3D3D3',
                offsetX: 0,
                offsetY: 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('反馈与帮助');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 意见反馈
            Row.create();
            // 意见反馈
            Row.width('100%');
            // 意见反馈
            Row.height(50);
            // 意见反馈
            Row.onClick(() => {
                router.pushUrl({
                    url: 'pages/FeedbackPage'
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('意见反馈');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('>');
            Text.fontSize(16);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 意见反馈
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#33FFFFFF');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 常见问题
            Row.create();
            // 常见问题
            Row.width('100%');
            // 常见问题
            Row.height(50);
            // 常见问题
            Row.onClick(() => {
                router.pushUrl({
                    url: 'pages/FAQPage'
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('常见问题 FAQ');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('>');
            Text.fontSize(16);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 常见问题
        Row.pop();
        Column.pop();
    }
    /**
     * 显示账号管理选项
     */
    private showAccountOptions(): void {
        // 这里可以显示一个对话框让用户选择切换账号或退出登录
        this.getUIContext().getPromptAction().showDialog({
            title: '账号管理',
            message: `当前账号: ${this.userName}`,
            buttons: [
                { text: '切换账号', color: '#4ECDC4' },
                { text: '退出登录', color: '#FF6B6B' },
                { text: '取消', color: '#666666' }
            ]
        }).then((result) => {
            if (result.index === 0) {
                // 切换账号
                this.getUIContext().getPromptAction().showToast({
                    message: '切换账号功能',
                    duration: 2000
                });
            }
            else if (result.index === 1) {
                // 退出登录
                this.logout();
            }
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SettingsPage";
    }
}
registerNamedRoute(() => new SettingsPage(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "pages/SettingsPage", pageFullPath: "entry/src/main/ets/pages/SettingsPage", integratedHsp: "false", moduleType: "followWithHap" });
