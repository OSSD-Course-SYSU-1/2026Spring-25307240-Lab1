/*
 * 三项指标横向数据栏组件
 * 优化版：渐变背景、动画进度、更精致的视觉设计
 */

import { DesignSystem } from '../common/constants/DesignSystem';

@Component
export struct MetricsBar {
  @Prop calorieCurrent: number = 0;
  @Prop calorieGoal: number = 270;
  @Prop exerciseCurrent: number = 0;
  @Prop exerciseGoal: number = 25;
  @Prop hoursCurrent: number = 0;
  @Prop hoursGoal: number = 12;
  
  // 动画状态
  @State animatedCalorie: number = 0;
  @State animatedExercise: number = 0;
  @State animatedHours: number = 0;
  
  aboutToAppear(): void {
    // 启动数值动画
    this.animateValue('calorie', this.calorieCurrent);
    this.animateValue('exercise', this.exerciseCurrent);
    this.animateValue('hours', this.hoursCurrent);
  }
  
  private animateValue(type: string, target: number): void {
    setTimeout(() => {
      if (type === 'calorie') {
        this.animatedCalorie = target;
      } else if (type === 'exercise') {
        this.animatedExercise = target;
      } else if (type === 'hours') {
        this.animatedHours = target;
      }
    }, 100);
  }
  
  build() {
    Column() {
      Row() {
        // 活动热量（红色）
        this.MetricItem(
          DesignSystem.COLOR_PRIMARY,
          DesignSystem.COLOR_PRIMARY_LIGHT,
          '活动热量',
          this.animatedCalorie,
          this.calorieGoal,
          '千卡',
          '🔥'
        )
        
        // 锻炼时长（黄色）
        this.MetricItem(
          DesignSystem.COLOR_ACCENT,
          DesignSystem.COLOR_ACCENT_LIGHT,
          '锻炼时长',
          this.animatedExercise,
          this.exerciseGoal,
          '分钟',
          '⚡'
        )
        
        // 活动小时数（蓝色）
        this.MetricItem(
          DesignSystem.COLOR_INFO,
          DesignSystem.COLOR_INFO_LIGHT,
          '活动小时',
          this.animatedHours,
          this.hoursGoal,
          '小时',
          '⏱'
        )
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
    }
    .width('100%')
    .padding({ top: DesignSystem.SPACING_2XL, bottom: DesignSystem.SPACING_2XL, left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG })
  }
  
  @Builder
  MetricItem(color: string, lightColor: string, title: string, current: number, goal: number, unit: string, icon: string) {
    Column() {
      // 标题行（彩色圆点 + 标题）
      Row() {
        // 渐变圆点
        Stack() {
          Circle()
            .width(10)
            .height(10)
            .linearGradient({
              angle: 135,
              colors: [[color, 0], [lightColor, 1]]
            })
          
          // 内发光效果
          Circle()
            .width(6)
            .height(6)
            .fill(DesignSystem.withAlpha(color, 0.5))
            .blur(2)
        }
        .width(10)
        .height(10)
        
        Text(title)
          .fontSize(DesignSystem.FONT_SIZE_SM)
          .fontColor(DesignSystem.TEXT_SECONDARY)
          .margin({ left: DesignSystem.SPACING_SM })
      }
      .width('100%')
      .margin({ bottom: DesignSystem.SPACING_MD })
      
      // 数值行（当前值 / 目标值 + 单位）
      Row() {
        Text(`${Math.round(current)}`)
          .fontSize(DesignSystem.FONT_SIZE_2XL)
          .fontColor(DesignSystem.TEXT_PRIMARY)
          .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
          .animation({
            duration: DesignSystem.DURATION_NORMAL,
            curve: Curve.EaseOut
          })
        
        Text(' / ')
          .fontSize(DesignSystem.FONT_SIZE_LG)
          .fontColor(DesignSystem.TEXT_TERTIARY)
        
        Text(`${goal}`)
          .fontSize(DesignSystem.FONT_SIZE_LG)
          .fontColor(DesignSystem.TEXT_SECONDARY)
        
        Text(' ' + unit)
          .fontSize(DesignSystem.FONT_SIZE_SM)
          .fontColor(DesignSystem.TEXT_TERTIARY)
      }
      .width('100%')
      .alignItems(VerticalAlign.Bottom)
      
      // 进度条
      Stack({ alignContent: Alignment.Start }) {
        // 背景轨道
        Row()
          .width('100%')
          .height(3)
          .borderRadius(2)
          .backgroundColor(DesignSystem.BORDER_LIGHT)
        
        // 进度填充
        Row()
          .width(`${Math.min(100, (current / goal) * 100)}%`)
          .height(3)
          .borderRadius(2)
          .linearGradient({
            angle: 90,
            colors: [[color, 0], [lightColor, 1]]
          })
          .animation({
            duration: DesignSystem.DURATION_SLOW,
            curve: Curve.EaseOut
          })
      }
      .width('100%')
      .margin({ top: DesignSystem.SPACING_SM })
    }
    .layoutWeight(1)
    .alignItems(HorizontalAlign.Start)
  }
}
