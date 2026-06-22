if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MemberPage_Params {
    scroller?: Scroller;
}
import { MembershipOverviewModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/MembershipOverviewModule&";
import { MemberPrivilegeIconModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/MemberPrivilegeIconModule&";
import { PremiumContentRecommendationModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/PremiumContentRecommendationModule&";
import { MemberServiceModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/MemberServiceModule&";
export class MemberPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MemberPage_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: MemberPage_Params) {
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
                    let componentCall = new MembershipOverviewModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/MemberPage.ets", line: 13, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MembershipOverviewModule" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MemberPrivilegeIconModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/MemberPage.ets", line: 14, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MemberPrivilegeIconModule" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PremiumContentRecommendationModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/MemberPage.ets", line: 15, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PremiumContentRecommendationModule" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MemberServiceModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/MemberPage.ets", line: 16, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MemberServiceModule" });
        }
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
