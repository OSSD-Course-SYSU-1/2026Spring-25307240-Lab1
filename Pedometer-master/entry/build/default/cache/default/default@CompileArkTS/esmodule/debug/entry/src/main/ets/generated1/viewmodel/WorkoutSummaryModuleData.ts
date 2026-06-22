import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated1/util/LazyDataSource&";
export class Data {
    private static instance: Data;
    lazyDataSource: LazyDataSource<DataSource> = new LazyDataSource();
    static readonly TITLES1: string[] = ['总运动时长', '总消耗卡路里', '总运动次数'];
    static readonly DETAILS1: string[] = ['128小时45分钟', '15,680千卡', '89次'];
    static readonly IMAGES1: Resource[] = [{ "id": -1, "type": -1, params: [('app.media.realImageGen_common_2')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_3')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_1')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly IMAGE_DETAILS1: string[] = ['128小时45分钟', '15,680千卡', '89次'];
    static readonly TITLES2: string[] = ['今日运动', '本周目标', '本月成就'];
    static readonly DETAILS2: string[] = ['45分钟', '5小时/周', '达标'];
    static readonly IMAGES2: Resource[] = [{ "id": -1, "type": -1, params: [('app.media.realImageGen_common_1')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_1')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_1')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly IMAGE_DETAILS2: string[] = ['45分钟', '5小时/周', '达标'];
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
            for (let index = 0; index < Data.TITLES1.length; index++) {
                modelList.push(new DataSource(Data.TITLES1[index], Data.IMAGES1[index], Data.IMAGE_DETAILS1[index], Data.DETAILS1[index], Data.TITLES2[index], Data.IMAGES2[index], Data.IMAGE_DETAILS2[index], Data.DETAILS2[index]));
            }
            this.lazyDataSource.pushArrayData(modelList);
            resolve();
        });
    }
}
export class DataSource {
    private title1: string;
    private image1: Resource;
    private imageDetail1: string;
    private detail1: string;
    private title2: string;
    private image2: Resource;
    private imageDetail2: string;
    private detail2: string;
    constructor(title1: string, image1: Resource, imageDetail1: string, detail1: string, title2: string, image2: Resource, imageDetail2: string, detail2: string) {
        this.title1 = title1;
        this.image1 = image1;
        this.imageDetail1 = imageDetail1;
        this.detail1 = detail1;
        this.title2 = title2;
        this.image2 = image2;
        this.imageDetail2 = imageDetail2;
        this.detail2 = detail2;
    }
    getTitle1(): string {
        return this.title1;
    }
    getImage1(): Resource {
        return this.image1;
    }
    getImageDetail1(): string {
        return this.imageDetail1;
    }
    getDetail1(): string {
        return this.detail1;
    }
    getTitle2(): string {
        return this.title2;
    }
    getImage2(): Resource {
        return this.image2;
    }
    getImageDetail2(): string {
        return this.imageDetail2;
    }
    getDetail2(): string {
        return this.detail2;
    }
}
