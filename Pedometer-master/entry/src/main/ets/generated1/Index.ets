import { PageMap } from './detail/SecondPageBuilder'
import { BreakpointConstants } from './common/BreakpointConstants';
import { CommonConstants } from './common/CommonConstants';
import { TodayPage } from './pages/TodayPage';
import { ExercisePage } from './pages/ExercisePage';
import { MemberPage } from './pages/MemberPage';
import { DevicePage } from './pages/DevicePage';
import { MyPage } from './pages/MyPage';

@Entry
@Component
struct Index {
  @State currentIndex: number = 0;
  private tabsController: TabsController = new TabsController();
  @Provide('appPathStack') appPathStack: NavPathStack = new NavPathStack();
  @StorageLink('currentWidthBreakpoint') currentWidthBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;

  @Builder
  tabBuilder(title: string, targetIndex: number, icon: Resource) {
    Column() {
      Image(icon)
        .width("24vp")
        .height("24vp")
        .objectFit(ImageFit.Contain)
        .fillColor(this.currentIndex === targetIndex ? ($r('app.color.app_icon_pressed_color')) :
          ($r('app.color.app_icon_color')))
      Text(title)
        .fontSize("10vp")
        .fontColor(this.currentIndex === targetIndex ? ($r('app.color.app_icon_pressed_color')) :
          ($r('app.color.app_icon_color')))
        .textAlign(TextAlign.Center)
        .lineHeight("14vp")
        .fontWeight(500)
    }
    .height(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG ? "100vp" : CommonConstants.FULL_PERCENT)
    .width('100%')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .onClick(() => {
      this.currentIndex = targetIndex;
      this.tabsController.changeIndex(targetIndex);
    })
  }

  build() {
    Navigation(this.appPathStack) {
      Tabs({
        barPosition: this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG ? BarPosition.Start :
          BarPosition.End,
        controller: this.tabsController
      }) {
        TabContent() {
          TodayPage()
        }.tabBar(this.tabBuilder('今日', 0, $r("app.media.lib_icon_111")))

        TabContent() {
          ExercisePage()
        }.tabBar(this.tabBuilder('锻炼', 1, $r("app.media.lib_icon_7")))

        TabContent() {
          MemberPage()
        }.tabBar(this.tabBuilder('会员', 2, $r("app.media.lib_icon_0")))

        TabContent() {
          DevicePage()
        }.tabBar(this.tabBuilder('设备', 3, $r("app.media.lib_icon_2")))

        TabContent() {
          MyPage()
        }.tabBar(this.tabBuilder('我的', 4, $r("app.media.lib_icon_9")))
      }
      .barWidth(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG ? "96vp" :
        CommonConstants.FULL_PERCENT)
      .barHeight(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG ? CommonConstants.FULL_PERCENT :
        "76vp")
      .barMode(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG ? BarMode.Scrollable : BarMode.Fixed,
        { nonScrollableLayoutStyle: LayoutStyle.ALWAYS_CENTER })
      .vertical(this.currentWidthBreakpoint === BreakpointConstants.BREAKPOINT_LG)
      .scrollable(false)
      .width('100%')
      .height('100%')
    }
    .backgroundColor($r('app.color.page_bg_color'))
    .navDestination(PageMap)
    .hideTitleBar(true)
    .mode(NavigationMode.Stack)
  }
}