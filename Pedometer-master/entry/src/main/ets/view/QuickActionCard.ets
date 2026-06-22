/*
 * 快捷操作横条卡片组件
 * 优化版：玻璃态效果、动画交互、更精致的按钮设计
 */

import { DesignSystem } from '../common/constants/DesignSystem';

@Component
export struct QuickActionCard {
  onStartRunning: () => void = () => {};
  @State isPressed: boolean = false;
  @State isHovered: boolean = false;
  
  build() {
    Row() {
      // 左区域：添加快捷功能
      Row() {
        // 白色圆形加号图标（带动画）
        Stack() {
          Circle()
            .width(DesignSystem.ICON_SIZE_XL)
            .height(DesignSystem.ICON_SIZE_XL)
            .fill(DesignSystem.TEXT_PRIMARY)
            .shadow({
              radius: 8,
              color: 'rgba(255, 255, 255, 0.3)',
              offsetX: 0,
              offsetY: 2
            })
          
          // 加号图标
          Column() {
            Row()
              .width(16)
              .height(2)
              .borderRadius(1)
              .backgroundColor(DesignSystem.BG_PRIMARY)
            Row()
              .width(2)
              .height(16)
              .borderRadius(1)
              .backgroundColor(DesignSystem.BG_PRIMARY)
              .position({ x: 19, y: 12 })
          }
          .width(DesignSystem.ICON_SIZE_XL)
          .height(DesignSystem.ICON_SIZE_XL)
        }
        .width(DesignSystem.ICON_SIZE_XL)
        .height(DesignSystem.ICON_SIZE_XL)
        
        Column() {
          Text('添加快捷功能')
            .fontSize(DesignSystem.FONT_SIZE_MD)
            .fontColor(DesignSystem.TEXT_SECONDARY)
          
          Text('个性化您的首页')
            .fontSize(DesignSystem.FONT_SIZE_XS)
            .fontColor(DesignSystem.TEXT_TERTIARY)
            .margin({ top: 2 })
        }
        .alignItems(HorizontalAlign.Start)
        .margin({ left: DesignSystem.SPACING_MD })
      }
      .layoutWeight(1)
      
      // 右区域：开始跑步按钮
      Button() {
        Row({ space: DesignSystem.SPACING_SM }) {
          // 跑步图标
          Stack() {
            Path()
              .width(18)
              .height(18)
              .commands('M9 2C9 2 7 4 7 6C7 8 8 9 9 9C10 9 11 8 11 6C11 4 9 2 9 2Z M5 11L9 9L13 11M9 9L9 18M5 14L9 12L13 14')
              .stroke(DesignSystem.TEXT_PRIMARY)
              .strokeWidth(1.5)
              .fill('transparent')
          }
          .width(24)
          .height(24)
          
          Text('开始跑步')
            .fontSize(DesignSystem.FONT_SIZE_MD)
            .fontColor(DesignSystem.TEXT_PRIMARY)
            .fontWeight(DesignSystem.FONT_WEIGHT_MEDIUM)
        }
      }
      .linearGradient({
        angle: 135,
        colors: [[DesignSystem.COLOR_PRIMARY, 0], [DesignSystem.COLOR_PRIMARY_LIGHT, 1]]
      })
      .borderRadius(DesignSystem.RADIUS_XL)
      .height(DesignSystem.BTN_HEIGHT_MD)
      .padding({ left: DesignSystem.SPACING_2XL, right: DesignSystem.SPACING_2XL })
      .shadow({
        radius: this.isPressed ? 4 : 12,
        color: DesignSystem.withAlpha(DesignSystem.COLOR_PRIMARY, this.isPressed ? 0.3 : 0.5),
        offsetX: 0,
        offsetY: this.isPressed ? 2 : 4
      })
      .scale({ x: this.isPressed ? 0.95 : 1, y: this.isPressed ? 0.95 : 1 })
      .animation({
        duration: DesignSystem.DURATION_FAST,
        curve: Curve.EaseOut
      })
      .onClick(() => {
        this.isPressed = true;
        setTimeout(() => {
          this.isPressed = false;
          this.onStartRunning();
        }, 100);
      })
    }
    .width('100%')
    .padding(DesignSystem.SPACING_LG)
    .linearGradient({
      angle: 135,
      colors: [['rgba(40, 40, 48, 0.7)', 0], ['rgba(50, 50, 58, 0.5)', 1]]
    })
    .borderRadius(DesignSystem.RADIUS_LG)
    .margin({ top: DesignSystem.SPACING_LG, left: DesignSystem.SPACING_LG, right: DesignSystem.SPACING_LG })
    .border({
      width: 1,
      color: DesignSystem.BORDER_LIGHT
    })
    .backdropBlur(20)
  }
}
