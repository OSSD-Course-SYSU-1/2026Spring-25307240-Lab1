if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CurrentSituation_Params {
    currentSteps?: string;
    startPosition?: string;
    currentLocation?: string;
    sedentaryMinutes?: number;
}
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/constants/CommonConstants&";
export class CurrentSituation extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentSteps = new SynchedPropertySimpleOneWayPU(params.currentSteps, this, "currentSteps");
        this.__startPosition = new SynchedPropertySimpleOneWayPU(params.startPosition, this, "startPosition");
        this.__currentLocation = new SynchedPropertySimpleOneWayPU(params.currentLocation, this, "currentLocation");
        this.__sedentaryMinutes = new SynchedPropertySimpleOneWayPU(params.sedentaryMinutes, this, "sedentaryMinutes");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CurrentSituation_Params) {
        if (params.currentSteps === undefined) {
            this.__currentSteps.set('');
        }
        if (params.startPosition === undefined) {
            this.__startPosition.set('');
        }
        if (params.currentLocation === undefined) {
            this.__currentLocation.set('');
        }
        if (params.sedentaryMinutes === undefined) {
            this.__sedentaryMinutes.set(0);
        }
    }
    updateStateVars(params: CurrentSituation_Params) {
        this.__currentSteps.reset(params.currentSteps);
        this.__startPosition.reset(params.startPosition);
        this.__currentLocation.reset(params.currentLocation);
        this.__sedentaryMinutes.reset(params.sedentaryMinutes);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentSteps.purgeDependencyOnElmtId(rmElmtId);
        this.__startPosition.purgeDependencyOnElmtId(rmElmtId);
        this.__currentLocation.purgeDependencyOnElmtId(rmElmtId);
        this.__sedentaryMinutes.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentSteps.aboutToBeDeleted();
        this.__startPosition.aboutToBeDeleted();
        this.__currentLocation.aboutToBeDeleted();
        this.__sedentaryMinutes.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentSteps: SynchedPropertySimpleOneWayPU<string>;
    get currentSteps() {
        return this.__currentSteps.get();
    }
    set currentSteps(newValue: string) {
        this.__currentSteps.set(newValue);
    }
    private __startPosition: SynchedPropertySimpleOneWayPU<string>;
    get startPosition() {
        return this.__startPosition.get();
    }
    set startPosition(newValue: string) {
        this.__startPosition.set(newValue);
    }
    private __currentLocation: SynchedPropertySimpleOneWayPU<string>;
    get currentLocation() {
        return this.__currentLocation.get();
    }
    set currentLocation(newValue: string) {
        this.__currentLocation.set(newValue);
    }
    private __sedentaryMinutes: SynchedPropertySimpleOneWayPU<number>; // 久坐时间（分钟）
    get sedentaryMinutes() {
        return this.__sedentaryMinutes.get();
    }
    set sedentaryMinutes(newValue: number) {
        this.__sedentaryMinutes.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.height({ "id": 16777365, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Row.margin({ top: { "id": 16777403, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" } });
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.SITUATION_WIDTH);
            Column.borderRadius({ "id": 16777402, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Column.backgroundColor('#1A1A1A');
            Column.shadow({
                radius: 20,
                color: '#33D3D3D3',
                offsetX: 0,
                offsetY: 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777261, "type": 10003, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.width(CommonConstants.FULL_WIDTH);
            Text.height({ "id": 16777425, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777429, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777354, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.SMALL_FONT_WEIGHT);
            Text.textAlign(TextAlign.Start);
            Text.margin({
                top: { "id": 16777428, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                bottom: { "id": 16777426, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                left: { "id": 16777427, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.height({ "id": 16777364, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Row.margin({
                top: { "id": 16777363, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                bottom: { "id": 16777361, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                left: { "id": 16777362, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.width({ "id": 16777368, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.height({ "id": 16777367, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777366, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777355, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.BIG_FONT_WEIGHT);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777258, "type": 10003, params: [this.currentSteps], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.width({ "id": 16777371, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.height({ "id": 16777370, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777398, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777354, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.BIG_FONT_WEIGHT);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(false);
            Divider.color({ "id": 16777310, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Divider.strokeWidth(CommonConstants.DIVIDER_STROKE_WIDTH);
            Divider.margin({
                left: { "id": 16777373, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                right: { "id": 16777374, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.height({ "id": 16777409, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Row.margin({
                top: { "id": 16777393, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                bottom: { "id": 16777391, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                left: { "id": 16777392, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777257, "type": 10003, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.width({ "id": 16777368, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.height({ "id": 16777367, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777408, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777355, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.BIG_FONT_WEIGHT);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.startPosition);
            Text.width({ "id": 16777371, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.height({ "id": 16777370, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777390, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777354, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.BIG_FONT_WEIGHT);
            Text.textAlign(TextAlign.Start);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(CommonConstants.MAX_LINE);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(false);
            Divider.color({ "id": 16777310, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Divider.strokeWidth(CommonConstants.DIVIDER_STROKE_WIDTH);
            Divider.margin({
                left: { "id": 16777373, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                right: { "id": 16777374, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.height({ "id": 16777360, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Row.margin({
                top: { "id": 16777385, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                bottom: { "id": 16777383, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                left: { "id": 16777384, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.width({ "id": 16777368, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.height({ "id": 16777367, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777382, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777355, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.BIG_FONT_WEIGHT);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentLocation);
            Text.width({ "id": 16777371, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.height({ "id": 16777370, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777359, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777354, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.BIG_FONT_WEIGHT);
            Text.textAlign(TextAlign.Start);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(CommonConstants.MAX_LINE);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(false);
            Divider.color({ "id": 16777310, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Divider.strokeWidth(CommonConstants.DIVIDER_STROKE_WIDTH);
            Divider.margin({
                left: { "id": 16777373, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                right: { "id": 16777374, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.height({ "id": 16777360, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Row.margin({
                top: { "id": 16777385, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                bottom: { "id": 16777383, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                left: { "id": 16777384, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777254, "type": 10003, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.width({ "id": 16777368, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.height({ "id": 16777367, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777382, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777355, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.BIG_FONT_WEIGHT);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777253, "type": 10003, params: [this.sedentaryMinutes.toString()], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.width({ "id": 16777371, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.height({ "id": 16777370, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777359, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor(this.sedentaryMinutes >= 60 ? { "id": 16777279, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" } : { "id": 16777354, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.BIG_FONT_WEIGHT);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
