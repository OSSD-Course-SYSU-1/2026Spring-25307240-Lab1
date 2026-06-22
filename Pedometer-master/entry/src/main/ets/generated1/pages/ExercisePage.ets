import { ExerciseHeaderModule } from '../view/ExerciseHeaderModule';
import { SportModeSelectionModule } from '../view/SportModeSelectionModule';
import { TrainingPlanCardModule } from '../view/TrainingPlanCardModule';
import { WorkoutStatsRingModule } from '../view/WorkoutStatsRingModule';
import { RecentWorkoutsModule } from '../view/RecentWorkoutsModule';

@Component
export struct ExercisePage {
  private scroller: Scroller = new Scroller();

  build() {
    Scroll(this.scroller) {
      Column() {
        ExerciseHeaderModule()
        SportModeSelectionModule()
        TrainingPlanCardModule()
        WorkoutStatsRingModule()
        RecentWorkoutsModule()
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