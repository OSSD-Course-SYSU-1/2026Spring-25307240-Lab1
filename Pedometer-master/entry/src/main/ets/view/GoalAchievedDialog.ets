/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CommonConstants } from '../common/constants/CommonConstants';
import { DialogData } from '../common/types/Types';
import curves from '@ohos.curves';

/**
 * 目标达成弹窗组件
 * 
 * 功能说明:
 * 1. 当用户达成每日步数目标时弹出
 * 2. 显示庆祝动画和达成信息
 * 3. 显示今日运动数据统计
 * 4. 支持分享到社交媒体
 * 
 * 使用的HarmonyOS API:
 * - CustomDialogController: 自定义弹窗控制器
 * - UIContext: UI上下文，用于获取弹窗控制器
 */
@CustomDialog
export struct GoalAchievedDialog {
  @Prop steps: number = 0;           // 完成的步数
  @Prop goal: number = 0;            // 目标步数
  @Prop calories: number = 0;        // 消耗的卡路里
  @Prop distance: number = 0;        // 运动距离（米）
  @Prop duration: number = 0;        // 运动时长（分钟）
  
  // 动画状态
  @State private scaleValue: number = 0;
  @State private opacityValue: number = 0;
  @State private confettiY: number = 0;
  
  // 回调函数
  cancel?: () => void;
  confirm?: () => void;
  share?: () => void;
  
  // 弹窗控制器
  controller: CustomDialogController;

  aboutToAppear() {
    // 启动入场动画
    this.startAnimation();
  }

  /**
   * 启动入场动画
   */
  private startAnimation(): void {
    // 缩放动画
    animateTo({
      duration: 500,
      curve: curves.springMotion(0.6, 0.8),
      onFinish: () => {
        // 启动彩带动画
        this.animateConfetti();
      }
    }, () => {
      this.scaleValue = 1;
      this.opacityValue = 1;
    });
  }

  /**
   * 彩带下落动画
   */
  private animateConfetti(): void {
    animateTo({
      duration: 2000,
      curve: Curve.EaseOut,
      iterations: 1
    }, () => {
      this.confettiY = 100;
    });
  }

