if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DeviceQuickAccessModuleTitleInfo_Params {
    currentWidthBreakpoint?: string;
    title?: string;
    moduleRedirectContent?: string;
    appPathStack?: NavPathStack;
    onJump?: () => void;
}
interface HorizontalGraphicTextFunctionItem2_Params {
    title?: string;
    description?: string;
    icon?: Resource;
}
interface DeviceQuickAccessModule_Params {
    itemModel?: Data;
    moduleTitle?: string;
    moduleRedirectContent?: string;
    loadingStatus?: LoadingStatus;
    lazyDataSource?: LazyDataSource<DataSource>;
    spaceArray?: string[];
    appPathStack?: NavPathStack;
    currentWidthBreakpoint?: string;
}
import { Data } from "@normalized:N&&&entry/src/main/ets/generated1/viewmodel/DeviceQuickAccessModuleData&";
import type { DataSource } from "@normalized:N&&&entry/src/main/ets/generated1/viewmodel/DeviceQuickAccessModuleData&";
import { LoadingStatus } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonEnums&";
import { LoadingFailedView } from "@normalized:N&&&entry/src/main/ets/generated1/view/LoadingFailedView&";
import { BreakpointConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/BreakpointConstants&";
import { BreakpointType } from "@normalized:N&&&entry/src/main/ets/generated1/util/BreakpointType&";
import type LazyDataSource from '../util/LazyDataSource';
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonConstants&";
export class DeviceQuickAccessModule extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__itemModel = new ObservedPropertyObjectPU(Data.getInstance(), this, "itemModel");
        this.__moduleTitle = new ObservedPropertySimplePU("设备功能管理", this, "moduleTitle");
        this.__moduleRedirectContent = new ObservedPropertySimplePU("查看更多", this, "moduleRedirectContent");
        this.__loadingStatus = new ObservedPropertySimplePU(LoadingStatus.OFF, this, "loadingStatus");
        this.__lazyDataSource = new ObservedPropertyObjectPU(this.itemModel.lazyDataSource, this, "lazyDataSource");
        this.spaceArray = ['8vp', '16vp', '20vp'];
        this.__appPathStack = this.initializeConsume('appPathStack', "appPathStack");
        this.__currentWidthBreakpoint = this.createStorageLink('currentWidthBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentWidthBreakpoint");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DeviceQuickAccessModule_Params) {
        if (params.itemModel !== undefined) {
            this.itemModel = params.itemModel;
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
    updateStateVars(params: DeviceQuickAccessModule_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__itemModel.purgeDependencyOnElmtId(rmElmtId);
        this.__moduleTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__moduleRedirectContent.purgeDependencyOnElmtId(rmElmtId);
        this.__loadingStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__lazyDataSource.purgeDependencyOnElmtId(rmElmtId);
        this.__appPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__currentWidthBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__itemModel.aboutToBeDeleted();
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
    jump(pageName: string = 'EmptyPagePathStack'): void {
        this.appPathStack.pushPathByName(pageName, null);
    }
    aboutToAppear() {
        this.loadResources();
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
            Column.margin({ bottom: "10vp" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DeviceQuickAccessModuleTitleInfo(this, {
                        title: this.moduleTitle,
                        moduleRedirectContent: this.moduleRedirectContent,
                        onJump: () => {
                            this.jump();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/view/DeviceQuickAccessModule.ets", line: 58, col: 9 });
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
            }, { name: "DeviceQuickAccessModuleTitleInfo" });
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
                        List.lanes(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_SM ? 2 : 1, "12vp");
                        List.listDirection(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_SM ? Axis.Vertical :
                            Axis.Horizontal);
                    }, List);
                    {
                        const __lazyForEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(() => { }, false);
                                    ListItem.height("60vp");
                                    ListItem.borderRadius({ "id": 125830909, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                                    ListItem.backgroundColor({ "id": 16777292, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
                                    ListItem.onClick(() => {
                                        this.jump("DeviceQuickAccessModuleDetail" + index.toString());
                                    });
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, ListItem);
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new HorizontalGraphicTextFunctionItem2(this, {
                                                    icon: item.getIcon(),
                                                    title: item.getTitle(),
                                                    description: item.getDescription()
                                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/view/DeviceQuickAccessModule.ets", line: 75, col: 17 });
                                                ViewPU.create(componentCall);
                                                let paramsLambda = () => {
                                                    return {
                                                        icon: item.getIcon(),
                                                        title: item.getTitle(),
                                                        description: item.getDescription()
                                                    };
                                                };
                                                componentCall.paramsGenerator_ = paramsLambda;
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                                            }
                                        }, { name: "HorizontalGraphicTextFunctionItem2" });
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
export class HorizontalGraphicTextFunctionItem2 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title = new ObservedPropertySimplePU('模块名', this, "title");
        this.__description = new ObservedPropertySimplePU('跳转', this, "description");
        this.__icon = new ObservedPropertyObjectPU({ "id": 16777434, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, this, "icon");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HorizontalGraphicTextFunctionItem2_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.description !== undefined) {
            this.description = params.description;
        }
        if (params.icon !== undefined) {
            this.icon = params.icon;
        }
    }
    updateStateVars(params: HorizontalGraphicTextFunctionItem2_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__description.purgeDependencyOnElmtId(rmElmtId);
        this.__icon.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__description.aboutToBeDeleted();
        this.__icon.aboutToBeDeleted();
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
    private __description: ObservedPropertySimplePU<string>;
    get description() {
        return this.__description.get();
    }
    set description(newValue: string) {
        this.__description.set(newValue);
    }
    private __icon: ObservedPropertyObjectPU<Resource>;
    get icon() {
        return this.__icon.get();
    }
    set icon(newValue: Resource) {
        this.__icon.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.borderRadius({ "id": 125830913, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            Row.width(CommonConstants.FULL_PERCENT);
            Row.height(CommonConstants.FULL_PERCENT);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('50%');
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
            Column.padding({ left: 6, right: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.create(this.title);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.margin({ bottom: '3vp' });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.fontColor({ "id": 16777319, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.maxFontSize({ "id": 16777228, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.minFontSize({ "id": 16777221, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.fontWeight(FontWeight.Medium);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#TITLES}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.maxLines(1);
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#TITLES}
         * or refactor method {@code getResources()} to implement your custom code logic.
         * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
         */
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#DESCRIPTIONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.create(this.description);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#DESCRIPTIONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.fontColor({ "id": 16777321, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#DESCRIPTIONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.maxFontSize({ "id": 16777220, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#DESCRIPTIONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.minFontSize({ "id": 16777222, "type": 10007, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#DESCRIPTIONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.fontWeight(FontWeight.Regular);
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#DESCRIPTIONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#DESCRIPTIONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Text.maxLines(1);
        }, Text);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#DESCRIPTIONS}
         * or refactor method {@code getResources()} to implement your custom code logic.
         * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
         */
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#ICONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Column.create();
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#ICONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Column.width('30%');
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#ICONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Column.margin({ right: 2 });
            /**
             * TODO:
             * please modify it according to the actual situation.
             * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#ICONS}
             * or refactor method {@code getResources()} to implement your custom code logic.
             * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
             */
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.icon);
            Image.height('60%');
            Image.constraintSize({ maxWidth: '100%' });
            Image.objectFit(ImageFit.Contain);
        }, Image);
        /**
         * TODO:
         * please modify it according to the actual situation.
         * directly modify {@link SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#ICONS}
         * or refactor method {@code getResources()} to implement your custom code logic.
         * @see SwiperFlatten_HorizontalGraphicTextFunctionItem2Model#getResources()
         */
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class DeviceQuickAccessModuleTitleInfo extends ViewPU {
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
    setInitiallyProvidedValue(params: DeviceQuickAccessModuleTitleInfo_Params) {
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
    updateStateVars(params: DeviceQuickAccessModuleTitleInfo_Params) {
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
