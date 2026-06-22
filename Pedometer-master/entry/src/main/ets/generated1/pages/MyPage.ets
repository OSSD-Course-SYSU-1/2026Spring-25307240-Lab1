import { UserProfileModule } from '../view/UserProfileModule';
import { FeatureEntryModule } from '../view/FeatureEntryModule';
import { WorkoutSummaryModule } from '../view/WorkoutSummaryModule';
import { CouponActivityModule } from '../view/CouponActivityModule';

@Component
export struct MyPage {
  private scroller: Scroller = new Scroller();

  build() {
    Scroll(this.scroller) {
      Column() {
        UserProfileModule()
        FeatureEntryModule()
        WorkoutSummaryModule()
        CouponActivityModule()
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