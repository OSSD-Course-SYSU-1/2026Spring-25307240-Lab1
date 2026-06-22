if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    currentIndex?: number;
    tabsController?: TabsController;
    appPathStack?: NavPathStack;
    currentWidthBreakpoint?: string;
}
import { PageMap } from "@normalized:N&&&entry/src/main/ets/generated1/detail/SecondPageBuilder&";
import { BreakpointConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/BreakpointConstants&";
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonConstants&";
import { TodayPage } from "@normalized:N&&&entry/src/main/ets/generated1/pages/TodayPage&";
import { ExercisePage } from "@normalized:N&&&entry/src/main/ets/generated1/pages/ExercisePage&";
import { MemberPage } from "@normalized:N&&&entry/src/main/ets/generated1/pages/MemberPage&";
import { DevicePage } from "@normalized:N&&&entry/src/main/ets/generated1/pages/DevicePage&";
import { MyPage } from "@normalized:N&&&entry/src/main/ets/generated1/pages/MyPage&";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.tabsController = new TabsController();
        this.__appPathStack = new ObservedPropertyObjectPU(new NavPathStack(), this, "appPathStack");
        this.addProvidedVar("appPathStack", this.__appPathStack, false);
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentWidthBreakpoint");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
        if (params.appPathStack !== undefined) {
            this.appPathStack = params.appPathStack;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__currentWidthBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__appPathStack.aboutToBeDeleted();
        this.__currentWidthBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private tabsController: TabsController;
    private __appPathStack: ObservedPropertyObjectPU<NavPathStack>;
    get appPathStack() {
        return this.__appPathStack.get();
    }
    set appPathStack(newValue: NavPathStack) {
        this.__appPathStack.set(newValue);
    }
    private __currentWidthBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentWidthBreakpoint() {
        return this.__currentWidthBreakpoint.get();
    }
    set currentWidthBreakpoint(newValue: string) {
        this.__currentWidthBreakpoint.set(newValue);
    }
    tabBuilder(title: string, targetIndex: number, icon: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG ? "100vp" : CommonConstants.FULL_PERCENT);
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                this.currentIndex = targetIndex;
                this.tabsController.changeIndex(targetIndex);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.width("24vp");
            Image.height("24vp");
            Image.objectFit(ImageFit.Contain);
            Image.fillColor(this.currentIndex === targetIndex ? ({ "id": 16777271, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }) :
                ({ "id": 16777270, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }));
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize("10vp");
            Text.fontColor(this.currentIndex === targetIndex ? ({ "id": 16777271, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }) :
                ({ "id": 16777270, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }));
            Text.textAlign(TextAlign.Center);
            Text.lineHeight("14vp");
            Text.fontWeight(500);
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.appPathStack, { moduleName: "entry", pagePath: "entry/src/main/ets/generated1/Index", isUserCreateStack: true });
            Navigation.backgroundColor({ "id": 16777348, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Navigation.navDestination({ builder: PageMap.bind(this) });
            Navigation.hideTitleBar(true);
            Navigation.mode(NavigationMode.Stack);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({
                barPosition: this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG ? BarPosition.Start :
                    BarPosition.End,
                controller: this.tabsController
            });
            Tabs.barWidth(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG ? "96vp" :
                CommonConstants.FULL_PERCENT);
            Tabs.barHeight(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG ? CommonConstants.FULL_PERCENT :
                "76vp");
            Tabs.barMode(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG ? BarMode.Scrollable : BarMode.Fixed, { nonScrollableLayoutStyle: LayoutStyle.ALWAYS_CENTER });
            Tabs.vertical(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG);
            Tabs.scrollable(false);
            Tabs.width('100%');
            Tabs.height('100%');
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TodayPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/Index.ets", line: 53, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "TodayPage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBuilder.call(this, '今日', 0, { "id": 16777439, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ExercisePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/Index.ets", line: 57, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "ExercisePage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBuilder.call(this, '锻炼', 1, { "id": 16777459, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new MemberPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/Index.ets", line: 61, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "MemberPage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBuilder.call(this, '会员', 2, { "id": 16777436, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new DevicePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/Index.ets", line: 65, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "DevicePage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBuilder.call(this, '设备', 3, { "id": 16777449, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new MyPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/Index.ets", line: 69, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "MyPage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBuilder.call(this, '我的', 4, { "id": 16777463, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "generated1/Index", pageFullPath: "entry/src/main/ets/generated1/Index", integratedHsp: "false", moduleType: "followWithHap" });
