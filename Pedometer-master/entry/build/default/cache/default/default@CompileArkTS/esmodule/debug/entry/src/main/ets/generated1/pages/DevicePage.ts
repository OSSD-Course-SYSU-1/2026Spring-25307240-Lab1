if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DevicePage_Params {
    scroller?: Scroller;
}
import { DeviceTitleModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/DeviceTitleModule&";
import { DeviceConnectionStatusModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/DeviceConnectionStatusModule&";
import { DeviceQuickAccessModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/DeviceQuickAccessModule&";
import { DeviceRecommendationModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/DeviceRecommendationModule&";
export class DevicePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DevicePage_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: DevicePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private scroller: Scroller;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.scrollBar(BarState.Off);
            Scroll.height("100%");
            Scroll.width('100%');
            Scroll.align(Alignment.Top);
            Scroll.backgroundColor({ "id": 16777348, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DeviceTitleModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/DevicePage.ets", line: 13, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "DeviceTitleModule" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DeviceConnectionStatusModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/DevicePage.ets", line: 14, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "DeviceConnectionStatusModule" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DeviceQuickAccessModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/DevicePage.ets", line: 15, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "DeviceQuickAccessModule" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DeviceRecommendationModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/DevicePage.ets", line: 16, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "DeviceRecommendationModule" });
        }
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
