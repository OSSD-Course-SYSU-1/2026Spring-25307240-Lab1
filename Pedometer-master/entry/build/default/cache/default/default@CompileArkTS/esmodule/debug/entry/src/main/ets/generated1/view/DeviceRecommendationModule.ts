if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DeviceRecommendationModuleTitleInfo_Params {
    currentWidthBreakpoint?: string;
    title?: string;
    moduleRedirectContent?: string;
    appPathStack?: NavPathStack;
    onJump?: () => void;
}
interface VerticalGraphicTextItem_Params {
    image?: Resource;
    title?: string;
    content?: string;
}
interface DeviceRecommendationModule_Params {
    swiperController?: SwiperController;
    itemModel?: Data;
    lazyDataSource?: LazyDataSource<DataSource>;
    moduleTitle?: string;
    moduleRedirectContent?: string;
    loadingStatus?: LoadingStatus;
    appPathStack?: NavPathStack;
    currentWidthBreakpoint?: string;
}
import { Data } from "@normalized:N&&&entry/src/main/ets/generated1/viewmodel/DeviceRecommendationModuleData&";
import type { DataSource } from "@normalized:N&&&entry/src/main/ets/generated1/viewmodel/DeviceRecommendationModuleData&";
import { LoadingStatus } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonEnums&";
import { LoadingFailedView } from "@normalized:N&&&entry/src/main/ets/generated1/view/LoadingFailedView&";
import { BreakpointConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/BreakpointConstants&";
import { BreakpointType } from "@normalized:N&&&entry/src/main/ets/generated1/util/BreakpointType&";
import type LazyDataSource from '../util/LazyDataSource';
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonConstants&";
export class DeviceRecommendationModule extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.swiperController = new SwiperController();
        this.__itemModel = new ObservedPropertyObjectPU(Data.getInstance(), this, "itemModel");
        this.__lazyDataSource = new ObservedPropertyObjectPU(this.itemModel.lazyDataSource, this, "lazyDataSource");
        this.__moduleTitle = new ObservedPropertySimplePU("健康运动设备推荐", this, "moduleTitle");
        this.__moduleRedirectContent = new ObservedPropertySimplePU("立即选购", this, "moduleRedirectContent");
        this.__loadingStatus = new ObservedPropertySimplePU(LoadingStatus.OFF, this, "loadingStatus");
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentWidthBreakpoint");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DeviceRecommendationModule_Params) {
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.itemModel !== undefined) {
            this.itemModel = params.itemModel;
        }
        if (params.lazyDataSource !== undefined) {
            this.lazyDataSource = params.lazyDataSource;
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
    }
    updateStateVars(params: DeviceRecommendationModule_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__itemModel.purgeDependencyOnElmtId(rmElmtId);
        this.__lazyDataSource.purgeDependencyOnElmtId(rmElmtId);
        this.__moduleTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__moduleRedirectContent.purgeDependencyOnElmtId(rmElmtId);
        this.__loadingStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__currentWidthBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__itemModel.aboutToBeDeleted();
        this.__lazyDataSource.aboutToBeDeleted();
        this.__moduleTitle.aboutToBeDeleted();
        this.__moduleRedirectContent.aboutToBeDeleted();
        this.__loadingStatus.aboutToBeDeleted();
        this.__appPathStack.aboutToBeDeleted();
        this.__currentWidthBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private swiperController: SwiperController;
    private __itemModel: ObservedPropertyObjectPU<Data>;
    get itemModel() {
        return this.__itemModel.get();
    }
    set itemModel(newValue: Data) {
        this.__itemModel.set(newValue);
    }
    private __lazyDataSource: ObservedPropertyObjectPU<LazyDataSource<DataSource>>;
    get lazyDataSource() {
        return this.__lazyDataSource.get();
    }
    set lazyDataSource(newValue: LazyDataSource<DataSource>) {
        this.__lazyDataSource.set(newValue);
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
            Column.width('92%');
            Column.height('auto');
            Column.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Column.margin({ bottom: "10vp" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DeviceRecommendationModuleTitleInfo(this, {
                        title: this.moduleTitle,
                        moduleRedirectContent: this.moduleRedirectContent,
                        onJump: () => {
                            this.jump();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/view/DeviceRecommendationModule.ets", line: 57, col: 7 });
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
            }, { name: "DeviceRecommendationModuleTitleInfo" });
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
                        Swiper.create(this.swiperController);
                        Swiper.displayCount(new BreakpointType(1, 2, 4).getValue(this.currentWidthBreakpoint));
                        Swiper.indicator(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_SM ? true : false);
                        Swiper.autoPlay(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_SM ? true : false);
                        Swiper.itemSpace(4);
                        Swiper.height("210vp");
                        Swiper.width(CommonConstants.FULL_PERCENT);
                    }, Swiper);
                    {
                        const __lazyForEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                __Common__.create();
                                __Common__.onClick(() => {
                                    this.jump("DeviceRecommendationModuleDetail" + index.toString());
                                });
                            }, __Common__);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new VerticalGraphicTextItem(this, {
                                            image: item.getImage(),
                                            content: item.getContent(),
                                            title: item.getTitle()
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/view/DeviceRecommendationModule.ets", line: 70, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                image: item.getImage(),
                                                content: item.getContent(),
                                                title: item.getTitle()
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "VerticalGraphicTextItem" });
                            }
                            __Common__.pop();
                        };
                        const __lazyForEachItemIdFunc = (item: DataSource) => JSON.stringify(item);
                        LazyForEach.create("1", this, this.lazyDataSource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
                        LazyForEach.pop();
                    }
                    Swiper.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
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
export class VerticalGraphicTextItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__image = new ObservedPropertyObjectPU({ "id": 16777464, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, this, "image");
        this.__title = new ObservedPropertySimplePU('模块名', this, "title");
        this.__content = new ObservedPropertySimplePU('跳转', this, "content");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VerticalGraphicTextItem_Params) {
        if (params.image !== undefined) {
            this.image = params.image;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    updateStateVars(params: VerticalGraphicTextItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__image.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__content.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__image.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height(CommonConstants.FULL_PERCENT);
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#IMAGES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Image.create(this.image);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#IMAGES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Image.width(CommonConstants.FULL_PERCENT);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#IMAGES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Image.height("72%");
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#IMAGES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Image.borderRadius({ "id": 125830909, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.create(this.title);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.fontWeight(FontWeight.Medium);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.maxLines(1);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.width(CommonConstants.FULL_PERCENT);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.fontColor({ "id": 16777319, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.margin({ top: "4vp" });
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * directly modify {@link Data#TITLES}
         * or refactor method {@code getResources()} to implement your custom code logic.
         * @see Data#getResources()
         */
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.create(this.content);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.fontSize({ "id": 16777220, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.opacity(0.4);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.fontWeight(FontWeight.Regular);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.maxLines(1);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.width(CommonConstants.FULL_PERCENT);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.fontColor({ "id": 16777321, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link Data#CONTENTS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see Data#getResources()
             */
            Text.margin({ top: "2vp" });
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * directly modify {@link Data#CONTENTS}
         * or refactor method {@code getResources()} to implement your custom code logic.
         * @see Data#getResources()
         */
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class DeviceRecommendationModuleTitleInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_LG, "currentWidthBreakpoint");
        this.title = '';
        this.moduleRedirectContent = "立即选购";
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.onJump = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DeviceRecommendationModuleTitleInfo_Params) {
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
    updateStateVars(params: DeviceRecommendationModuleTitleInfo_Params) {
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
