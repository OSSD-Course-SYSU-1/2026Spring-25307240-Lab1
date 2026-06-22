import { FitnessDataDisplayModule } from '../view/FitnessDataDisplayModule';
import { ExerciseDataStatisticsModule } from '../view/ExerciseDataStatisticsModule';
import { DailyStepHistoryModule } from '../view/DailyStepHistoryModule';
import { QuickActionModule } from '../view/QuickActionModule';

@Component
export struct StepCounter {
  private scroller: Scroller = new Scroller();

  build() {
    Scroll(this.scroller) {
      Column() {
        FitnessDataDisplayModule()
        ExerciseDataStatisticsModule()
        DailyStepHistoryModule()
        QuickActionModule()
      }
      .width('100%')
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.Off)
    .width('100%')
    .height('100%')
    .align(Alignment.Top)
    .backgroundColor($r('app.color.page_bg_color'))
  }
}