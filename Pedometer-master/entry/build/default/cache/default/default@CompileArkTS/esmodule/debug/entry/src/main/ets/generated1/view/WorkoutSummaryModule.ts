if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WorkoutSummaryModuleTitleInfo_Params {
    currentWidthBreakpoint?: string;
    title?: string;
    moduleRedirectContent?: string;
    appPathStack?: NavPathStack;
    onJump?: () => void;
}
interface VerticalDoubleGraphicTextItem_Params {
    title1?: string;
    image1?: Resource;
    imageDetail1?: string;
    detail1?: string;
    title2?: string;
    image2?: Resource;
    imageDetail2?: string;
    detail2?: string;
}
interface WorkoutSummaryModule_Params {
    itemModel?: Data;
    listDirection?: Axis;
    moduleTitle?: string;
    moduleRedirectContent?: string;
    loadingStatus?: LoadingStatus;
    lazyDataSource?: LazyDataSource<DataSource>;
    spaceArray?: string[];
    appPathStack?: NavPathStack;
    currentWidthBreakpoint?: string;
}
import { LoadingStatus } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonEnums&";
import { LoadingFailedView } from "@normalized:N&&&entry/src/main/ets/generated1/view/LoadingFailedView&";
import { BreakpointConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/BreakpointConstants&";
import { BreakpointType } from "@normalized:N&&&entry/src/main/ets/generated1/util/BreakpointType&";
import type LazyDataSource from '../util/LazyDataSource';
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonConstants&";
import { Data } from "@normalized:N&&&entry/src/main/ets/generated1/viewmodel/WorkoutSummaryModuleData&";
import type { DataSource } from "@normalized:N&&&entry/src/main/ets/generated1/viewmodel/WorkoutSummaryModuleData&";
export class WorkoutSummaryModule extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__itemModel = new ObservedPropertyObjectPU(Data.getInstance(), this, "itemModel");
        this.__listDirection = new SynchedPropertySimpleOneWayPU(params.listDirection, this, "listDirection");
        this.__moduleTitle = new ObservedPropertySimplePU("健康运动概览", this, "moduleTitle");
        this.__moduleRedirectContent = new ObservedPropertySimplePU("查看更多", this, "moduleRedirectContent");
        this.__loadingStatus = new ObservedPropertySimplePU(LoadingStatus.OFF, this, "loadingStatus");
        this.__lazyDataSource = new ObservedPropertyObjectPU(this.itemModel.lazyDataSource, this, "lazyDataSource");
        this.spaceArray = ['12vp', '16vp', '20vp'];
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentWidthBreakpoint");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WorkoutSummaryModule_Params) {
        if (params.itemModel !== undefined) {
            this.itemModel = params.itemModel;
        }
        if (params.listDirection === undefined) {
            this.__listDirection.set(Axis.Horizontal);
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
    }
    updateStateVars(params: WorkoutSummaryModule_Params) {
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
            Column.height("auto");
            Column.align(Alignment.Center);
            Column.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Column.margin({ bottom: "10vp" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new WorkoutSummaryModuleTitleInfo(this, {
                        title: this.moduleTitle,
                        moduleRedirectContent: this.moduleRedirectContent,
                        onJump: () => {
                            this.jump();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/view/WorkoutSummaryModule.ets", line: 59, col: 9 });
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
            }, { name: "WorkoutSummaryModuleTitleInfo" });
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
                        List.listDirection(this.listDirection);
                        List.scrollBar(BarState.Off);
                        List.edgeEffect(EdgeEffect.Spring, { alwaysEnabled: true });
                    }, List);
                    {
                        const __lazyForEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(() => { }, false);
                                    ListItem.width('180vp');
                                    ListItem.height('110.00vp');
                                    ListItem.onClick(() => {
                                        this.jump("WorkoutSummaryModuleDetail" + index.toString());
                                    });
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, ListItem);
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new VerticalDoubleGraphicTextItem(this, {
                                                    title1: item.getTitle1(),
                                                    image1: item.getImage1(),
                                                    imageDetail1: item.getImageDetail1(),
                                                    detail1: item.getDetail1(),
                                                    title2: item.getTitle2(),
                                                    image2: item.getImage2(),
                                                    imageDetail2: item.getImageDetail2(),
                                                    detail2: item.getDetail2(),
                                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/view/WorkoutSummaryModule.ets", line: 76, col: 17 });
                                                ViewPU.create(componentCall);
                                                let paramsLambda = () => {
                                                    return {
                                                        title1: item.getTitle1(),
                                                        image1: item.getImage1(),
                                                        imageDetail1: item.getImageDetail1(),
                                                        detail1: item.getDetail1(),
                                                        title2: item.getTitle2(),
                                                        image2: item.getImage2(),
                                                        imageDetail2: item.getImageDetail2(),
                                                        detail2: item.getDetail2()
                                                    };
                                                };
                                                componentCall.paramsGenerator_ = paramsLambda;
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                                            }
                                        }, { name: "VerticalDoubleGraphicTextItem" });
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
export class VerticalDoubleGraphicTextItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title1 = new ObservedPropertySimplePU('口碑榜', this, "title1");
        this.__image1 = new ObservedPropertyObjectPU({ "id": 16777435, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, this, "image1");
        this.__imageDetail1 = new ObservedPropertySimplePU('杭州', this, "imageDetail1");
        this.__detail1 = new ObservedPropertySimplePU('特色体验榜', this, "detail1");
        this.__title2 = new ObservedPropertySimplePU('旅行热点', this, "title2");
        this.__image2 = new ObservedPropertyObjectPU({ "id": 16777435, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, this, "image2");
        this.__imageDetail2 = new ObservedPropertySimplePU('飙升217%', this, "imageDetail2");
        this.__detail2 = new ObservedPropertySimplePU('大明山景区', this, "detail2");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VerticalDoubleGraphicTextItem_Params) {
        if (params.title1 !== undefined) {
            this.title1 = params.title1;
        }
        if (params.image1 !== undefined) {
            this.image1 = params.image1;
        }
        if (params.imageDetail1 !== undefined) {
            this.imageDetail1 = params.imageDetail1;
        }
        if (params.detail1 !== undefined) {
            this.detail1 = params.detail1;
        }
        if (params.title2 !== undefined) {
            this.title2 = params.title2;
        }
        if (params.image2 !== undefined) {
            this.image2 = params.image2;
        }
        if (params.imageDetail2 !== undefined) {
            this.imageDetail2 = params.imageDetail2;
        }
        if (params.detail2 !== undefined) {
            this.detail2 = params.detail2;
        }
    }
    updateStateVars(params: VerticalDoubleGraphicTextItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title1.purgeDependencyOnElmtId(rmElmtId);
        this.__image1.purgeDependencyOnElmtId(rmElmtId);
        this.__imageDetail1.purgeDependencyOnElmtId(rmElmtId);
        this.__detail1.purgeDependencyOnElmtId(rmElmtId);
        this.__title2.purgeDependencyOnElmtId(rmElmtId);
        this.__image2.purgeDependencyOnElmtId(rmElmtId);
        this.__imageDetail2.purgeDependencyOnElmtId(rmElmtId);
        this.__detail2.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title1.aboutToBeDeleted();
        this.__image1.aboutToBeDeleted();
        this.__imageDetail1.aboutToBeDeleted();
        this.__detail1.aboutToBeDeleted();
        this.__title2.aboutToBeDeleted();
        this.__image2.aboutToBeDeleted();
        this.__imageDetail2.aboutToBeDeleted();
        this.__detail2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title1: ObservedPropertySimplePU<string>;
    get title1() {
        return this.__title1.get();
    }
    set title1(newValue: string) {
        this.__title1.set(newValue);
    }
    private __image1: ObservedPropertyObjectPU<Resource>;
    get image1() {
        return this.__image1.get();
    }
    set image1(newValue: Resource) {
        this.__image1.set(newValue);
    }
    private __imageDetail1: ObservedPropertySimplePU<string>;
    get imageDetail1() {
        return this.__imageDetail1.get();
    }
    set imageDetail1(newValue: string) {
        this.__imageDetail1.set(newValue);
    }
    private __detail1: ObservedPropertySimplePU<string>;
    get detail1() {
        return this.__detail1.get();
    }
    set detail1(newValue: string) {
        this.__detail1.set(newValue);
    }
    private __title2: ObservedPropertySimplePU<string>;
    get title2() {
        return this.__title2.get();
    }
    set title2(newValue: string) {
        this.__title2.set(newValue);
    }
    private __image2: ObservedPropertyObjectPU<Resource>;
    get image2() {
        return this.__image2.get();
    }
    set image2(newValue: Resource) {
        this.__image2.set(newValue);
    }
    private __imageDetail2: ObservedPropertySimplePU<string>;
    get imageDetail2() {
        return this.__imageDetail2.get();
    }
    set imageDetail2(newValue: string) {
        this.__imageDetail2.set(newValue);
    }
    private __detail2: ObservedPropertySimplePU<string>;
    get detail2() {
        return this.__detail2.get();
    }
    set detail2(newValue: string) {
        this.__detail2.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.FULL_PERCENT);
            Row.height(CommonConstants.FULL_PERCENT);
            Row.borderRadius({ "id": 125830910, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 模块1
            Column.create();
            // 模块1
            Column.width('49%');
            // 模块1
            Column.height(CommonConstants.FULL_PERCENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title1);
            Text.width(CommonConstants.FULL_PERCENT);
            Text.height('18%');
            Text.fontSize({ "id": 16777229, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777319, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height('70%');
            Column.backgroundImage(ObservedObject.GetRawObject(this.image1));
            Column.backgroundImageSize(ImageSize.Cover);
            Column.borderRadius({ "id": 125830909, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Column.justifyContent(FlexAlign.End);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.imageDetail1);
            Text.width(CommonConstants.FULL_PERCENT);
            Text.height(20);
            Text.fontSize({ "id": 16777222, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777316, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.linearGradient({
                colors: [[Color.Transparent, 0],
                    [{ "id": 16777342, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, 100]]
            });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.padding(4);
            Text.borderRadius({
                bottomLeft: { "id": 125830909, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                bottomRight: { "id": 125830909, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
            Text.maxLines(1);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.detail1);
            Text.width(CommonConstants.FULL_PERCENT);
            Text.height('12%');
            Text.fontSize({ "id": 16777222, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777321, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.padding({ top: 2 });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(1);
        }, Text);
        Text.pop();
        // 模块1
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 模块2
            Column.create();
            // 模块2
            Column.width('49%');
            // 模块2
            Column.height(CommonConstants.FULL_PERCENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title2);
            Text.width(CommonConstants.FULL_PERCENT);
            Text.height('18%');
            Text.fontSize({ "id": 16777229, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777319, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height('70%');
            Column.backgroundImage(ObservedObject.GetRawObject(this.image1));
            Column.backgroundImageSize(ImageSize.Cover);
            Column.borderRadius({ "id": 125830909, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Column.justifyContent(FlexAlign.End);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.imageDetail2);
            Text.width(CommonConstants.FULL_PERCENT);
            Text.height(20);
            Text.fontSize({ "id": 16777222, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontColor({ "id": 16777316, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.linearGradient({
                colors: [[Color.Transparent, 0],
                    [{ "id": 16777342, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, 100]]
            });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.padding(4);
            Text.borderRadius({
                bottomLeft: { "id": 125830909, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" },
                bottomRight: { "id": 125830909, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }
            });
            Text.maxLines(1);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.detail2);
            Text.width(CommonConstants.FULL_PERCENT);
            Text.height('12%');
            Text.fontSize({ "id": 16777222, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777321, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Text.padding({ top: 2 });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(1);
        }, Text);
        Text.pop();
        // 模块2
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class WorkoutSummaryModuleTitleInfo extends ViewPU {
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
    setInitiallyProvidedValue(params: WorkoutSummaryModuleTitleInfo_Params) {
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
    updateStateVars(params: WorkoutSummaryModuleTitleInfo_Params) {
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
