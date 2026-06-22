if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FitnessDataDisplayModule_Params {
    appPathStack?: NavPathStack;
    currentWidthBreakpoint?: string;
    functionModel?: DataSource;
    items?: Array<DataSourceStyleAStyleA>;
    loadingStatus?: LoadingStatus;
    rowHeight?: number;
    rowGap?: number;
    columnGapArray?: number[];
    columnNumberArray?: number[];
    rowNumberArray?: number[];
}
interface IconTextItem_Params {
    appPathStack?: NavPathStack;
    currentWidthBreakpoint?: string;
    icon?: Resource;
    title?: string;
    iconColor?: string;
    iconSize?: number;
}
import { DataSource } from "@normalized:N&&&entry/src/main/ets/generated/viewmodel/FitnessDataDisplayModuleData&";
import type { DataSourceStyleAStyleA } from "@normalized:N&&&entry/src/main/ets/generated/viewmodel/FitnessDataDisplayModuleData&";
import { LoadingStatus } from "@normalized:N&&&entry/src/main/ets/generated/common/CommonEnums&";
import { BreakpointConstants } from "@normalized:N&&&entry/src/main/ets/generated/common/BreakpointConstants&";
import { BreakpointType } from "@normalized:N&&&entry/src/main/ets/generated/util/BreakpointType&";
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated/common/CommonConstants&";
class IconTextItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentWidthBreakpoint");
        this.icon = { "id": 16777464, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" };
        this.title = "计步器";
        this.iconColor = '#2D70F1';
        this.iconSize = 32;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IconTextItem_Params) {
        if (params.icon !== undefined) {
            this.icon = params.icon;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.iconColor !== undefined) {
            this.iconColor = params.iconColor;
        }
        if (params.iconSize !== undefined) {
            this.iconSize = params.iconSize;
        }
    }
    updateStateVars(params: IconTextItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__currentWidthBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__appPathStack.aboutToBeDeleted();
        this.__currentWidthBreakpoint.aboutToBeDeleted();
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
    private __currentWidthBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentWidthBreakpoint() {
        return this.__currentWidthBreakpoint.get();
    }
    set currentWidthBreakpoint(newValue: string) {
        this.__currentWidthBreakpoint.set(newValue);
    }
    jump(pageName: string = 'EmptyPagePathStack'): void {
        this.appPathStack.pushPathByName(pageName, null);
    }
    private icon: Resource;
    private title: string;
    private iconColor?: string;
    private iconSize: number;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.icon);
            Image.width(this.iconSize);
            Image.height(this.iconSize);
            Image.fillColor(this.iconColor);
            Image.onClick(() => {
                this.jump();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontColor({ "id": 16777320, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontSize({ "id": 16777220, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(1);
            Text.margin({ top: '5px' });
            Text.onClick(() => {
                this.jump();
            });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class FitnessDataDisplayModule extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentWidthBreakpoint");
        this.__functionModel = new ObservedPropertyObjectPU(DataSource.getInstance(), this, "functionModel");
        this.__items = new ObservedPropertyObjectPU([], this, "items");
        this.__loadingStatus = new ObservedPropertySimplePU(LoadingStatus.LOADING, this, "loadingStatus");
        this.__rowHeight = new ObservedPropertySimplePU(80, this, "rowHeight");
        this.__rowGap = new ObservedPropertySimplePU(6, this, "rowGap");
        this.columnGapArray = [6, 10, 12];
        this.columnNumberArray = [3, 8, 8];
        this.rowNumberArray = [1, 1, 1];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FitnessDataDisplayModule_Params) {
        if (params.functionModel !== undefined) {
            this.functionModel = params.functionModel;
        }
        if (params.items !== undefined) {
            this.items = params.items;
        }
        if (params.loadingStatus !== undefined) {
            this.loadingStatus = params.loadingStatus;
        }
        if (params.rowHeight !== undefined) {
            this.rowHeight = params.rowHeight;
        }
        if (params.rowGap !== undefined) {
            this.rowGap = params.rowGap;
        }
        if (params.columnGapArray !== undefined) {
            this.columnGapArray = params.columnGapArray;
        }
        if (params.columnNumberArray !== undefined) {
            this.columnNumberArray = params.columnNumberArray;
        }
        if (params.rowNumberArray !== undefined) {
            this.rowNumberArray = params.rowNumberArray;
        }
    }
    updateStateVars(params: FitnessDataDisplayModule_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__currentWidthBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__functionModel.purgeDependencyOnElmtId(rmElmtId);
        this.__items.purgeDependencyOnElmtId(rmElmtId);
        this.__loadingStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__rowHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__rowGap.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__appPathStack.aboutToBeDeleted();
        this.__currentWidthBreakpoint.aboutToBeDeleted();
        this.__functionModel.aboutToBeDeleted();
        this.__items.aboutToBeDeleted();
        this.__loadingStatus.aboutToBeDeleted();
        this.__rowHeight.aboutToBeDeleted();
        this.__rowGap.aboutToBeDeleted();
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
    private __currentWidthBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentWidthBreakpoint() {
        return this.__currentWidthBreakpoint.get();
    }
    set currentWidthBreakpoint(newValue: string) {
        this.__currentWidthBreakpoint.set(newValue);
    }
    private __functionModel: ObservedPropertyObjectPU<DataSource>;
    get functionModel() {
        return this.__functionModel.get();
    }
    set functionModel(newValue: DataSource) {
        this.__functionModel.set(newValue);
    }
    private __items: ObservedPropertyObjectPU<Array<DataSourceStyleAStyleA>>;
    get items() {
        return this.__items.get();
    }
    set items(newValue: Array<DataSourceStyleAStyleA>) {
        this.__items.set(newValue);
    }
    private __loadingStatus: ObservedPropertySimplePU<LoadingStatus>;
    get loadingStatus() {
        return this.__loadingStatus.get();
    }
    set loadingStatus(newValue: LoadingStatus) {
        this.__loadingStatus.set(newValue);
    }
    private __rowHeight: ObservedPropertySimplePU<number>;
    get rowHeight() {
        return this.__rowHeight.get();
    }
    set rowHeight(newValue: number) {
        this.__rowHeight.set(newValue);
    }
    private __rowGap: ObservedPropertySimplePU<number>;
    get rowGap() {
        return this.__rowGap.get();
    }
    set rowGap(newValue: number) {
        this.__rowGap.set(newValue);
    }
    private columnGapArray: number[];
    private columnNumberArray: number[];
    private rowNumberArray: number[];
    aboutToAppear() {
        this.loadData();
    }
    async loadData() {
        try {
            this.loadingStatus = LoadingStatus.LOADING;
            await this.functionModel.getResources();
            this.loadingStatus = LoadingStatus.SUCCESS;
            this.items = this.functionModel.getAllItems();
        }
        catch (error) {
            this.loadingStatus = LoadingStatus.FAILED;
            console.error('Failed to load data:', error);
        }
    }
    jump(pageName: string = 'EmptyPagePathStack'): void {
        this.appPathStack.pushPathByName(pageName, null);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height(180);
            Column.backgroundColor({ "id": 16777292, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(100);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.functionModel.getBannerImage());
            Image.objectFit(ImageFit.Fill);
        }, Image);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.loadingStatus === LoadingStatus.SUCCESS) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Grid.create();
                        Grid.columnsTemplate(("1fr ").repeat(new BreakpointType(this.columnNumberArray[0], this.columnNumberArray[1], this.columnNumberArray[2]).getValue(this.currentWidthBreakpoint)).trim());
                        Grid.rowsTemplate(("1fr ").repeat(new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1], this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint)).trim());
                        Grid.height(this.currentWidthBreakpoint !== BreakpointConstants.BREAKPOINT_LG ?
                            (this.rowGap + this.rowHeight) * new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1], this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint) :
                            (this.rowGap + this.rowHeight + 30) * new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1], this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint));
                        Grid.columnsGap(new BreakpointType(this.columnGapArray[0], this.columnGapArray[1], this.columnGapArray[2]).getValue(this.currentWidthBreakpoint));
                        Grid.rowsGap(this.rowGap);
                    }, Grid);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    GridItem.create(() => { }, false);
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, GridItem);
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new IconTextItem(this, {
                                                    icon: item.getIcon(),
                                                    title: item.getTitle(),
                                                    iconColor: '#2196F3'
                                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated/view/FitnessDataDisplayModule.ets", line: 92, col: 15 });
                                                ViewPU.create(componentCall);
                                                let paramsLambda = () => {
                                                    return {
                                                        icon: item.getIcon(),
                                                        title: item.getTitle(),
                                                        iconColor: '#2196F3'
                                                    };
                                                };
                                                componentCall.paramsGenerator_ = paramsLambda;
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                                            }
                                        }, { name: "IconTextItem" });
                                    }
                                    GridItem.pop();
                                };
                                observedDeepRender();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.items, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Grid.pop();
                });
            }
            else if (this.loadingStatus === LoadingStatus.FAILED) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('加载中...');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777322, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                        Text.margin(16);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('加载失败，点击重试');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777322, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                        Text.margin(16);
                        Text.onClick(() => {
                            this.loadData();
                        });
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
