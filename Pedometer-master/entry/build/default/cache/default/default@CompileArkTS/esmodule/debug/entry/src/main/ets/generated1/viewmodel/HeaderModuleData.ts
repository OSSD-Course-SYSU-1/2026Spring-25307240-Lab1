import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated1/util/LazyDataSource&";
export class DataSourceStyleAStyleA {
    private icon: Resource;
    private title: string;
    constructor(icon: Resource, title: string) {
        this.icon = icon;
        this.title = title;
    }
    getIcon(): Resource {
        return this.icon;
    }
    getTitle(): string {
        return this.title;
    }
}
export class DataSource {
    private static instance: DataSource;
    lazyDataSource: LazyDataSource<DataSourceStyleAStyleA> = new LazyDataSource();
    private allItems: Array<DataSourceStyleAStyleA> = [];
    static readonly ICONS: Resource[] = [{ "id": 16777439, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777438, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777459, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly TITLES: string[] = ['今日', '搜索', '更多'];
    static readonly BANNER_IMAGE: Resource = { "id": -1, "type": -1, params: [('app.media.realImageGen_news_4')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" };
    constructor() {
    }
    public static getInstance(): DataSource {
        if (!DataSource.instance) {
            DataSource.instance = new DataSource();
        }
        return DataSource.instance;
    }
    /**
     * Data loaded on current view converts network data into rendering data
     */
    getResources(): Promise<void> {
        /**
         * use your web request here
         */
        return new Promise((resolve: Function) => {
            const modelList: Array<DataSourceStyleAStyleA> = [];
            for (let index = 0; index < DataSource.ICONS.length; index++) {
                modelList.push(new DataSourceStyleAStyleA(DataSource.ICONS[index], DataSource.TITLES[index]));
            }
            this.allItems = modelList;
            this.lazyDataSource.pushArrayData(modelList);
            resolve();
        });
    }
    getAllItems(): Array<DataSourceStyleAStyleA> {
        return this.allItems;
    }
    getBannerImage(): Resource {
        return DataSource.BANNER_IMAGE;
    }
}
