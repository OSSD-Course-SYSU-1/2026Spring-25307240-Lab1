import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated1/util/LazyDataSource&";
export class DataSource {
    private static instance: DataSource;
    lazyDataSource: LazyDataSource<DataSourceStyleAStyleA> = new LazyDataSource();
    static readonly IMAGES: Resource[] = [{ "id": 16777431, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777431, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly TITLES: string[] = ['健康运动', '快捷功能'];
    static readonly CONTENTS: string[] = ['添加您喜爱的快捷功能', '开始跑步'];
    static readonly PAGES: string[] = ['EmptyPagePathStack', 'EmptyPagePathStack'];
    constructor() {
    }
    public static getInstance(): DataSource {
        if (!DataSource.instance) {
            DataSource.instance =
                new DataSource();
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
            for (let index = 0; index < DataSource.IMAGES.length; index++) {
                modelList.push(new DataSourceStyleAStyleA(DataSource.IMAGES[index], DataSource.TITLES[index], DataSource.CONTENTS[index], DataSource.PAGES[index]));
            }
            this.lazyDataSource.pushArrayData(modelList);
            resolve();
        });
    }
}
export class DataSourceStyleAStyleA {
    private image: Resource;
    private title: string;
    private content: string;
    private page: string;
    constructor(image: Resource, title: string, content: string, page: string) {
        this.image = image;
        this.title = title;
        this.content = content;
        this.page = page;
    }
    getImage(): Resource {
        return this.image;
    }
    getTitle(): string {
        return this.title;
    }
    getContent(): string {
        return this.content;
    }
    getPage(): string {
        return this.page;
    }
}
