if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    scroller?: Scroller;
    appPathStack?: NavPathStack;
    title?: string;
}
import { PageMap } from "@normalized:N&&&entry/src/main/ets/generated/detail/SecondPageBuilder&";
import { StepCounter } from "@normalized:N&&&entry/src/main/ets/generated/pages/StepCounter&";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.scroller = new Scroller();
        this.__appPathStack = new ObservedPropertyObjectPU(new NavPathStack(), this, "appPathStack");
        this.addProvidedVar("appPathStack", this.__appPathStack, false);
        this.__title = new ObservedPropertySimplePU('page_title', this, "title");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.appPathStack !== undefined) {
            this.appPathStack = params.appPathStack;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__appPathStack.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private scroller: Scroller;
    private __appPathStack: ObservedPropertyObjectPU<NavPathStack>;
    get appPathStack() {
        return this.__appPathStack.get();
    }
    set appPathStack(newValue: NavPathStack) {
        this.__appPathStack.set(newValue);
    }
    private __title: ObservedPropertySimplePU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.appPathStack, { moduleName: "entry", pagePath: "entry/src/main/ets/generated/Index", isUserCreateStack: true });
            Navigation.navDestination({ builder: PageMap.bind(this) });
            Navigation.hideTitleBar(true);
            Navigation.mode(NavigationMode.Stack);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor('#F1F3F5');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.scrollBar(BarState.Off);
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StepCounter(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated/Index.ets", line: 16, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "StepCounter" });
        }
        Column.pop();
        Scroll.pop();
        Column.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "generated/Index", pageFullPath: "entry/src/main/ets/generated/Index", integratedHsp: "false", moduleType: "followWithHap" });
