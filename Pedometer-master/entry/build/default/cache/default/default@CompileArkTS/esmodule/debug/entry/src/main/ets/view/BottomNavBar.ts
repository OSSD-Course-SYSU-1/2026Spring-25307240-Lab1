if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BottomNavBar_Params {
    currentTab?: number;
    hoverIndex?: number;
    tabs?: TabItem[];
}
import { DesignSystem } from "@normalized:N&&&entry/src/main/ets/common/constants/DesignSystem&";
// 定义Tab项接口
interface TabItem {
    icon: string;
    activeIcon: string;
    label: string;
}
export class BottomNavBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentTab = new ObservedPropertySimplePU(0, this, "currentTab");
        this.__hoverIndex = new ObservedPropertySimplePU(-1, this, "hoverIndex");
        this.tabs = [
            { icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z M5 7h10M5 11h10M5 15h6',
                activeIcon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z M5 7h10v2H5V7z M5 11h10v2H5v-2z M5 15h6v2H5v-2z',
                label: '今日' },
            { icon: 'M13 3c0 0-3 2-3 5s3 5 3 5 M11 8c0 0-2 1-2 3s2 3 2 3 M9 3v18 M15 3v18 M9 10h6 M9 14h6',
                activeIcon: 'M13 3c0 0-3 2-3 5s3 5 3 5 M11 8c0 0-2 1-2 3s2 3 2 3 M9 3v18 M15 3v18 M9 10h6 M9 14h6',
                label: '锻炼' },
            { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
                activeIcon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
                label: '会员' },
            { icon: 'M12 7a2 2 0 100 4 2 2 0 000-4z M12 3a9 9 0 100 18 9 9 0 000-18z M12 11v6',
                activeIcon: 'M12 7a2 2 0 100 4 2 2 0 000-4z M12 3a9 9 0 100 18 9 9 0 000-18z M12 11v6',
                label: '设备' },
            { icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z',
                activeIcon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z',
                label: '我的' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BottomNavBar_Params) {
        if (params.currentTab !== undefined) {
            this.currentTab = params.currentTab;
        }
        if (params.hoverIndex !== undefined) {
            this.hoverIndex = params.hoverIndex;
        }
        if (params.tabs !== undefined) {
            this.tabs = params.tabs;
        }
    }
    updateStateVars(params: BottomNavBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentTab.purgeDependencyOnElmtId(rmElmtId);
        this.__hoverIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentTab.aboutToBeDeleted();
        this.__hoverIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentTab: ObservedPropertySimplePU<number>;
    get currentTab() {
        return this.__currentTab.get();
    }
    set currentTab(newValue: number) {
        this.__currentTab.set(newValue);
    }
    private __hoverIndex: ObservedPropertySimplePU<number>;
    get hoverIndex() {
        return this.__hoverIndex.get();
    }
    set hoverIndex(newValue: number) {
        this.__hoverIndex.set(newValue);
    }
    private tabs: TabItem[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(DesignSystem.NAV_HEIGHT);
            Row.linearGradient({
                angle: 180,
                colors: [['rgba(20, 20, 26, 0.95)', 0], ['rgba(30, 30, 38, 0.98)', 1]]
            });
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.padding({ top: DesignSystem.SPACING_SM, bottom: DesignSystem.SPACING_SM });
            Row.shadow({
                radius: 20,
                color: 'rgba(0, 0, 0, 0.5)',
                offsetX: 0,
                offsetY: -4
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const tab = _item;
                this.TabItem.bind(this)(index, tab);
            };
            this.forEachUpdateFunction(elmtId, this.tabs, forEachItemGenFunction, (tab: TabItem, index: number) => index.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    TabItem(index: number, tab: TabItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                if (this.currentTab !== index) {
                    this.currentTab = index;
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 图标容器
            Stack.create();
            // 图标容器
            Stack.width(40);
            // 图标容器
            Stack.height(28);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 激活时的背景光晕
            if (this.currentTab === index) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create();
                        Context.animation({
                            duration: DesignSystem.DURATION_NORMAL,
                            curve: Curve.EaseOut
                        });
                        Circle.width(40);
                        Circle.height(40);
                        Circle.fill(DesignSystem.withAlpha(DesignSystem.COLOR_PRIMARY, 0.15));
                        Circle.scale({ x: this.currentTab === index ? 1 : 0, y: this.currentTab === index ? 1 : 0 });
                        Context.animation(null);
                    }, Circle);
                });
            }
            // 图标
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 图标
            Path.create();
            // 图标
            Path.width(24);
            // 图标
            Path.height(24);
            // 图标
            Path.commands(this.currentTab === index ? tab.activeIcon : tab.icon);
            // 图标
            Path.stroke(this.currentTab === index ? DesignSystem.COLOR_PRIMARY : DesignSystem.TEXT_SECONDARY);
            // 图标
            Path.strokeWidth(this.currentTab === index ? 2.5 : 2);
            // 图标
            Path.fill(this.currentTab === index ? DesignSystem.withAlpha(DesignSystem.COLOR_PRIMARY, 0.3) : 'transparent');
        }, Path);
        // 图标容器
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标签
            Text.create(tab.label);
            Context.animation({
                duration: DesignSystem.DURATION_FAST,
                curve: Curve.EaseOut
            });
            // 标签
            Text.fontSize(DesignSystem.FONT_SIZE_XS);
            // 标签
            Text.fontColor(this.currentTab === index ? DesignSystem.COLOR_PRIMARY : DesignSystem.TEXT_SECONDARY);
            // 标签
            Text.fontWeight(this.currentTab === index ? FontWeight.Medium : FontWeight.Normal);
            // 标签
            Text.margin({ top: 2 });
            // 标签
            Text.scale({ x: this.currentTab === index ? 1.05 : 1, y: this.currentTab === index ? 1.05 : 1 });
            Context.animation(null);
        }, Text);
        // 标签
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
