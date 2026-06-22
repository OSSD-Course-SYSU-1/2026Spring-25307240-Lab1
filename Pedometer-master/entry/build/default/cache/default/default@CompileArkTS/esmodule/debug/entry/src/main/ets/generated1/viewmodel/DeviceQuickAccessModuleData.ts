import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated1/util/LazyDataSource&";
export class Data {
    private static instance: Data;
    lazyDataSource: LazyDataSource<DataSource> = new LazyDataSource();
    static readonly ICONS: Resource[] = [{ "id": 16777462, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777450, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777448, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777442, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777446, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777454, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777441, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": 16777440, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly TITLES: string[] = ['表盘市场', '健康监测', '运动模式', '消息通知', '设备设置', '固件更新', '电量管理', '解绑设备'];
    static readonly DESCRIPTIONS: string[] = ['', '', '', '', '', '', '', ''];
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
