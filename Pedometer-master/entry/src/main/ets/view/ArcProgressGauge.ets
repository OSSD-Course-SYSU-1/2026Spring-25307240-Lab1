/*
 * 环形半圆弧进度仪表盘组件
 * 优化版：更精致的渐变、发光效果、动画过渡
 */

import { DesignSystem } from '../common/constants/DesignSystem';

@Component
export struct ArcProgressGauge {
  @Prop calorieProgress: number = 0;
  @Prop exerciseProgress: number = 0;
  @Prop hoursProgress: number = 0;
  
  private settings: RenderingContextSettings = new RenderingContextSettings(true);
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings);
  
  build() {
    Stack({ alignContent: Alignment.Center }) {
      Canvas(this.context)
        .width(340)
        .height(220)
        .onReady(() => {
          this.drawArcGauge();
        })
      
      // 中心文字区域
      Column() {
        Text('今日')
          .fontSize(DesignSystem.FONT_SIZE_MD)
          .fontColor(DesignSystem.TEXT_SECONDARY)
        
        Text('运动')
          .fontSize(DesignSystem.FONT_SIZE_3XL)
          .fontColor(DesignSystem.TEXT_PRIMARY)
          .fontWeight(DesignSystem.FONT_WEIGHT_BOLD)
          .margin({ top: DesignSystem.SPACING_XS })
        
        // 进度提示
        Row() {
          Text('完成')
            .fontSize(DesignSystem.FONT_SIZE_XS)
            .fontColor(DesignSystem.TEXT_TERTIARY)
          
          Text(`${Math.round(this.calorieProgress)}%`)
            .fontSize(DesignSystem.FONT_SIZE_SM)
            .fontColor(DesignSystem.COLOR_PRIMARY)
            .fontWeight(DesignSystem.FONT_WEIGHT_MEDIUM)
            .margin({ left: DesignSystem.SPACING_XS })
        }
        .margin({ top: DesignSystem.SPACING_SM })
      }
    }
    .width(340)
    .height(220)
  }
  
  private drawArcGauge(): void {
    const centerX = 170;
    const centerY = 200;
    const startAngle = Math.PI;
    const endAngle = 0;
    
    // 清空画布
    this.context.clearRect(0, 0, 340, 220);
    
    // 绘制背景光晕
    this.drawBackgroundGlow(centerX, centerY);
    
    // 绘制三层圆弧（从外到内）
    this.drawArcLayer(centerX, centerY, 150, this.hoursProgress, '#3498ff', '#2a2a30', startAngle, endAngle, 'hours');
    this.drawArcLayer(centerX, centerY, 115, this.exerciseProgress, '#ffb826', '#2a2a30', startAngle, endAngle, 'exercise');
    this.drawArcLayer(centerX, centerY, 80, this.calorieProgress, '#ff4c3b', '#2a2a30', startAngle, endAngle, 'calorie');
  }
  
  /**
   * 绘制背景光晕效果
   */
  private drawBackgroundGlow(centerX: number, centerY: number): void {
    // 绘制多层渐变背景
    for (let i = 3; i >= 0; i--) {
      const radius = 160 - i * 20;
      const alpha = 0.03 + i * 0.01;
      
      this.context.beginPath();
      this.context.arc(centerX, centerY, radius, Math.PI, 0, false);
      this.context.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      this.context.lineWidth = 2;
      this.context.stroke();
    }
  }
  
  /**
   * 绘制单层圆弧
   */
  private drawArcLayer(
    centerX: number,
    centerY: number,
    radius: number,
    progress: number,
    activeColor: string,
    bgColor: string,
    startAngle: number,
    endAngle: number,
    type: string
  ): void {
    const strokeWidth = 16;
    
    // 1. 绘制背景圆弧（未完成部分）
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, startAngle, endAngle, false);
    this.context.strokeStyle = bgColor;
    this.context.lineWidth = strokeWidth;
    this.context.lineCap = 'round';
    this.context.stroke();
    
    // 2. 绘制进度圆弧（已完成部分）
    if (progress > 0) {
      const progressAngle = startAngle + (endAngle - startAngle) * (progress / 100);
      
      // 创建更丰富的渐变
      const gradient = this.context.createLinearGradient(
        centerX - radius, centerY,
        centerX + radius, centerY
      );
      gradient.addColorStop(0, DesignSystem.lighten(activeColor, 0.4));
      gradient.addColorStop(0.3, DesignSystem.lighten(activeColor, 0.2));
      gradient.addColorStop(0.5, activeColor);
      gradient.addColorStop(0.7, DesignSystem.lighten(activeColor, 0.15));
      gradient.addColorStop(1, DesignSystem.lighten(activeColor, 0.3));
      
      this.context.beginPath();
      this.context.arc(centerX, centerY, radius, startAngle, progressAngle, false);
      this.context.strokeStyle = gradient;
      this.context.lineWidth = strokeWidth;
      this.context.lineCap = 'round';
      
      // 添加发光效果
      this.context.shadowBlur = 15;
      this.context.shadowColor = activeColor;
      this.context.stroke();
      this.context.shadowBlur = 0;
      
      // 3. 在末端绘制图标
      if (progress > 5) {
        this.drawEndIcon(centerX, centerY, radius, progressAngle, type, activeColor);
      }
    }
    
    // 绘制起点装饰
    this.drawStartDecoration(centerX, centerY, radius, startAngle, activeColor);
  }
  
  /**
   * 绘制起点装饰
   */
  private drawStartDecoration(
    centerX: number,
    centerY: number,
    radius: number,
    angle: number,
    color: string
  ): void {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    // 绘制小圆点
    this.context.beginPath();
    this.context.arc(x, y, 4, 0, 2 * Math.PI);
    this.context.fillStyle = DesignSystem.withAlpha(color, 0.3);
    this.context.fill();
  }
  
  /**
   * 绘制末端图标
   */
  private drawEndIcon(
    centerX: number,
    centerY: number,
    radius: number,
    angle: number,
    type: string,
    color: string
  ): void {
    const iconX = centerX + radius * Math.cos(angle);
    const iconY = centerY + radius * Math.sin(angle);
    const iconRadius = 12;
    
    // 绘制发光背景
    this.context.beginPath();
    this.context.arc(iconX, iconY, iconRadius + 4, 0, 2 * Math.PI);
    this.context.fillStyle = DesignSystem.withAlpha(color, 0.2);
    this.context.fill();
    
    // 绘制圆形背景
    this.context.beginPath();
    this.context.arc(iconX, iconY, iconRadius, 0, 2 * Math.PI);
    
    // 创建渐变填充
    const gradient = this.context.createRadialGradient(
      iconX - 3, iconY - 3, 0,
      iconX, iconY, iconRadius
    );
    gradient.addColorStop(0, DesignSystem.lighten(color, 0.3));
    gradient.addColorStop(1, color);
    
    this.context.fillStyle = gradient;
    this.context.fill();
    
    // 绘制图标
    this.context.fillStyle = '#ffffff';
    this.context.font = 'bold 14px Arial';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    
    let iconText = '';
    if (type === 'calorie') {
      iconText = '🔥';
    } else if (type === 'exercise') {
      iconText = '⚡';
    } else if (type === 'hours') {
      iconText = '⏱';
    }
    
    this.context.fillText(iconText, iconX, iconY);
  }
}
