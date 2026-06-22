import LazyDataSource from '../util/LazyDataSource';

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
  static readonly ICONS: Resource[] =
    [$r('app.media.lib_icon_111'), $r('app.media.lib_icon_103'), $r('app.media.lib_icon_7')];
  static readonly TITLES: string[] = ['今日', '搜索', '更多'];
  static readonly BANNER_IMAGE: Resource = $r(('app.media.realImageGen_news_4'));

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
        modelList.push(new DataSourceStyleAStyleA(
          DataSource.ICONS[index],
          DataSource.TITLES[index]
        ));
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