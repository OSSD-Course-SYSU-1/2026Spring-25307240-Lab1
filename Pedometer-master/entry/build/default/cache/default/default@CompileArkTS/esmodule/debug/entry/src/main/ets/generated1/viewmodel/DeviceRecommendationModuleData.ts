import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated1/util/LazyDataSource&";
export class Data {
    private static instance: Data;
    lazyDataSource: LazyDataSource<DataSource> = new LazyDataSource();
    static readonly IMAGES: Resource[] = [{ "id": -1, "type": -1, params: [('app.media.realImageGen_shop_6')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_shop_1')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
    static readonly TITLES: string[] = ['发现更多智能设备', '立即选购'];
    static readonly CONTENTS: string[] = ['发现更多智能设备', '立即选购'];
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
