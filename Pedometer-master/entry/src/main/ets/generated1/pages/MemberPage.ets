import { MembershipOverviewModule } from '../view/MembershipOverviewModule';
import { MemberPrivilegeIconModule } from '../view/MemberPrivilegeIconModule';
import { PremiumContentRecommendationModule } from '../view/PremiumContentRecommendationModule';
import { MemberServiceModule } from '../view/MemberServiceModule';

@Component
export struct MemberPage {
  private scroller: Scroller = new Scroller();

  build() {
    Scroll(this.scroller) {
      Column() {
        MembershipOverviewModule()
        MemberPrivilegeIconModule()
        PremiumContentRecommendationModule()
        MemberServiceModule()
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