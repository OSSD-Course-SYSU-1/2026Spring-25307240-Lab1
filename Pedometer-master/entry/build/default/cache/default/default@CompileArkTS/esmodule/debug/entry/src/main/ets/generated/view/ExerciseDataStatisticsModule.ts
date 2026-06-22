if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ExerciseDataStatisticsModuleTitleInfo_Params {
    currentWidthBreakpoint?: string;
    title?: string;
    moduleRedirectContent?: string;
    appPathStack?: NavPathStack;
    onJump?: () => void;
}
interface HorizontalGraphicTextDisplayItem1_Params {
    image?: Resource;
    mainText?: string;
    subText?: string;
    descriptionText?: string;
    currentWidthBreakpoint?: string;
}
interface ExerciseDataStatisticsModule_Params {
    itemModel?: Data;
    listDirection?: Axis;
    moduleTitle?: string;
    moduleRedirectContent?: string;
    loadingStatus?: LoadingStatus;
    lazyDataSource?: LazyDataSource<DataSource>;
    spaceArray?: string[];
    lanesArray?: number[];
    appPathStack?: NavPathStack;
    currentWidthBreakpoint?: string;
}
import { Data } from "@normalized:N&&&entry/src/main/ets/generated/viewmodel/ExerciseDataStatisticsModuleData&";
import type { DataSource } from "@normalized:N&&&entry/src/main/ets/generated/viewmodel/ExerciseDataStatisticsModuleData&";
import { LoadingStatus } from "@normalized:N&&&entry/src/main/ets/generated/common/CommonEnums&";
import { LoadingFailedView } from "@normalized:N&&&entry/src/main/ets/generated/view/LoadingFailedView&";
import { BreakpointConstants } from "@normalized:N&&&entry/src/main/ets/generated/common/BreakpointConstants&";
import { BreakpointType } from "@normalized:N&&&entry/src/main/ets/generated/util/BreakpointType&";
import type LazyDataSource from '../util/LazyDataSource';
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated/common/CommonConstants&";
export class ExerciseDataStatisticsModule extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__itemModel = new ObservedPropertyObjectPU(Data.getInstance(), this, "itemModel");
        this.__listDirection = new SynchedPropertySimpleOneWayPU(params.listDirection, this, "listDirection");
        this.__moduleTitle = new ObservedPropertySimplePU("运动数据统计", this, "moduleTitle");
        this.__moduleRedirectContent = new ObservedPropertySimplePU("查看更多", this, "moduleRedirectContent");
        this.__loadingStatus = new ObservedPropertySimplePU(LoadingStatus.OFF, this, "loadingStatus");
        this.__lazyDataSource = new ObservedPropertyObjectPU(this.itemModel.lazyDataSource, this, "lazyDataSource");
        this.spaceArray = ['8vp', '6vp', '10vp'];
        this.lanesArray = [1, 2, 3];
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentWidthBreakpoint");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ExerciseDataStatisticsModule_Params) {
        if (params.itemModel !== undefined) {
            this.itemModel = params.itemModel;
        }
        if (params.listDirection === undefined) {
            this.__listDirection.set(Axis.Vertical);
        }
        if (params.moduleTitle !== undefined) {
            this.moduleTitle = params.moduleTitle;
        }
        if (params.moduleRedirectContent !== undefined) {
            this.moduleRedirectContent = params.moduleRedirectContent;
        }
        if (params.loadingStatus !== undefined) {
            this.loadingStatus = params.loadingStatus;
        }
        if (params.lazyDataSource !== undefined) {
            this.lazyDataSource = params.lazyDataSource;
        }
        if (params.spaceArray !== undefined) {
            this.spaceArray = params.spaceArray;
        }
        if (params.lanesArray !== undefined) {
            this.lanesArray = params.lanesArray;
        }
    }
    updateStateVars(params: ExerciseDataStatisticsModule_Params) {
        this.__listDirection.reset(params.listDirection);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__itemModel.purgeDependencyOnElmtId(rmElmtId);
        this.__listDirection.purgeDependencyOnElmtId(rmElmtId);
        this.__moduleTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__moduleRedirectContent.purgeDependencyOnElmtId(rmElmtId);
        this.__loadingStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__lazyDataSource.purgeDependencyOnElmtId(rmElmtId);
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__currentWidthBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__itemModel.aboutToBeDeleted();
        this.__listDirection.aboutToBeDeleted();
        this.__moduleTitle.aboutToBeDeleted();
        this.__moduleRedirectContent.aboutToBeDeleted();
        this.__loadingStatus.aboutToBeDeleted();
        this.__lazyDataSource.aboutToBeDeleted();
        this.__appPathStack.aboutToBeDeleted();
        this.__currentWidthBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __itemModel: ObservedPropertyObjectPU<Data>;
    get itemModel() {
        return this.__itemModel.get();
    }
    set itemModel(newValue: Data) {
        this.__itemModel.set(newValue);
    }
    private __listDirection: SynchedPropertySimpleOneWayPU<Axis>;
    get listDirection() {
        return this.__listDirection.get();
    }
    set listDirection(newValue: Axis) {
        this.__listDirection.set(newValue);
    }
    private __moduleTitle: ObservedPropertySimplePU<string>;
    get moduleTitle() {
        return this.__moduleTitle.get();
    }
    set moduleTitle(newValue: string) {
        this.__moduleTitle.set(newValue);
    }
    private __moduleRedirectContent: ObservedPropertySimplePU<string>;
    get moduleRedirectContent() {
        return this.__moduleRedirectContent.get();
    }
    set moduleRedirectContent(newValue: string) {
        this.__moduleRedirectContent.set(newValue);
    }
    private __loadingStatus: ObservedPropertySimplePU<LoadingStatus>;
    get loadingStatus() {
        return this.__loadingStatus.get();
    }
    set loadingStatus(newValue: LoadingStatus) {
        this.__loadingStatus.set(newValue);
    }
    private __lazyDataSource: ObservedPropertyObjectPU<LazyDataSource<DataSource>>;
    get lazyDataSource() {
        return this.__lazyDataSource.get();
    }
    set lazyDataSource(newValue: LazyDataSource<DataSource>) {
        this.__lazyDataSource.set(newValue);
    }
    private spaceArray: string[];
    private lanesArray: number[];
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
    aboutToAppear() {
        this.loadResources();
    }
    jump(pageName: string = 'EmptyPagePathStack'): void {
        this.appPathStack.pushPathByName(pageName, null);
    }
    loadResources(): void {
        this.loadingStatus = LoadingStatus.LOADING;
        this.itemModel.getResources().then(() => {
            this.loadingStatus = LoadingStatus.SUCCESS;
        }).catch(() => {
            this.loadingStatus = LoadingStatus.FAILED;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('92%');
            Column.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Column.margin({ bottom: "10vp" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ExerciseDataStatisticsModuleTitleInfo(this, {
                        title: this.moduleTitle,
                        moduleRedirectContent: this.moduleRedirectContent,
                        onJump: () => {
                            this.jump();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated/view/ExerciseDataStatisticsModule.ets", line: 60, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: this.moduleTitle,
                            moduleRedirectContent: this.moduleRedirectContent,
                            onJump: () => {
                                this.jump();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ExerciseDataStatisticsModuleTitleInfo" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.loadingStatus === LoadingStatus.FAILED) {
                this.ifElseBranchUpdateFunction(0, () => {
                    LoadingFailedView.bind(this)(() => this.loadResources());
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.loadingStatus === LoadingStatus.SUCCESS) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({
                            space: new BreakpointType(this.spaceArray[0], this.spaceArray[1], this.spaceArray[2]).getValue(this.currentWidthBreakpoint)
                        });
                        List.width('auto');
                        List.height('auto');
                        List.edgeEffect(EdgeEffect.Spring, { alwaysEnabled: true });
                        List.listDirection(this.listDirection);
                        List.lanes(new BreakpointType(this.lanesArray[0], this.lanesArray[1], this.lanesArray[2]).getValue(this.currentWidthBreakpoint), "12vp");
                    }, List);
                    {
                        const __lazyForEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(() => { }, false);
                                    ListItem.height("150vp");
                                    ListItem.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                                    ListItem.backgroundColor({ "id": 16777290, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                                    ListItem.onClick(() => {
                                        this.jump("ExerciseDataStatisticsModuleDetail" + index.toString());
                                    });
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, ListItem);
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new HorizontalGraphicTextDisplayItem1(this, {
                                                    image: item.getImage(),
                                                    mainText: item.getMainText(),
                                                    subText: item.getSubText(),
                                                    descriptionText: item.getDescriptionText()
                                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated/view/ExerciseDataStatisticsModule.ets", line: 77, col: 17 });
                                                ViewPU.create(componentCall);
                                                let paramsLambda = () => {
                                                    return {
                                                        image: item.getImage(),
                                                        mainText: item.getMainText(),
                                                        subText: item.getSubText(),
                                                        descriptionText: item.getDescriptionText()
                                                    };
                                                };
                                                componentCall.paramsGenerator_ = paramsLambda;
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                                            }
                                        }, { name: "HorizontalGraphicTextDisplayItem1" });
                                    }
                                    ListItem.pop();
                                };
                                observedDeepRender();
                            }
                        };
                        const __lazyForEachItemIdFunc = (item: DataSource, index: number) => index + JSON.stringify(item);
                        LazyForEach.create("1", this, this.lazyDataSource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
                        LazyForEach.pop();
                    }
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class HorizontalGraphicTextDisplayItem1 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__image = new ObservedPropertyObjectPU({ "id": 16777464, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, this, "image");
        this.__mainText = new ObservedPropertySimplePU('主标题文本', this, "mainText");
        this.__subText = new ObservedPropertySimplePU('子标题文本', this, "subText");
        this.__descriptionText = new ObservedPropertySimplePU('这是一个描述文本，用于展示一些详细信息。', this, "descriptionText");
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentWidthBreakpoint");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HorizontalGraphicTextDisplayItem1_Params) {
        if (params.image !== undefined) {
            this.image = params.image;
        }
        if (params.mainText !== undefined) {
            this.mainText = params.mainText;
        }
        if (params.subText !== undefined) {
            this.subText = params.subText;
        }
        if (params.descriptionText !== undefined) {
            this.descriptionText = params.descriptionText;
        }
    }
    updateStateVars(params: HorizontalGraphicTextDisplayItem1_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__image.purgeDependencyOnElmtId(rmElmtId);
        this.__mainText.purgeDependencyOnElmtId(rmElmtId);
        this.__subText.purgeDependencyOnElmtId(rmElmtId);
        this.__descriptionText.purgeDependencyOnElmtId(rmElmtId);
        this.__currentWidthBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__image.aboutToBeDeleted();
        this.__mainText.aboutToBeDeleted();
        this.__subText.aboutToBeDeleted();
        this.__descriptionText.aboutToBeDeleted();
        this.__currentWidthBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __image: ObservedPropertyObjectPU<Resource>;
    get image() {
        return this.__image.get();
    }
    set image(newValue: Resource) {
        this.__image.set(newValue);
    }
    private __mainText: ObservedPropertySimplePU<string>;
    get mainText() {
        return this.__mainText.get();
    }
    set mainText(newValue: string) {
        this.__mainText.set(newValue);
    }
    private __subText: ObservedPropertySimplePU<string>;
    get subText() {
        return this.__subText.get();
    }
    set subText(newValue: string) {
        this.__subText.set(newValue);
    }
    private __descriptionText: ObservedPropertySimplePU<string>;
    get descriptionText() {
        return this.__descriptionText.get();
    }
    set descriptionText(newValue: string) {
        this.__descriptionText.set(newValue);
    }
    private __currentWidthBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentWidthBreakpoint() {
        return this.__currentWidthBreakpoint.get();
    }
    set currentWidthBreakpoint(newValue: string) {
        this.__currentWidthBreakpoint.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(CommonConstants.FULL_PERCENT);
            Row.width(CommonConstants.FULL_PERCENT);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.image);
            Image.borderRadius({ "id": 125830911, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Image.height('80%');
            Image.width('33%');
            Image.margin({ left: 15, right: 15 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ right: 15 });
            Column.width('60%');
            Column.height('80%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.mainText);
            Text.fontSize({ "id": 16777228, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.padding({ bottom: 2 });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.height('20%');
            Text.width(CommonConstants.FULL_PERCENT);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.subText);
            Text.fontSize({ "id": 16777220, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777307, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Regular);
            Text.padding({ bottom: 4 });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.height('20%');
            Text.width(CommonConstants.FULL_PERCENT);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.descriptionText);
            Text.fontSize({ "id": 16777221, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777309, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.padding({ bottom: 4 });
            Text.maxLines(3);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.height('50%');
            Text.width(CommonConstants.FULL_PERCENT);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class ExerciseDataStatisticsModuleTitleInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_LG, "currentWidthBreakpoint");
        this.title = '';
        this.moduleRedirectContent = "查看更多";
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.onJump = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ExerciseDataStatisticsModuleTitleInfo_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.moduleRedirectContent !== undefined) {
            this.moduleRedirectContent = params.moduleRedirectContent;
        }
        if (params.onJump !== undefined) {
            this.onJump = params.onJump;
        }
    }
    updateStateVars(params: ExerciseDataStatisticsModuleTitleInfo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentWidthBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentWidthBreakpoint.aboutToBeDeleted();
        this.__appPathStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentWidthBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentWidthBreakpoint() {
        return this.__currentWidthBreakpoint.get();
    }
    set currentWidthBreakpoint(newValue: string) {
        this.__currentWidthBreakpoint.set(newValue);
    }
    public title: string;
    public moduleRedirectContent: string;
    private __appPathStack: ObservedPropertyAbstractPU<NavPathStack>;
    get appPathStack() {
        return this.__appPathStack.get();
    }
    set appPathStack(newValue: NavPathStack) {
        this.__appPathStack.set(newValue);
    }
    public onJump?: () => void;
    jump(): void {
        this.appPathStack.pushPathByName('EmptyPagePathStack', null);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.title.length) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width(CommonConstants.FULL_PERCENT);
                        Row.height("44vp");
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        Row.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.title);
                        Text.fontSize({ "id": 16777227, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor({ "id": 16777319, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.moduleRedirectContent);
                        Text.fontColor({ "id": 16777321, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                        Text.fontSize({ "id": 16777220, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Medium);
                        Text.onClick(() => {
                            if (this.onJump) {
                                this.onJump();
                            }
                            else {
                                this.jump();
                            }
                        });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
