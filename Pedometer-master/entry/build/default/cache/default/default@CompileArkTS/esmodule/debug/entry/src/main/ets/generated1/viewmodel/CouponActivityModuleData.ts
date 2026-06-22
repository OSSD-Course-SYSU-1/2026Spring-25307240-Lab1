import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated1/util/LazyDataSource&";
export class Data {
    private static instance: Data;
    lazyDataSource: LazyDataSource<DataSource> = new LazyDataSource();
    static readonly IMAGES: Resource[] = [{ "id": 16777465, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777466, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777467, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777465, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly TITLES: string[] = ['优惠券', '活动', '运动装备', '课程推荐'];
    static readonly CONTENTS: string[] = ['您有3张优惠券待使用', '近期活动：夏日健身挑战赛', '专业跑鞋限时8折', '瑜伽入门课程仅需99元'];
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
            for (let index = 0; index < Data.TITLES.length; index++) {
                modelList.push(new DataSource(Data.IMAGES[index], Data.TITLES[index], Data.CONTENTS[index]));
            }
            this.lazyDataSource.pushArrayData(modelList);
            resolve();
        });
    }
}
export class DataSource {
    private image: Resource;
    private title: string;
    private content: string;
    constructor(image: Resource, title: string, content: string) {
        this.image = image;
        this.title = title;
        this.content = content;
    }
    getTitle(): string {
        return this.title;
    }
    getContent(): string {
        return this.content;
    }
    getImage(): Resource {
        return this.image;
    }
}
