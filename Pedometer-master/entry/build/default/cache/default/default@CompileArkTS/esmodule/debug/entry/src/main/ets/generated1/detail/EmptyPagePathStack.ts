if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TopNavigationView_Params {
    title?: ResourceStr;
    onBackClick?: Function;
}
interface EmptyPagePathStack_Params {
    appPathStack?: NavPathStack;
}
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonConstants&";
export class EmptyPagePathStack extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EmptyPagePathStack_Params) {
    }
    updateStateVars(params: EmptyPagePathStack_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__appPathStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __appPathStack: ObservedPropertyAbstractPU<NavPathStack>;
    get appPathStack() {
        return this.__appPathStack.get();
    }
    set appPathStack(newValue: NavPathStack) {
        this.__appPathStack.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.justifyContent(FlexAlign.SpaceBetween);
                    Column.alignItems(HorizontalAlign.Center);
                    Column.width(CommonConstants.FULL_PERCENT);
                    Column.height(CommonConstants.FULL_PERCENT);
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TopNavigationView(this, {
                                title: "详情页",
                                onBackClick: () => {
                                    this.appPathStack.pop();
                                }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/detail/EmptyPagePathStack.ets", line: 24, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: "详情页",
                                    onBackClick: () => {
                                        this.appPathStack.pop();
                                    }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "TopNavigationView" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777475, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                }, Image);
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/generated1/detail/EmptyPagePathStack" });
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export function EmptyPagePathStackBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new EmptyPagePathStack(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/detail/EmptyPagePathStack.ets", line: 43, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "EmptyPagePathStack" });
    }
}
class TopNavigationView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.title = undefined;
        this.onBackClick = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TopNavigationView_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.onBackClick !== undefined) {
            this.onBackClick = params.onBackClick;
        }
    }
    updateStateVars(params: TopNavigationView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private title?: ResourceStr;
    private onBackClick?: Function;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(CommonConstants.FULL_PERCENT);
            Row.height("54vp");
            Row.padding({
                left: "14vp",
                right: "14vp"
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.onBackClick) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("<");
                        Text.fontSize("22fp");
                        Text.fontWeight(FontWeight.Medium);
                        Text.margin({ right: "8vp" });
                        Text.onClick(() => this.onBackClick?.());
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize("18fp");
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Start);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
