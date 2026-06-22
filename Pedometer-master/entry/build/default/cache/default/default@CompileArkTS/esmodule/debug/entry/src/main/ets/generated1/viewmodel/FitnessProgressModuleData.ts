import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated1/util/LazyDataSource&";
export class Data {
    private static instance: Data;
    lazyDataSource: LazyDataSource<DataSource> = new LazyDataSource();
    static readonly IMAGES: Resource[] = [{ "id": -1, "type": -1, params: [('app.media.realImageGen_common_3')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_1')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_2')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_3')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly MAIN_TEXT: string[] = ['2,408 / 20,000 步', '93 / 270 千卡', '2 / 25 分钟', '6 / 12 小时'];
    static readonly SUB_TEXT: string[] = ['活动热量', '锻炼时长', '活动小时数', '活动小时数'];
    static readonly DESCRIPTION_TEXT: string[] = ['今日步数统计', '消耗热量目标', '运动时间进度', '活动小时记录'];
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
                modelList.push(new DataSource(Data.IMAGES[index], Data.MAIN_TEXT[index], Data.SUB_TEXT[index], Data.DESCRIPTION_TEXT[index]));
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
    constructor(image: Resource, mainText: string, subText: string, descriptionText: string) {
        this.image = image;
        this.mainText = mainText;
        this.subText = subText;
        this.descriptionText = descriptionText;
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
}
