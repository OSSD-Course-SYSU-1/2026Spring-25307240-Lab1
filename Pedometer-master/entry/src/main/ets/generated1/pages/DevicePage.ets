import { DeviceTitleModule } from '../view/DeviceTitleModule';
import { DeviceConnectionStatusModule } from '../view/DeviceConnectionStatusModule';
import { DeviceQuickAccessModule } from '../view/DeviceQuickAccessModule';
import { DeviceRecommendationModule } from '../view/DeviceRecommendationModule';

@Component
export struct DevicePage {
  private scroller: Scroller = new Scroller();

  build() {
    Scroll(this.scroller) {
      Column() {
        DeviceTitleModule()
        DeviceConnectionStatusModule()
        DeviceQuickAccessModule()
        DeviceRecommendationModule()
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.Off)
    .height("100%")
    .width('100%')
    .align(Alignment.Top)
    .backgroundColor($r('app.color.page_bg_color'))
  }
}