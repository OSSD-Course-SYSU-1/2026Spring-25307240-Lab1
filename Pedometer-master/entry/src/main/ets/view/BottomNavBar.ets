/*
 * 底部导航栏组件
 * 优化版：精致图标、动画效果、更好的视觉层次
 */

import { DesignSystem } from '../common/constants/DesignSystem';

// 定义Tab项接口
interface TabItem {
  icon: string;
  activeIcon: string;
  label: string;
}

@Component
export struct BottomNavBar {
  @State currentTab: number = 0;
  @State hoverIndex: number = -1;
  
  private tabs: TabItem[] = [
    { icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z M5 7h10M5 11h10M5 15h6', 
      activeIcon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z M5 7h10v2H5V7z M5 11h10v2H5v-2z M5 15h6v2H5v-2z',
      label: '今日' },
    { icon: 'M13 3c0 0-3 2-3 5s3 5 3 5 M11 8c0 0-2 1-2 3s2 3 2 3 M9 3v18 M15 3v18 M9 10h6 M9 14h6',
      activeIcon: 'M13 3c0 0-3 2-3 5s3 5 3 5 M11 8c0 0-2 1-2 3s2 3 2 3 M9 3v18 M15 3v18 M9 10h6 M9 14h6',
      label: '锻炼' },
    { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      activeIcon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      label: '会员' },
    { icon: 'M12 7a2 2 0 100 4 2 2 0 000-4z M12 3a9 9 0 100 18 9 9 0 000-18z M12 11v6',
      activeIcon: 'M12 7a2 2 0 100 4 2 2 0 000-4z M12 3a9 9 0 100 18 9 9 0 000-18z M12 11v6',
      label: '设备' },
    { icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z',
      activeIcon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z',
      label: '我的' }
  ];
  
  build() {
    Row() {
      ForEach(this.tabs, (tab: TabItem, index: number) => {
        this.TabItem(index, tab)
      }, (tab: TabItem, index: number) => index.toString())
    }
    .width('100%')
    .height(DesignSystem.NAV_HEIGHT)
    .linearGradient({
      angle: 180,
      colors: [['rgba(20, 20, 26, 0.95)', 0], ['rgba(30, 30, 38, 0.98)', 1]]
    })
    .justifyContent(FlexAlign.SpaceEvenly)
    .padding({ top: DesignSystem.SPACING_SM, bottom: DesignSystem.SPACING_SM })
    .shadow({
      radius: 20,
      color: 'rgba(0, 0, 0, 0.5)',
      offsetX: 0,
      offsetY: -4
    })
  }
  
  @Builder
  TabItem(index: number, tab: TabItem) {
    Column() {
      // 图标容器
      Stack() {
        // 激活时的背景光晕
        if (this.currentTab === index) {
          Circle()
            .width(40)
            .height(40)
            .fill(DesignSystem.withAlpha(DesignSystem.COLOR_PRIMARY, 0.15))
            .scale({ x: this.currentTab === index ? 1 : 0, y: this.currentTab === index ? 1 : 0 })
            .animation({
              duration: DesignSystem.DURATION_NORMAL,
              curve: Curve.EaseOut
            })
        }
        
        // 图标
        Path()
          .width(24)
          .height(24)
          .commands(this.currentTab === index ? tab.activeIcon : tab.icon)
          .stroke(this.currentTab === index ? DesignSystem.COLOR_PRIMARY : DesignSystem.TEXT_SECONDARY)
          .strokeWidth(this.currentTab === index ? 2.5 : 2)
          .fill(this.currentTab === index ? DesignSystem.withAlpha(DesignSystem.COLOR_PRIMARY, 0.3) : 'transparent')
      }
      .width(40)
      .height(28)
      
      // 标签
      Text(tab.label)
        .fontSize(DesignSystem.FONT_SIZE_XS)
        .fontColor(this.currentTab === index ? DesignSystem.COLOR_PRIMARY : DesignSystem.TEXT_SECONDARY)
        .fontWeight(this.currentTab === index ? FontWeight.Medium : FontWeight.Normal)
        .margin({ top: 2 })
        .scale({ x: this.currentTab === index ? 1.05 : 1, y: this.currentTab === index ? 1.05 : 1 })
        .animation({
          duration: DesignSystem.DURATION_FAST,
          curve: Curve.EaseOut
        })
    }
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      if (this.currentTab !== index) {
        this.currentTab = index;
      }
    })
  }
}