  build() {
    Column() {
      // 彩带效果（简化版）
      this.ConfettiEffect()
      
      // 主要内容
      Column() {
        // 庆祝图标
        this.CelebrationIcon()
        
        // 恭喜文字
        Text('恭喜达成目标！')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ top: 15, bottom: 10 })

        // 完成信息
        Text(`您今日已完成 ${this.steps} 步`)
          .fontSize(16)
          .fontColor('#666666')
          .margin({ bottom: 20 })

        // 数据统计卡片
        this.StatsCard()

        // 按钮区域
        this.ButtonArea()
      }
      .width('85%')
      .padding(25)
      .backgroundColor(Color.White)
      .borderRadius(20)
      .shadow({
        radius: 20,
        color: 'rgba(0, 0, 0, 0.15)',
        offsetX: 0,
        offsetY: 5
      })
      .scale({ x: this.scaleValue, y: this.scaleValue })
      .opacity(this.opacityValue)
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .backgroundColor('rgba(0, 0, 0, 0.4)')
  }

  /**
   * 彩带效果组件
   */
  @Builder
  ConfettiEffect() {
    // 简化的彩带效果，使用多个小圆形模拟
    Stack() {
      ForEach([1, 2, 3, 4, 5, 6, 7, 8], (item: number) => {
        Circle()
          .width(8)
          .height(8)
          .fill(this.getConfettiColor(item))
          .position({
            x: `${10 + item * 10}%`,
            y: this.confettiY
          })
          .opacity(0.8)
      })
    }
    .width('100%')
    .height(100)
  }

  /**
   * 获取彩带颜色
   */
  private getConfettiColor(index: number): string {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA'];
    return colors[(index - 1) % colors.length];
  }

  /**
   * 庆祝图标组件
   */
  @Builder
  CelebrationIcon() {
    Stack() {
      // 外圈光晕
      Circle()
        .width(80)
        .height(80)
        .fill('rgba(78, 205, 196, 0.2)')
      
      // 内圈
      Circle()
        .width(60)
        .height(60)
        .fill('#4ECDC4')
      
      // 奖杯图标（使用文字代替）
      Text('🏆')
        .fontSize(30)
    }
    .width(80)
    .height(80)
  }

  /**
   * 数据统计卡片
   */
  @Builder
  StatsCard() {
    Column() {
      Row() {
        this.StatItem('目标', this.goal.toString(), '步')
        Divider().vertical(true).height(30).color('#E0E0E0')
        this.StatItem('实际', this.steps.toString(), '步')
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
      .margin({ bottom: 15 })

      Row() {
        this.StatItem('卡路里', this.calories.toFixed(1), '千卡')
        Divider().vertical(true).height(30).color('#E0E0E0')
        this.StatItem('距离', this.formatDistance(this.distance), '')
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
    }
    .width('100%')
    .padding(15)
    .backgroundColor('#F5F5F5')
    .borderRadius(10)
  }

  /**
   * 统计项组件
   */
  @Builder
  StatItem(label: string, value: string, unit: string) {
    Column() {
      Text(label)
        .fontSize(12)
        .fontColor('#999999')
        .margin({ bottom: 3 })

      Row() {
        Text(value)
          .fontSize(16)
          .fontColor('#333333')
          .fontWeight(FontWeight.Medium)

        if (unit) {
          Text(unit)
            .fontSize(10)
            .fontColor('#999999')
            .margin({ left: 2 })
        }
      }
    }
  }

  /**
   * 按钮区域
   */
  @Builder
  ButtonArea() {
    Row() {
      // 关闭按钮
      Button('关闭')
        .width('40%')
        .height(40)
        .fontSize(14)
        .fontColor('#666666')
        .backgroundColor('#F0F0F0')
        .borderRadius(20)
        .onClick(() => {
          this.controller.close();
          if (this.cancel) {
            this.cancel();
          }
        })

      // 分享按钮
      Button('分享成就')
        .width('40%')
        .height(40)
        .fontSize(14)
        .fontColor(Color.White)
        .backgroundColor('#4ECDC4')
        .borderRadius(20)
        .onClick(() => {
          this.controller.close();
          if (this.share) {
            this.share();
          }
        })
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .margin({ top: 20 })
  }

  /**
   * 格式化距离
   */
  private formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${Math.round(meters)}米`;
    } else {
      return `${(meters / 1000).toFixed(2)}公里`;
    }
  }
}

/**
 * 目标达成弹窗管理器
 * 用于在主页面中控制弹窗的显示
 */
export class GoalAchievedDialogManager {
  private dialogController: CustomDialogController | null = null;
  private hasShown: boolean = false; // 防止重复显示

  /**
   * 显示目标达成弹窗
   * 
   * @param uiContext UI上下文
   * @param data 弹窗数据
   */
  show(uiContext: UIContext, data: DialogData): void {
    // 如果已经显示过，不再重复显示
    if (this.hasShown) {
      return;
    }

    this.hasShown = true;
    
    this.dialogController = new CustomDialogController({
      builder: GoalAchievedDialog({
        steps: data.steps,
        goal: data.goal,
        calories: data.calories,
        distance: data.distance,
        duration: data.duration,
        cancel: () => {
          this.hasShown = false;
        },
        share: () => {
          this.handleShare(data);
        }
      }),
      autoCancel: false,
      customStyle: true,
      alignment: DialogAlignment.Center
    });

    this.dialogController.open();
  }

  /**
   * 处理分享
   * 可以扩展为分享到社交媒体
   */
  private handleShare(data: DialogData): void {
    // 构建分享内容
    const shareText = `我今天走了${data.steps}步，消耗${data.calories.toFixed(1)}千卡，达成运动目标！`;
    
    // 这里可以调用系统分享API
    // 目前使用Toast提示
    console.info('Share content:', shareText);
  }

  /**
   * 重置状态
   * 每日重置时调用
   */
  reset(): void {
    this.hasShown = false;
  }

  /**
   * 关闭弹窗
   */
  close(): void {
    if (this.dialogController) {
      this.dialogController.close();
      this.dialogController = null;
    }
    this.hasShown = false;
  }
}
