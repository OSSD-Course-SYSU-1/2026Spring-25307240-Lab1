import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated/util/LazyDataSource&";
export class Data {
    private static instance: Data;
    lazyDataSource: LazyDataSource<DataSource> = new LazyDataSource();
    static readonly IMAGES: Resource[] = [{ "id": -1, "type": -1, params: [('app.media.realImageGen_common_0')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_3')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_1')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly MAIN_TEXT: string[] = ['本周步数趋势', '平均步数', '运动时长'];
    static readonly SUB_TEXT: string[] = ['12,345步', '8,765步', '2小时15分钟'];
    static readonly DESCRIPTION_TEXT: string[] = ['较上周增长5%', '每日平均步数统计', '本周累计运动时间'];
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
