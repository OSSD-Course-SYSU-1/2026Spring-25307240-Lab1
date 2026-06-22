/*
 * 2×2网格功能卡片区组件
 * 优化版：玻璃态卡片、渐变装饰、动画效果
 */

import { DesignSystem } from '../common/constants/DesignSystem';

@Component
export struct FeatureGrid {
  onStartExercise: () => void = () => {};
  @State pressedCard: number = -1;
  
  build() {
    Column() {
      // 第一行
      Row() {
        this.ExerciseRecordCard()
        this.TrainingRecommendCard()
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
      .margin({ bottom: DesignSystem.SPACING_MD })
      
      // 第二行
      Row() {
        this.SleepCard()
        this.HeartHealthCard()
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
    }
    .width('100%')
    .padding({ left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG, top: DesignSystem.SPACING_LG })
  }
  
  @Builder
  ExerciseRecordCard() {
    Column() {
      // 顶部装饰渐变
      Row()
        .width('100%')
        .height(3)
        .linearGradient({
          angle: 90,
          colors: [[DesignSystem.COLOR_PRIMARY, 0], [DesignSystem.COLOR_PRIMARY_LIGHT, 1]]
        })
        .borderRadius({ topLeft: DesignSystem.RADIUS_LG, topRight: DesignSystem.RADIUS_LG })
      
      Column() {
        Row() {
          Text('运动记录')
            .fontSize(DesignSystem.FONT_SIZE_LG)
            .fontColor(DesignSystem.TEXT_PRIMARY)
            .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
          
          Blank()
          
          // 火焰图标
          Text('🔥')
            .fontSize(DesignSystem.FONT_SIZE_LG)
        }
        .width('100%')
        
        Text('1公里跑步')
          .fontSize(DesignSystem.FONT_SIZE_SM)
          .fontColor(DesignSystem.TEXT_SECONDARY)
          .alignSelf(ItemAlign.Start)
          .margin({ top: DesignSystem.SPACING_XS })
        
        Blank()
        
        Button('开始运动')
          .fontSize(DesignSystem.FONT_SIZE_SM)
          .linearGradient({
            angle: 135,
            colors: [[DesignSystem.COLOR_PRIMARY, 0], [DesignSystem.COLOR_PRIMARY_LIGHT, 1]]
          })
          .fontColor(DesignSystem.TEXT_PRIMARY)
          .borderRadius(DesignSystem.RADIUS_LG)
          .height(DesignSystem.BTN_HEIGHT_SM)
          .alignSelf(ItemAlign.Start)
          .onClick(() => {
            this.onStartExercise();
          })
      }
      .padding(DesignSystem.SPACING_MD)
      .alignItems(HorizontalAlign.Start)
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .width('45%')
    .height(130)
    .backgroundColor(DesignSystem.BG_CARD_SOLID)
    .borderRadius(DesignSystem.RADIUS_LG)
    .border({
      width: 1,
      color: DesignSystem.BORDER_LIGHT
    })
    .shadow({
      radius: 8,
      color: 'rgba(0, 0, 0, 0.2)',
      offsetX: 0,
      offsetY: 4
    })
    .scale({ x: this.pressedCard === 0 ? 0.95 : 1, y: this.pressedCard === 0 ? 0.95 : 1 })
    .animation({
      duration: DesignSystem.DURATION_FAST,
      curve: Curve.EaseOut
    })
    .onClick(() => {
      this.pressedCard = 0;
      setTimeout(() => {
        this.pressedCard = -1;
        this.onStartExercise();
      }, 100);
    })
  }
  
  @Builder
  TrainingRecommendCard() {
    Column() {
      // 顶部装饰渐变
      Row()
        .width('100%')
        .height(3)
        .linearGradient({
          angle: 90,
          colors: [[DesignSystem.COLOR_ACCENT, 0], [DesignSystem.COLOR_ACCENT_LIGHT, 1]]
        })
        .borderRadius({ topLeft: DesignSystem.RADIUS_LG, topRight: DesignSystem.RADIUS_LG })
      
      Column() {
        Row() {
          Text('40分钟有氧跑')
            .fontSize(DesignSystem.FONT_SIZE_LG)
            .fontColor(DesignSystem.TEXT_PRIMARY)
            .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
            .layoutWeight(1)
          
          Text('×')
            .fontSize(DesignSystem.FONT_SIZE_LG)
            .fontColor(DesignSystem.TEXT_TERTIARY)
        }
        .width('100%')
        
        Text('带你越跑越轻松！')
          .fontSize(DesignSystem.FONT_SIZE_SM)
          .fontColor(DesignSystem.TEXT_SECONDARY)
          .alignSelf(ItemAlign.Start)
          .margin({ top: DesignSystem.SPACING_XS })
        
        Blank()
        
        Row() {
          Text('即刻开练')
            .fontSize(DesignSystem.FONT_SIZE_SM)
            .fontColor(DesignSystem.COLOR_ACCENT)
            .fontWeight(DesignSystem.FONT_WEIGHT_MEDIUM)
          
          Text(' →')
            .fontSize(DesignSystem.FONT_SIZE_SM)
            .fontColor(DesignSystem.COLOR_ACCENT)
        }
        .alignSelf(ItemAlign.Start)
      }
      .padding(DesignSystem.SPACING_MD)
      .alignItems(HorizontalAlign.Start)
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .width('45%')
    .height(130)
    .backgroundColor(DesignSystem.BG_CARD_SOLID)
    .borderRadius(DesignSystem.RADIUS_LG)
    .border({
      width: 1,
      color: DesignSystem.BORDER_LIGHT
    })
    .shadow({
      radius: 8,
      color: 'rgba(0, 0, 0, 0.2)',
      offsetX: 0,
      offsetY: 4
    })
  }
  
  @Builder
  SleepCard() {
    Column() {
      // 顶部装饰渐变
      Row()
        .width('100%')
        .height(3)
        .linearGradient({
          angle: 90,
          colors: [[DesignSystem.COLOR_INFO, 0], [DesignSystem.COLOR_INFO_LIGHT, 1]]
        })
        .borderRadius({ topLeft: DesignSystem.RADIUS_LG, topRight: DesignSystem.RADIUS_LG })
      
      Column() {
        Row() {
          Text('睡眠')
            .fontSize(DesignSystem.FONT_SIZE_LG)
            .fontColor(DesignSystem.TEXT_PRIMARY)
            .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
          
          Blank()
          
          Text('🌙')
            .fontSize(DesignSystem.FONT_SIZE_LG)
        }
        .width('100%')
        
        Blank()
        
        Row() {
          Text('6')
            .fontSize(DesignSystem.FONT_SIZE_3XL)
            .fontColor(DesignSystem.TEXT_PRIMARY)
            .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
          
          Text('小时')
            .fontSize(DesignSystem.FONT_SIZE_MD)
            .fontColor(DesignSystem.TEXT_SECONDARY)
            .margin({ left: DesignSystem.SPACING_XS })
          
          Text('35')
            .fontSize(DesignSystem.FONT_SIZE_3XL)
            .fontColor(DesignSystem.TEXT_PRIMARY)
            .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
            .margin({ left: DesignSystem.SPACING_MD })
          
          Text('分钟')
            .fontSize(DesignSystem.FONT_SIZE_MD)
            .fontColor(DesignSystem.TEXT_SECONDARY)
            .margin({ left: DesignSystem.SPACING_XS })
        }
        .alignItems(VerticalAlign.Bottom)
      }
      .padding(DesignSystem.SPACING_MD)
      .alignItems(HorizontalAlign.Start)
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .width('45%')
    .height(130)
    .backgroundColor(DesignSystem.BG_CARD_SOLID)
    .borderRadius(DesignSystem.RADIUS_LG)
    .border({
      width: 1,
      color: DesignSystem.BORDER_LIGHT
    })
    .shadow({
      radius: 8,
      color: 'rgba(0, 0, 0, 0.2)',
      offsetX: 0,
      offsetY: 4
    })
  }
  
  @Builder
  HeartHealthCard() {
    Column() {
      // 顶部装饰渐变
      Row()
        .width('100%')
        .height(3)
        .linearGradient({
          angle: 90,
          colors: [[DesignSystem.COLOR_SUCCESS, 0], [DesignSystem.COLOR_SUCCESS_LIGHT, 1]]
        })
        .borderRadius({ topLeft: DesignSystem.RADIUS_LG, topRight: DesignSystem.RADIUS_LG })
      
      Column() {
        Row() {
          Text('心脏健康')
            .fontSize(DesignSystem.FONT_SIZE_LG)
            .fontColor(DesignSystem.TEXT_PRIMARY)
            .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
          
          Blank()
          
          Text('❤️')
            .fontSize(DesignSystem.FONT_SIZE_LG)
        }
        .width('100%')
        
        Blank()
        
        Column() {
          Text('心率监测')
            .fontSize(DesignSystem.FONT_SIZE_SM)
            .fontColor(DesignSystem.TEXT_SECONDARY)
          
          Text('心电图解读')
            .fontSize(DesignSystem.FONT_SIZE_SM)
            .fontColor(DesignSystem.TEXT_TERTIARY)
            .margin({ top: DesignSystem.SPACING_XS })
        }
        .alignItems(HorizontalAlign.Start)
      }
      .padding(DesignSystem.SPACING_MD)
      .alignItems(HorizontalAlign.Start)
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .width('45%')
    .height(130)
    .backgroundColor(DesignSystem.BG_CARD_SOLID)
    .borderRadius(DesignSystem.RADIUS_LG)
    .border({
      width: 1,
      color: DesignSystem.BORDER_LIGHT
    })
    .shadow({
      radius: 8,
      color: 'rgba(0, 0, 0, 0.2)',
      offsetX: 0,
      offsetY: 4
    })
  }
}
