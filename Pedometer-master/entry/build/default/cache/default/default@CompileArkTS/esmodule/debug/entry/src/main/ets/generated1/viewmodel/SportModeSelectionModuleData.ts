import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated1/util/LazyDataSource&";
export class Data {
    private static instance: Data;
    lazyDataSource: LazyDataSource<DataSource> = new LazyDataSource();
    static readonly ICONS: Resource[] = [{ "id": 16777447, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777452, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777444, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777456, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777450, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777460, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly TITLES: string[] = ['跑步', '骑行', '游泳', '瑜伽', '健身', '徒步'];
    static readonly DESCRIPTIONS: string[] = ['', '', '', '', '', ''];
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
            for (let index = 0; index < Data.ICONS.length; index++) {
                modelList.push(new DataSource(Data.ICONS[index], Data.TITLES[index], Data.DESCRIPTIONS[index]));
            }
            this.lazyDataSource.pushArrayData(modelList);
            resolve();
        });
    }
}
export class DataSource {
    private icon: Resource;
    private title: string;
    private description: string;
    constructor(icon: Resource, title: string, description: string) {
        this.icon = icon;
        this.title = title;
        this.description = description;
    }
    getIcon(): Resource {
        return this.icon;
    }
    getTitle(): string {
        return this.title;
    }
    getDescription(): string {
        return this.description;
    }
}
