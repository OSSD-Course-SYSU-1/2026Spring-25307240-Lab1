if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchInput_Params {
    searchValue?: string;
}
interface SearchBar_Params {
    appPathStack?: NavPathStack;
    searchValue?: string;
    onBack?: () => void;
}
interface SecondPageSearch_Params {
    appPathStack?: NavPathStack;
    searchValue?: string;
}
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonConstants&";
export class SecondPageSearch extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.__searchValue = new ObservedPropertySimplePU('', this, "searchValue");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SecondPageSearch_Params) {
        if (params.searchValue !== undefined) {
            this.searchValue = params.searchValue;
        }
    }
    updateStateVars(params: SecondPageSearch_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__searchValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__appPathStack.aboutToBeDeleted();
        this.__searchValue.aboutToBeDeleted();
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
    private __searchValue: ObservedPropertySimplePU<string>;
    get searchValue() {
        return this.__searchValue.get();
    }
    set searchValue(newValue: string) {
        this.__searchValue.set(newValue);
    }
    jump(): void {
        this.appPathStack.pushPathByName('EmptyPagePathStack', null);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.backgroundColor({ "id": 125829132, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                    Column.height(CommonConstants.FULL_PERCENT);
                    Column.width(CommonConstants.FULL_PERCENT);
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SearchBar(this, {
                                searchValue: this.__searchValue,
                                onBack: () => {
                                    this.appPathStack.clear();
                                    return false;
                                }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/detail/SecondPageSearch.ets", line: 29, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    searchValue: this.searchValue,
                                    onBack: () => {
                                        this.appPathStack.clear();
                                        return false;
                                    }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "SearchBar" });
                }
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/generated1/detail/SecondPageSearch" });
            NavDestination.hideTitleBar(true);
            NavDestination.onBackPressed(() => {
                this.appPathStack.clear();
                return true;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export function SearchPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new SecondPageSearch(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/detail/SecondPageSearch.ets", line: 51, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "SecondPageSearch" });
    }
}
class SearchBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.__searchValue = new SynchedPropertySimpleTwoWayPU(params.searchValue, this, "searchValue");
        this.onBack = () => {
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchBar_Params) {
        if (params.onBack !== undefined) {
            this.onBack = params.onBack;
        }
    }
    updateStateVars(params: SearchBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__searchValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__appPathStack.aboutToBeDeleted();
        this.__searchValue.aboutToBeDeleted();
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
    private __searchValue: SynchedPropertySimpleTwoWayPU<string>;
    get searchValue() {
        return this.__searchValue.get();
    }
    set searchValue(newValue: string) {
        this.__searchValue.set(newValue);
    }
    private onBack: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.FULL_PERCENT);
            Row.padding({
                top: "8vp",
                bottom: "8vp",
                left: "24vp",
                right: "24vp"
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("<");
            Text.fontSize("22fp");
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ right: "8vp" });
            Text.onClick(() => this.onBack());
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SearchInput(this, {
                        searchValue: this.__searchValue
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/detail/SecondPageSearch.ets", line: 68, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            searchValue: this.searchValue
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SearchInput" });
        }
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class SearchInput extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__searchValue = new SynchedPropertySimpleTwoWayPU(params.searchValue, this, "searchValue");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchInput_Params) {
    }
    updateStateVars(params: SearchInput_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __searchValue: SynchedPropertySimpleTwoWayPU<string>;
    get searchValue() {
        return this.__searchValue.get();
    }
    set searchValue(newValue: string) {
        this.__searchValue.set(newValue);
    }
    aboutToAppear(): void {
    }
    aboutToDisappear(): void {
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Search.create({
                placeholder: "Search",
                value: this.searchValue
            });
            Search.enableKeyboardOnFocus(true);
            Search.textFont({ size: { "id": 125830970, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" } });
            Search.placeholderFont({ size: { "id": 125830970, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" } });
            Search.layoutWeight(1);
        }, Search);
        Search.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
