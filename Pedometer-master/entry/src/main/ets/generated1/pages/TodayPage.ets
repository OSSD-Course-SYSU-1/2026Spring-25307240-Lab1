import { HeaderModule } from '../view/HeaderModule';
import { FitnessProgressModule } from '../view/FitnessProgressModule';
import { QuickActionModule } from '../view/QuickActionModule';
import { HealthFeatureCardModule } from '../view/HealthFeatureCardModule';

@Component
export struct TodayPage {
  private scroller: Scroller = new Scroller();

  build() {
    Scroll(this.scroller) {
      Column() {
        HeaderModule()
        FitnessProgressModule()
        QuickActionModule()
        HealthFeatureCardModule()
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