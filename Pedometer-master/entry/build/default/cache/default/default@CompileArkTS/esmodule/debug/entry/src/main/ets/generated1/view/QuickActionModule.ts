if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface QuickActionModuleTitleInfo_Params {
    currentWidthBreakpoint?: string;
    title?: string;
    moduleRedirectContent?: string;
    appPathStack?: NavPathStack;
    onJump?: () => void;
}
interface DoubleStackGraphicTextItem_Params {
    title?: string;
    content?: string;
    image?: Resource;
}
interface QuickActionModule_Params {
    itemModel?: DataSource;
    lazyDataSource?: LazyDataSource<DataSourceStyleAStyleA>;
    rowHeight?: number;
    rowGap?: number;
    moduleTitle?: string;
    moduleRedirectContent?: string;
    columnGapArray?: number[];
    columnNumberArray?: number[];
    rowNumberArray?: number[];
    loadingStatus?: LoadingStatus;
    appPathStack?: NavPathStack;
    currentWidthBreakpoint?: string;
}
import { DataSource } from "@normalized:N&&&entry/src/main/ets/generated1/viewmodel/QuickActionModuleData&";
import type { DataSourceStyleAStyleA } from "@normalized:N&&&entry/src/main/ets/generated1/viewmodel/QuickActionModuleData&";
import { LoadingStatus } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonEnums&";
import { LoadingFailedView } from "@normalized:N&&&entry/src/main/ets/generated1/view/LoadingFailedView&";
import { BreakpointConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/BreakpointConstants&";
import { BreakpointType } from "@normalized:N&&&entry/src/main/ets/generated1/util/BreakpointType&";
import type LazyDataSource from '../util/LazyDataSource';
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonConstants&";
export class QuickActionModule extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__itemModel = new ObservedPropertyObjectPU(DataSource.getInstance(), this, "itemModel");
        this.__lazyDataSource = new ObservedPropertyObjectPU(this.itemModel.lazyDataSource, this, "lazyDataSource");
        this.__rowHeight = new ObservedPropertySimplePU(150, this, "rowHeight");
        this.__rowGap = new ObservedPropertySimplePU(6, this, "rowGap");
        this.__moduleTitle = new ObservedPropertySimplePU("健康运动快捷操作", this, "moduleTitle");
        this.__moduleRedirectContent = new ObservedPropertySimplePU("查看更多", this, "moduleRedirectContent");
        this.columnGapArray = [6, 10, 12];
        this.columnNumberArray = [2, 4, 4];
        this.rowNumberArray = [1, 1, 1];
        this.__loadingStatus = new ObservedPropertySimplePU(LoadingStatus.OFF, this, "loadingStatus");
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentWidthBreakpoint");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: QuickActionModule_Params) {
        if (params.itemModel !== undefined) {
            this.itemModel = params.itemModel;
        }
        if (params.lazyDataSource !== undefined) {
            this.lazyDataSource = params.lazyDataSource;
        }
        if (params.rowHeight !== undefined) {
            this.rowHeight = params.rowHeight;
        }
        if (params.rowGap !== undefined) {
            this.rowGap = params.rowGap;
        }
        if (params.moduleTitle !== undefined) {
            this.moduleTitle = params.moduleTitle;
        }
        if (params.moduleRedirectContent !== undefined) {
            this.moduleRedirectContent = params.moduleRedirectContent;
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
        if (params.loadingStatus !== undefined) {
            this.loadingStatus = params.loadingStatus;
        }
    }
    updateStateVars(params: QuickActionModule_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__itemModel.purgeDependencyOnElmtId(rmElmtId);
        this.__lazyDataSource.purgeDependencyOnElmtId(rmElmtId);
        this.__rowHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__rowGap.purgeDependencyOnElmtId(rmElmtId);
        this.__moduleTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__moduleRedirectContent.purgeDependencyOnElmtId(rmElmtId);
        this.__loadingStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__currentWidthBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__itemModel.aboutToBeDeleted();
        this.__lazyDataSource.aboutToBeDeleted();
        this.__rowHeight.aboutToBeDeleted();
        this.__rowGap.aboutToBeDeleted();
        this.__moduleTitle.aboutToBeDeleted();
        this.__moduleRedirectContent.aboutToBeDeleted();
        this.__loadingStatus.aboutToBeDeleted();
        this.__appPathStack.aboutToBeDeleted();
        this.__currentWidthBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __itemModel: ObservedPropertyObjectPU<DataSource>;
    get itemModel() {
        return this.__itemModel.get();
    }
    set itemModel(newValue: DataSource) {
        this.__itemModel.set(newValue);
    }
    private __lazyDataSource: ObservedPropertyObjectPU<LazyDataSource<DataSourceStyleAStyleA>>;
    get lazyDataSource() {
        return this.__lazyDataSource.get();
    }
    set lazyDataSource(newValue: LazyDataSource<DataSourceStyleAStyleA>) {
        this.__lazyDataSource.set(newValue);
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
    private columnGapArray: number[];
    private columnNumberArray: number[];
    private rowNumberArray: number[];
    private __loadingStatus: ObservedPropertySimplePU<LoadingStatus>;
    get loadingStatus() {
        return this.__loadingStatus.get();
    }
    set loadingStatus(newValue: LoadingStatus) {
        this.__loadingStatus.set(newValue);
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
            Column.align(Alignment.Center);
            Column.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Column.margin({ bottom: "10vp" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new QuickActionModuleTitleInfo(this, {
                        title: this.moduleTitle,
                        moduleRedirectContent: this.moduleRedirectContent,
                        onJump: () => {
                            this.jump();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/view/QuickActionModule.ets", line: 62, col: 9 });
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
            }, { name: "QuickActionModuleTitleInfo" });
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
                        Grid.create();
                        Grid.columnsTemplate(("1fr ").repeat(new BreakpointType(this.columnNumberArray[0], this.columnNumberArray[1], this.columnNumberArray[2]).getValue(this.currentWidthBreakpoint)).trim());
                        Grid.rowsTemplate(("1fr ").repeat(new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1], this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint)).trim());
                        Grid.height(this.currentWidthBreakpoint !== BreakpointConstants.BREAKPOINT_LG ?
                            (this.rowGap + this.rowHeight) * new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1], this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint) :
                            (this.rowGap + this.rowHeight + 30) * new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1], this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint));
                        Grid.columnsGap(new BreakpointType(this.columnGapArray[0], this.columnGapArray[1], this.columnGapArray[2]).getValue(this.currentWidthBreakpoint));
                        Grid.rowsGap(this.rowGap);
                    }, Grid);
                    {
                        const __lazyForEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    GridItem.create(() => { }, false);
                                    GridItem.onClick(() => {
                                        this.jump("QuickActionModuleDetail" + index.toString());
                                    });
                                    GridItem.borderRadius({ "id": 125830911, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, GridItem);
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new DoubleStackGraphicTextItem(this, {
                                                    title: item.getTitle(),
                                                    content: item.getContent(),
                                                    image: item.getImage()
                                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/view/QuickActionModule.ets", line: 77, col: 19 });
                                                ViewPU.create(componentCall);
                                                let paramsLambda = () => {
                                                    return {
                                                        title: item.getTitle(),
                                                        content: item.getContent(),
                                                        image: item.getImage()
                                                    };
                                                };
                                                componentCall.paramsGenerator_ = paramsLambda;
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                                            }
                                        }, { name: "DoubleStackGraphicTextItem" });
                                    }
                                    GridItem.pop();
                                };
                                observedDeepRender();
                            }
                        };
                        const __lazyForEachItemIdFunc = (item: DataSourceStyleAStyleA, index: number) => index + JSON.stringify(item);
                        LazyForEach.create("1", this, this.lazyDataSource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
                        LazyForEach.pop();
                    }
                    Grid.pop();
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
export class DoubleStackGraphicTextItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title = new ObservedPropertySimplePU('模块名', this, "title");
        this.__content = new ObservedPropertySimplePU('跳转', this, "content");
        this.__image = new ObservedPropertyObjectPU({ "id": 16777464, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, this, "image");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DoubleStackGraphicTextItem_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.image !== undefined) {
            this.image = params.image;
        }
    }
    updateStateVars(params: DoubleStackGraphicTextItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__content.purgeDependencyOnElmtId(rmElmtId);
        this.__image.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__image.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: ObservedPropertySimplePU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __content: ObservedPropertySimplePU<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __image: ObservedPropertyObjectPU<Resource>;
    get image() {
        return this.__image.get();
    }
    set image(newValue: Resource) {
        this.__image.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width(CommonConstants.FULL_PERCENT);
            Stack.height(CommonConstants.FULL_PERCENT);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#IMAGES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Image.create(this.image);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#IMAGES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Image.width(CommonConstants.FULL_PERCENT);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#IMAGES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Image.height(CommonConstants.FULL_PERCENT);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#IMAGES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Image.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ left: '16vp', top: '16vp' });
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.Start);
            Column.width(CommonConstants.FULL_PERCENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.create(this.title);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.fontWeight(FontWeight.Medium);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.fontSize({ "id": 16777227, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.margin({ top: "4vp" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.maxLines(1);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.width(CommonConstants.FULL_PERCENT);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.fontColor({ "id": 16777316, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * directly modify {@link DataSource#TITLES}
         * or refactor method {@code getResources()} to implement your custom code logic.
         * @see DataSource#getResources()
         */
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.create(this.content);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.fontSize({ "id": 16777219, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.opacity(0.8);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.fontWeight(FontWeight.Regular);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.maxLines(1);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.margin({ top: "2vp" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.width(CommonConstants.FULL_PERCENT);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link DataSource#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see DataSource#getResources()
             */
            Text.fontColor({ "id": 16777317, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * directly modify {@link DataSource#CONTENTS}
         * or refactor method {@code getResources()} to implement your custom code logic.
         * @see DataSource#getResources()
         */
        Text.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class QuickActionModuleTitleInfo extends ViewPU {
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
    setInitiallyProvidedValue(params: QuickActionModuleTitleInfo_Params) {
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
    updateStateVars(params: QuickActionModuleTitleInfo_Params) {
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
