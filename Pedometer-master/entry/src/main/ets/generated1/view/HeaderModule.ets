import {
  DataSource, DataSourceStyleAStyleA
} from '../viewmodel/HeaderModuleData';
import { LoadingStatus } from '../common/CommonEnums';
import { BreakpointConstants } from '../common/BreakpointConstants';
import { BreakpointType } from '../util/BreakpointType';
import { CommonConstants } from '../common/CommonConstants';

@Component
struct IconTextItem {
  @Consume('appPathStack') appPathStack: NavPathStack;
  @StorageLink('currentWidthBreakpoint') currentWidthBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;

  jump(pageName: string = 'EmptyPagePathStack'): void {
    this.appPathStack.pushPathByName(pageName, null);
  }

  private icon: Resource = $r('app.media.noImage');
  private title: string = "今日";
  private iconColor?: string = '#2D70F1';
  private iconSize: number = 32;

  build() {
    Column() {
      Image(this.icon)
        .width(this.iconSize)
        .height(this.iconSize)
        .fillColor(this.iconColor)
        .onClick(() => {
          this.jump()
        })
      Text(this.title)
        .fontColor($r('app.color.font_primary_Grid_BannerHorizontalTextFunctionItem'))
        .fontSize($r('app.integer.body_text_S'))
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .maxLines(1)
        .margin({ top: '5px' })
        .onClick(() => {
          this.jump()
        })
    }
    .alignItems(HorizontalAlign.Center)
    .width('100%')
  }
}

@Component
export struct HeaderModule {
  @Consume('appPathStack') appPathStack: NavPathStack;
  @StorageLink('currentWidthBreakpoint') currentWidthBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;
  @State functionModel: DataSource = DataSource.getInstance();
  @State items: Array<DataSourceStyleAStyleA> = [];
  @State loadingStatus: LoadingStatus = LoadingStatus.LOADING;
  @State rowHeight: number = 80;
  @State rowGap: number = 6;
  private columnGapArray: number[] = [6, 10, 12];
  private columnNumberArray: number[] = [3, 8, 8];
  private rowNumberArray: number[] = [1, 1, 1];

  aboutToAppear() {
    this.loadData();
  }

  async loadData() {
    try {
      this.loadingStatus = LoadingStatus.LOADING;
      await this.functionModel.getResources();
      this.loadingStatus = LoadingStatus.SUCCESS;
      this.items = this.functionModel.getAllItems();
    } catch (error) {
      this.loadingStatus = LoadingStatus.FAILED;
      console.error('Failed to load data:', error);
    }
  }

  jump(pageName: string = 'EmptyPagePathStack'): void {
    this.appPathStack.pushPathByName(pageName, null);
  }

  build() {
    Column() {
      Column() {
        Image(this.functionModel.getBannerImage())
          .objectFit(ImageFit.Fill)
      }
      .height(100)

      if (this.loadingStatus === LoadingStatus.SUCCESS) {
        Grid() {
          ForEach(this.items, (item: DataSourceStyleAStyleA) => {
            GridItem() {
              IconTextItem({
                icon: item.getIcon(),
                title: item.getTitle(),
                iconColor: '#2196F3'
              })
            }
          })
        }
        .columnsTemplate(("1fr ").repeat(new BreakpointType(this.columnNumberArray[0], this.columnNumberArray[1],
          this.columnNumberArray[2]).getValue(this.currentWidthBreakpoint)).trim())
        .rowsTemplate(("1fr ").repeat(new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1],
          this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint)).trim())
        .height(this.currentWidthBreakpoint !== BreakpointConstants.BREAKPOINT_LG ?
          (this.rowGap + this.rowHeight) * new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1],
            this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint) :
          (this.rowGap + this.rowHeight + 30) * new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1],
            this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint))
        .columnsGap(new BreakpointType(this.columnGapArray[0], this.columnGapArray[1],
          this.columnGapArray[2]).getValue(this.currentWidthBreakpoint))
        .rowsGap(this.rowGap)
      } else if (this.loadingStatus === LoadingStatus.FAILED) {
        Text('加载中...')
          .fontSize(14)
          .fontColor($r('app.color.font_secondary_Grid_BannerHorizontalTextFunctionItem'))
          .margin(16)
      } else {
        Text('加载失败，点击重试')
          .fontSize(14)
          .fontColor($r('app.color.font_secondary_Grid_BannerHorizontalTextFunctionItem'))
          .margin(16)
          .onClick(() => {
            this.loadData();
          })
      }
    }
    .width(CommonConstants.FULL_PERCENT)
    .height(180)
    .backgroundColor($r('app.color.comp_background_primary_trans'))
  }
}