import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated1/util/LazyDataSource&";
export class Data {
    private static instance: Data;
    lazyDataSource: LazyDataSource<DataSource> = new LazyDataSource();
    static readonly IMAGES: Resource[] = [{ "id": -1, "type": -1, params: [('app.media.realImageGen_common_1')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_0')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly MAIN_TEXT: string[] = ['40分钟有氧跑', '燃脂跑步课程'];
    static readonly SUB_TEXT: string[] = ['推荐训练', '今日计划'];
    static readonly DESCRIPTION_TEXT: string[] = ['课程时长40分钟，中等难度，预计燃烧300卡路里', '适合初学者的有氧跑步训练，有效提升心肺功能'];
    static readonly TAG_TEXTS_LIST: string[][] = [['40分钟', '中等难度', '300卡路里'], ['有氧运动', '跑步', '燃脂']];
    static readonly TAG_TEXT_COLORS_LIST: Color[][] = [[Color.Brown, Color.Green, Color.Gray], [Color.Brown, Color.Green, Color.Gray],
        [Color.Brown, Color.Green, Color.Gray], [Color.Brown, Color.Green, Color.Gray],
        [Color.Brown, Color.Green, Color.Gray], [Color.Brown, Color.Green, Color.Gray]];
    constructor() {
    }
    public static getInstance(): Data {
        if (!Data.instance) {
            Data.instance =
                new Data();
        }
        return Data.instance;
    }
    /**
     * Data loaded on current view converts network data into rendering data
     */
    getResources(): Promise<void> {
        /**
         * use your web request here
         */
        return new Promise((resolve: Function) => {
            const modelList: Array<DataSource> = [];
            for (let index = 0; index < Data.IMAGES.length; index++) {
                modelList.push(new DataSource(Data.IMAGES[index], Data.MAIN_TEXT[index], Data.SUB_TEXT[index], Data.DESCRIPTION_TEXT[index], Data.TAG_TEXTS_LIST[index], Data.TAG_TEXT_COLORS_LIST[index]));
            }
            this.lazyDataSource.pushArrayData(modelList);
            resolve();
        });
    }
}
export class DataSource {
    private image: Resource;
    private mainText: string;
    private subText: string;
    private descriptionText: string;
    private tagTextList: string[];
    private tagTextColorList: Color[];
    constructor(image: Resource, mainText: string, subText: string, descriptionText: string, tagTextList: string[], tagTextColorList: Color[]) {
        this.image = image;
        this.mainText = mainText;
        this.subText = subText;
        this.descriptionText = descriptionText;
        this.tagTextList = tagTextList;
        this.tagTextColorList = tagTextColorList;
    }
    getImage(): Resource {
        return this.image;
    }
    getMainText(): string {
        return this.mainText;
    }
    getSubText(): string {
        return this.subText;
    }
    getDescriptionText(): string {
        return this.descriptionText;
    }
    getTagTextList(): string[] {
        return this.tagTextList;
    }
    getTagTextColorList(): Color[] {
        return this.tagTextColorList;
    }
}
