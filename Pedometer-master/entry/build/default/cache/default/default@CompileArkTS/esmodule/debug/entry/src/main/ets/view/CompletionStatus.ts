if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CompletionStatus_Params {
    progressValue?: number;
    stepGoal?: string;
    inputDialogController?: CustomDialogController;
}
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/constants/CommonConstants&";
import InputDialog from "@normalized:N&&&entry/src/main/ets/view/InputDialog&";
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
import StepsUtil from "@normalized:N&&&entry/src/main/ets/common/utils/StepsUtil&";
const TAG: string = 'CompletionStatus';
export class CompletionStatus extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__progressValue = new SynchedPropertySimpleTwoWayPU(params.progressValue, this, "progressValue");
        this.__stepGoal = this.initializeConsume("stepGoal", "stepGoal");
        this.inputDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new InputDialog(this, {
                    cancel: this.inputDialogCancel,
                    confirm: this.inputDialogConfirm
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/view/CompletionStatus.ets", line: 29, col: 14 });
                jsDialog.setController(this.inputDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        cancel: this.inputDialogCancel,
                        confirm: this.inputDialogConfirm
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: false,
            customStyle: true,
            alignment: DialogAlignment.Bottom,
            offset: { dx: CommonConstants.OFFSET_DX, dy: CommonConstants.OFFSET_DY }
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CompletionStatus_Params) {
        if (params.inputDialogController !== undefined) {
            this.inputDialogController = params.inputDialogController;
        }
    }
    updateStateVars(params: CompletionStatus_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__progressValue.purgeDependencyOnElmtId(rmElmtId);
        this.__stepGoal.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__progressValue.aboutToBeDeleted();
        this.__stepGoal.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __progressValue: SynchedPropertySimpleTwoWayPU<number>;
    get progressValue() {
        return this.__progressValue.get();
    }
    set progressValue(newValue: number) {
        this.__progressValue.set(newValue);
    }
    private __stepGoal: ObservedPropertyAbstractPU<string>;
    get stepGoal() {
        return this.__stepGoal.get();
    }
    set stepGoal(newValue: string) {
        this.__stepGoal.set(newValue);
    }
    private inputDialogController: CustomDialogController;
    inputDialogCancel() {
        Logger.info(TAG, 'Callback when the cancel button is clicked');
    }
    inputDialogConfirm() {
        if (StepsUtil.checkStrIsEmpty(this.stepGoal)) {
            return;
        }
        StepsUtil.putStorageValue(CommonConstants.STEP_GOAL, this.stepGoal);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_WIDTH);
            Column.backgroundColor('#000000');
            Column.shadow({
                radius: 30,
                color: '#33D3D3D3',
                offsetX: 0,
                offsetY: 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Progress.create({
                value: 0,
                total: CommonConstants.PROGRESS_TOTAL,
                type: ProgressType.Ring
            });
            Progress.color('#D3D3D3');
            Progress.value(this.progressValue);
            Progress.width({ "id": 16777397, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Progress.style({
                strokeWidth: CommonConstants.PROGRESS_STROKE_WIDTH,
                scaleCount: CommonConstants.PROGRESS_SCALE_COUNT,
                scaleWidth: CommonConstants.PROGRESS_SCALE_WIDTH
            });
            Progress.margin({ top: { "id": 16777394, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" } });
            Progress.borderRadius(CommonConstants.PROGRESS_BORDER_RADIUS);
        }, Progress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777255, "type": 10003, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Button.width({ "id": 16777413, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Button.height({ "id": 16777411, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777412, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Button.fontSize({ "id": 16777410, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Button.fontColor('#000000');
            Button.fontWeight(CommonConstants.SMALL_FONT_WEIGHT);
            Button.backgroundColor('#D3D3D3');
            Button.margin({
                top: { "id": 16777415, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                bottom: { "id": 16777414, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
            Button.onClick(() => {
                this.inputDialogController.open();
            });
        }, Button);
        Button.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.progressValue.toString());
            Text.borderRadius({ "id": 16777396, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777395, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.fontWeight(CommonConstants.BIG_FONT_WEIGHT);
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: { "id": 16777424, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(CommonConstants.PERCENT_SIGN);
            Text.borderRadius({ "id": 16777389, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777388, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.fontWeight(CommonConstants.SMALL_FONT_WEIGHT);
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: { "id": 16777387, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Row.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
