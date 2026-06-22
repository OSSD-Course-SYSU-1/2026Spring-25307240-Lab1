if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FAQPage_Params {
    expandedIndex?: number;
    faqList?: FAQItem[];
}
import router from "@ohos:router";
/**
 * FAQ项接口
 */
interface FAQItem {
    question: string;
    answer: string;
}
class FAQPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__expandedIndex = new ObservedPropertySimplePU(0, this, "expandedIndex");
        this.faqList = [
            {
                question: '如何开始记录步数？',
                answer: '打开应用后，点击首页的"开始运动"按钮即可开始记录步数。应用会自动使用手机的计步传感器进行记录。'
            },
            {
                question: '步数统计不准确怎么办？',
                answer: '请检查以下几点：\n1. 确保已授予应用运动与健身权限\n2. 保持应用在后台运行\n3. 某些手机型号的计步传感器精度有限，建议结合实际情况参考\n4. 避免频繁开关应用，这可能导致数据丢失'
            },
            {
                question: '如何设置每日步数目标？',
                answer: '进入"设置" -> "基础通用设置" -> "每日步数目标"，可以设置您的个人目标。建议根据自身情况设置合理的目标，循序渐进。'
            },
            {
                question: '卡路里消耗是如何计算的？',
                answer: '卡路里消耗基于以下因素计算：\n1. 您的体重、身高、年龄等个人信息\n2. 步数和运动距离\n3. 运动强度评估\n\n建议在设置中完善个人信息以获得更准确的计算结果。'
            },
            {
                question: '数据会自动保存吗？',
                answer: '是的，应用会自动保存您的运动数据。数据存储在本地数据库中，即使关闭应用也不会丢失。建议定期查看历史记录了解运动情况。'
            },
            {
                question: '如何查看历史运动数据？',
                answer: '点击底部导航栏的"历史"按钮，可以查看过去7天、30天或更长时间的运动数据统计。支持按日期筛选和查看详细数据。'
            },
            {
                question: '应用耗电量大吗？',
                answer: '应用使用计步传感器进行记录，这是硬件级别的传感器，功耗非常低。正常使用情况下，对电池续航影响很小。'
            },
            {
                question: '如何清除缓存数据？',
                answer: '进入"设置" -> "基础通用设置" -> "清除缓存"，可以清除应用的临时缓存数据。注意：这不会删除您的运动记录数据。'
            },
            {
                question: '支持哪些设备？',
                answer: '支持HarmonyOS系统的智能设备，包括手机、手表等。需要设备具备计步传感器硬件支持。'
            },
            {
                question: '如何联系客服？',
                answer: '您可以通过以下方式联系我们：\n1. 在"设置" -> "反馈与帮助" -> "意见反馈"提交问题\n2. 发送邮件至：support@pedometer.example.com\n3. 拨打客服电话：400-123-4567'
            }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FAQPage_Params) {
        if (params.expandedIndex !== undefined) {
            this.expandedIndex = params.expandedIndex;
        }
        if (params.faqList !== undefined) {
            this.faqList = params.faqList;
        }
    }
    updateStateVars(params: FAQPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__expandedIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__expandedIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __expandedIndex: ObservedPropertySimplePU<number>; // 展开的FAQ索引，默认展开第一个
    get expandedIndex() {
        return this.__expandedIndex.get();
    }
    set expandedIndex(newValue: number) {
        this.__expandedIndex.set(newValue);
    }
    private faqList: FAQItem[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#000000');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.height(56);
            // 标题栏
            Row.padding({ left: 10, right: 10 });
            // 标题栏
            Row.linearGradient({
                angle: 135,
                colors: [['#4ECDC4', 0], ['#45B7AA', 1]]
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.width(40);
            Button.height(40);
            Button.backgroundColor(Color.Transparent);
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize(20);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('常见问题 FAQ');
            Text.fontSize(18);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Medium);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.width(40);
        }, Blank);
        Blank.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 搜索提示
            Row.create();
            // 搜索提示
            Row.width('100%');
            // 搜索提示
            Row.padding(15);
            // 搜索提示
            Row.backgroundColor('#1A1A1A');
            // 搜索提示
            Row.borderRadius(12);
            // 搜索提示
            Row.margin({ top: 10, bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🔍');
            Text.fontSize(16);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('  点击问题查看答案');
            Text.fontSize(14);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        // 搜索提示
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // FAQ列表
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.FAQItem.bind(this)(item.question, item.answer, index);
            };
            this.forEachUpdateFunction(elmtId, this.faqList, forEachItemGenFunction, (item: FAQItem, index: number) => index.toString(), true, true);
        }, ForEach);
        // FAQ列表
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    FAQItem(question: string, answer: string, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#1A1A1A');
            Column.borderRadius(12);
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 问题
            Row.create();
            // 问题
            Row.width('100%');
            // 问题
            Row.padding(15);
            // 问题
            Row.onClick(() => {
                this.expandedIndex = this.expandedIndex === index ? -1 : index;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${index + 1}. ${question}`);
            Text.fontSize(15);
            Text.fontColor('#FFFFFF');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.expandedIndex === index ? '▲' : '▼');
            Text.fontSize(12);
            Text.fontColor('#4ECDC4');
            Text.margin({ left: 10 });
        }, Text);
        Text.pop();
        // 问题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 答案
            if (this.expandedIndex === index) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding({ left: 15, right: 15, bottom: 15 });
                        Column.backgroundColor('#2A2A2A');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(answer);
                        Text.fontSize(14);
                        Text.fontColor('#CCCCCC');
                        Text.width('100%');
                        Text.lineHeight(22);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#33FFFFFF');
        }, Divider);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FAQPage";
    }
}
registerNamedRoute(() => new FAQPage(undefined, {}), "", { bundleName: "com.example.pedometerapp", moduleName: "entry", pagePath: "pages/FAQPage", pageFullPath: "entry/src/main/ets/pages/FAQPage", integratedHsp: "false", moduleType: "followWithHap" });
