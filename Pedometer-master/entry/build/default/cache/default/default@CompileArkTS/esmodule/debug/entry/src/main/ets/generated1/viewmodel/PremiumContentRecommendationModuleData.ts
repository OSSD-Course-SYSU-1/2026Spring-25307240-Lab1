import LazyDataSource from "@normalized:N&&&entry/src/main/ets/generated1/util/LazyDataSource&";
export class Data {
    private static instance: Data;
    lazyDataSource: LazyDataSource<DataSource> = new LazyDataSource();
    static readonly IMAGES: Resource[] = [{ "id": -1, "type": -1, params: [('app.media.realImageGen_common_3')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_2')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_0')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_2')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_2')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_0')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_1')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }, { "id": -1, "type": -1, params: [('app.media.realImageGen_common_1')], "bundleName": "com.example.pedometerapp", "moduleName": "entry" }];
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
                modelList.push(new DataSource(Data.IMAGES[index]));
            }
            this.lazyDataSource.pushArrayData(modelList);
            resolve();
        });
    }
}
export class DataSource {
    private image: Resource;
    constructor(image: Resource) {
        this.image = image;
    }
    getImage(): Resource {
        return this.image;
    }
}
