if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ExerciseHeaderModule_Params {
    search_placeholder?: string;
    appPathStack?: NavPathStack;
}
export class ExerciseHeaderModule extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__search_placeholder = new ObservedPropertySimplePU("搜索锻炼项目", this, "search_placeholder");
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ExerciseHeaderModule_Params) {
        if (params.search_placeholder !== undefined) {
            this.search_placeholder = params.search_placeholder;
        }
    }
    updateStateVars(params: ExerciseHeaderModule_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__search_placeholder.purgeDependencyOnElmtId(rmElmtId);
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__search_placeholder.aboutToBeDeleted();
        this.__appPathStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __search_placeholder: ObservedPropertySimplePU<string>;
    get search_placeholder() {
        return this.__search_placeholder.get();
    }
    set search_placeholder(newValue: string) {
        this.__search_placeholder.set(newValue);
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
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link SearchModule#search_placeholder}
             */
            Column.create();
            /**
             * TODO:
             * please modify it according to the actual situation.
             * modify {@link SearchModule#search_placeholder}
             */
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Search.create({ placeholder: this.search_placeholder });
            Search.width("92%");
            Search.enableKeyboardOnFocus(false);
            Search.backgroundColor({ "id": 16777272, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Search.placeholderColor({ "id": 125830983, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Search.placeholderFont({
                family: "HarmonyHeiTi",
                size: { "id": 125830970, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                weight: 100
            });
            Search.searchIcon({ src: { "id": 125831262, "type": 40000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" } });
            Search.fontColor({ "id": 125830982, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Search.margin({ bottom: '10vp' });
            Search.onClick(() => {
                this.jump();
            });
        }, Search);
        Search.pop();
        /**
         * TODO:
         * please modify it according to the actual situation.
         * modify {@link SearchModule#search_placeholder}
         */
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
