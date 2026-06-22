if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ExercisePage_Params {
    scroller?: Scroller;
}
import { ExerciseHeaderModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/ExerciseHeaderModule&";
import { SportModeSelectionModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/SportModeSelectionModule&";
import { TrainingPlanCardModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/TrainingPlanCardModule&";
import { WorkoutStatsRingModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/WorkoutStatsRingModule&";
import { RecentWorkoutsModule } from "@normalized:N&&&entry/src/main/ets/generated1/view/RecentWorkoutsModule&";
export class ExercisePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ExercisePage_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: ExercisePage_Params) {
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
                    let componentCall = new ExerciseHeaderModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/ExercisePage.ets", line: 14, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ExerciseHeaderModule" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SportModeSelectionModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/ExercisePage.ets", line: 15, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SportModeSelectionModule" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TrainingPlanCardModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/ExercisePage.ets", line: 16, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "TrainingPlanCardModule" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new WorkoutStatsRingModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/ExercisePage.ets", line: 17, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "WorkoutStatsRingModule" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new RecentWorkoutsModule(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/pages/ExercisePage.ets", line: 18, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "RecentWorkoutsModule" });
        }
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
