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
import { getCacheManager, CacheKeys } from '../common/utils/CacheManager';
import Logger from '../common/utils/Logger';

const TAG: string = 'StepChart';

/**
 * 图表数据项
 */
export interface ChartDataItem {
  label: string;      // X轴标签（日期）
  value: number;      // 数值（步数）
  goal?: number;      // 目标值（可选）
}

/**
 * 图表渲染配置
 */
interface ChartRenderConfig {
  maxValue: number;
  yScale: number;
  chartWidth: number;
  chartHeight: number;
  barWidth: number;
  barGap: number;
}

/**
 * 图表类型枚举
 */
export enum ChartType {
  DAY = 'day',        // 日视图
  WEEK = 'week',      // 周视图
  MONTH = 'month'     // 月视图
}

/**
 * 步数趋势图组件
 * 
 * 功能说明:
 * 1. 支持日/周/月三种视图模式
 * 2. 使用Canvas绘制柱状图
 * 3. 显示目标线参考
 * 4. 支持触摸交互显示详细数据
 * 
 * 使用的HarmonyOS API:
 * - Canvas: 画布组件，用于自定义图形绘制
 * - CanvasRenderingContext2D: 2D绘图上下文
 */
@Component
export struct StepChart {
  @Prop chartData: ChartDataItem[] = [];  // 图表数据
  @Prop chartType: ChartType = ChartType.WEEK;  // 图表类型
  @Prop title: string = '步数趋势';  // 图表标题
  @State selectedIndex: number = -1;  // 选中的数据索引
  
  // 画布上下文
  private settings: RenderingContextSettings = new RenderingContextSettings(true);
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings);
  
  // 性能优化：缓存渲染配置
  private renderConfig: ChartRenderConfig | null = null;
  private lastDataHash: string = '';
  private drawDebounceTimer: number = -1;
  private cacheManager = getCacheManager();
  
  // 图表配置
  private readonly CHART_PADDING_LEFT: number = 50;
  private readonly CHART_PADDING_RIGHT: number = 20;
  private readonly CHART_PADDING_TOP: number = 40;
  private readonly CHART_PADDING_BOTTOM: number = 40;
  private readonly BAR_RADIUS: number = 4;
  private readonly GOAL_LINE_COLOR: string = '#FF6B6B';
  private readonly BAR_COLOR: string = '#4ECDC4';
  private readonly BAR_COLOR_SELECTED: string = '#45B7AA';
  private readonly TEXT_COLOR: string = '#333333';
  private readonly GRID_COLOR: string = '#E0E0E0';
  
  // 性能监控
  private lastRenderTime: number = 0;
  private renderCount: number = 0;

  build() {
    Column() {
      // 标题
      Text(this.title)
        .fontSize(18)
        .fontWeight(FontWeight.Medium)
        .fontColor(this.TEXT_COLOR)
        .margin({ bottom: 10 })

      // 图表画布
      Canvas(this.context)
        .width('100%')
        .height(250)
        .onReady(() => {
          this.drawChart();
        })
        .onTouch((event: TouchEvent) => {
          this.handleTouch(event);
        })

      // 图例
      this.Legend()
    }
    .width('100%')
    .padding(15)
    .backgroundColor(Color.White)
    .borderRadius(12)
  }

  /**
   * 图例组件
   */
  @Builder
  Legend() {
    Row() {
      // 步数图例
      Row() {
        Circle()
          .width(10)
          .height(10)
          .fill(this.BAR_COLOR)
        Text('步数')
          .fontSize(12)
          .fontColor(this.TEXT_COLOR)
          .margin({ left: 5 })
      }
      .margin({ right: 20 })

      // 目标线图例
      Row() {
        Line()
          .width(20)
          .height(2)
          .stroke(this.GOAL_LINE_COLOR)
          .strokeWidth(2)
        Text('目标')
          .fontSize(12)
          .fontColor(this.TEXT_COLOR)
          .margin({ left: 5 })
      }
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
    .margin({ top: 10 })
  }

  /**
   * 绘制图表
   * 性能优化：使用缓存和防抖
   */
  private drawChart(): void {
    // 性能监控：记录渲染开始时间
    const startTime = Date.now();
    
    if (this.chartData.length === 0) {
      this.drawEmptyChart();
      return;
    }

    const canvasWidth = this.context.width;
    const canvasHeight = this.context.height;
    
    // 性能优化：检查是否需要重新计算配置
    const dataHash = this.generateDataHash();
    if (dataHash !== this.lastDataHash || !this.renderConfig) {
      this.renderConfig = this.calculateRenderConfig(canvasWidth, canvasHeight);
      this.lastDataHash = dataHash;
    }
    
    // 清空画布
    this.context.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // 使用缓存的渲染配置
    const config = this.renderConfig;
    
    // 绘制网格线
    this.drawGridLines(config.chartWidth, config.chartHeight, config.maxValue);
    
    // 绘制目标线
    this.drawGoalLine(config.chartWidth, config.chartHeight, config.yScale);
    
    // 绘制柱状图
    this.drawBars(config.chartWidth, config.chartHeight, config.yScale);
    
    // 绘制X轴标签
    this.drawXLabels(config.chartWidth, config.chartHeight);
    
    // 性能监控
    this.lastRenderTime = Date.now() - startTime;
    this.renderCount++;
    
    if (this.renderCount % 10 === 0) {
      Logger.debug(TAG, `Chart render time: ${this.lastRenderTime}ms, total renders: ${this.renderCount}`);
    }
  }
  
  /**
   * 计算渲染配置
   * 性能优化：缓存计算结果
   */
  private calculateRenderConfig(canvasWidth: number, canvasHeight: number): ChartRenderConfig {
    const chartWidth = canvasWidth - this.CHART_PADDING_LEFT - this.CHART_PADDING_RIGHT;
    const chartHeight = canvasHeight - this.CHART_PADDING_TOP - this.CHART_PADDING_BOTTOM;
    
    // 获取最大值用于计算比例
    const maxValue = Math.max(...this.chartData.map(d => Math.max(d.value, d.goal || 0)));
    const yScale = chartHeight / (maxValue * 1.1); // 留10%顶部空间
    
    const barCount = this.chartData.length;
    const barWidth = (chartWidth / barCount) * 0.6; // 柱子宽度
    const barGap = (chartWidth / barCount) * 0.4; // 柱子间距
    
    return {
      maxValue,
      yScale,
      chartWidth,
      chartHeight,
      barWidth,
      barGap
    };
  }
  
  /**
   * 生成数据哈希
   * 用于检测数据变化
   */
  private generateDataHash(): string {
    return `${this.chartData.length}_${this.chartData.map(d => `${d.value}_${d.goal}`).join('_')}_${this.selectedIndex}`;
  }

  /**
   * 绘制空图表提示
   */
  private drawEmptyChart(): void {
    const canvasWidth = this.context.width;
    const canvasHeight = this.context.height;
    
    this.context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.context.fillStyle = this.TEXT_COLOR;
    this.context.font = '14px sans-serif';
    this.context.textAlign = 'center';
    this.context.fillText('暂无数据', canvasWidth / 2, canvasHeight / 2);
  }

  /**
   * 绘制网格线
   */
  private drawGridLines(chartWidth: number, chartHeight: number, maxValue: number): void {
    this.context.strokeStyle = this.GRID_COLOR;
    this.context.lineWidth = 1;
    
    // 绘制5条水平网格线
    const gridCount = 5;
    for (let i = 0; i <= gridCount; i++) {
      const y = this.CHART_PADDING_TOP + (chartHeight / gridCount) * i;
      
      this.context.beginPath();
      this.context.moveTo(this.CHART_PADDING_LEFT, y);
      this.context.lineTo(this.CHART_PADDING_LEFT + chartWidth, y);
      this.context.stroke();
      
      // 绘制Y轴刻度值
      const value = Math.round(maxValue * (1 - i / gridCount));
      this.context.fillStyle = this.TEXT_COLOR;
      this.context.font = '10px sans-serif';
      this.context.textAlign = 'right';
      this.context.fillText(value.toString(), this.CHART_PADDING_LEFT - 5, y + 4);
    }
  }

  /**
   * 绘制目标线
   */
  private drawGoalLine(chartWidth: number, chartHeight: number, yScale: number): void {
    // 获取平均目标值
    const goals = this.chartData.filter(d => d.goal && d.goal > 0).map(d => d.goal as number);
    if (goals.length === 0) {
      return;
    }
    
    const avgGoal = goals.reduce((a, b) => a + b, 0) / goals.length;
    const goalY = this.CHART_PADDING_TOP + chartHeight - avgGoal * yScale;
    
    this.context.strokeStyle = this.GOAL_LINE_COLOR;
    this.context.lineWidth = 2;
    this.context.setLineDash([5, 5]); // 虚线
    
    this.context.beginPath();
    this.context.moveTo(this.CHART_PADDING_LEFT, goalY);
    this.context.lineTo(this.CHART_PADDING_LEFT + chartWidth, goalY);
    this.context.stroke();
    
    this.context.setLineDash([]); // 重置为实线
  }

  /**
   * 绘制柱状图
   * 性能优化：使用缓存的配置
   */
  private drawBars(chartWidth: number, chartHeight: number, yScale: number): void {
    if (!this.renderConfig) {
      return;
    }
    
    const barCount = this.chartData.length;
    const barWidth = this.renderConfig.barWidth;
    const barGap = this.renderConfig.barGap;
    
    // 性能优化：批量设置样式
    this.context.fillStyle = this.BAR_COLOR;
    
    this.chartData.forEach((item, index) => {
      const x = this.CHART_PADDING_LEFT + (chartWidth / barCount) * index + barGap / 2;
      const barHeight = item.value * yScale;
      const y = this.CHART_PADDING_TOP + chartHeight - barHeight;
      
      // 设置柱子颜色（只在选中状态改变时更新）
      const color = index === this.selectedIndex ? this.BAR_COLOR_SELECTED : this.BAR_COLOR;
      if (this.context.fillStyle !== color) {
        this.context.fillStyle = color;
      }
      
      // 绘制圆角矩形
      this.drawRoundedRect(x, y, barWidth, barHeight, this.BAR_RADIUS);
      
      // 如果选中，显示数值
      if (index === this.selectedIndex) {
        this.context.fillStyle = this.TEXT_COLOR;
        this.context.font = 'bold 12px sans-serif';
        this.context.textAlign = 'center';
        this.context.fillText(item.value.toString(), x + barWidth / 2, y - 8);
      }
    });
  }

  /**
   * 绘制圆角矩形
   */
  private drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): void {
    this.context.beginPath();
    this.context.moveTo(x + radius, y);
    this.context.lineTo(x + width - radius, y);
    this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.context.lineTo(x + width, y + height);
    this.context.lineTo(x, y + height);
    this.context.lineTo(x, y + radius);
    this.context.quadraticCurveTo(x, y, x + radius, y);
    this.context.closePath();
    this.context.fill();
  }

  /**
   * 绘制X轴标签
   */
  private drawXLabels(chartWidth: number, chartHeight: number): void {
    const barCount = this.chartData.length;
    
    this.context.fillStyle = this.TEXT_COLOR;
    this.context.font = '10px sans-serif';
    this.context.textAlign = 'center';
    
    this.chartData.forEach((item, index) => {
      const x = this.CHART_PADDING_LEFT + (chartWidth / barCount) * (index + 0.5);
      const y = this.CHART_PADDING_TOP + chartHeight + 20;
      
      // 根据图表类型格式化标签
      let label = item.label;
      if (this.chartType === ChartType.WEEK) {
        // 周视图只显示星期几
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        const date = new Date(item.label);
        label = '周' + weekDays[date.getDay()];
      } else if (this.chartType === ChartType.MONTH) {
        // 月视图只显示日期
        label = item.label.split('-')[2];
      }
      
      this.context.fillText(label, x, y);
    });
  }

  /**
   * 处理触摸事件
   * 性能优化：添加防抖机制
   */
  private handleTouch(event: TouchEvent): void {
    if (event.type === TouchType.Down || event.type === TouchType.Move) {
      // 性能优化：防抖处理
      if (this.drawDebounceTimer !== -1) {
        clearTimeout(this.drawDebounceTimer);
      }
      
      this.drawDebounceTimer = setTimeout(() => {
        this.processTouch(event);
      }, 16); // 约60fps
    } else if (event.type === TouchType.Up) {
      // 清理防抖定时器
      if (this.drawDebounceTimer !== -1) {
        clearTimeout(this.drawDebounceTimer);
        this.drawDebounceTimer = -1;
      }
    }
  }
  
  /**
   * 处理触摸逻辑
   */
  private processTouch(event: TouchEvent): void {
    const touchX = event.touches[0].x;
    const canvasWidth = this.context.width;
    const chartWidth = canvasWidth - this.CHART_PADDING_LEFT - this.CHART_PADDING_RIGHT;
    
    // 计算触摸位置对应的数据索引
    const relativeX = touchX - this.CHART_PADDING_LEFT;
    if (relativeX >= 0 && relativeX <= chartWidth) {
      const index = Math.floor((relativeX / chartWidth) * this.chartData.length);
      if (index >= 0 && index < this.chartData.length && index !== this.selectedIndex) {
        this.selectedIndex = index;
        this.drawChart();
      }
    }
  }
  
  /**
   * 组件销毁时清理资源
   */
  aboutToDisappear() {
    if (this.drawDebounceTimer !== -1) {
      clearTimeout(this.drawDebounceTimer);
      this.drawDebounceTimer = -1;
    }
    Logger.debug(TAG, `Chart component destroyed, total renders: ${this.renderCount}`);
  }
}

/**
 * 统计数据卡片组件
 * 显示卡路里、距离等运动数据
 */
@Component
export struct StatsCard {
  @Prop calories: number = 0;      // 卡路里消耗
  @Prop distance: number = 0;      // 运动距离（米）
  @Prop steps: number = 0;         // 步数
  @Prop goal: number = 0;          // 目标步数
  
  build() {
    Column() {
      // 标题
      Text('今日运动数据')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .margin({ bottom: 15 })

      // 数据网格
      Row() {
        // 步数
        this.StatItem('步数', this.steps.toString(), '步')
        
        Divider()
          .vertical(true)
          .height(40)
          .color('#E0E0E0')
        
        // 卡路里
        this.StatItem('卡路里', this.calories.toFixed(1), '千卡')
        
        Divider()
          .vertical(true)
          .height(40)
          .color('#E0E0E0')
        
        // 距离
        this.StatItem('距离', this.formatDistance(this.distance), '')
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)

      // 进度条
      if (this.goal > 0) {
        Column() {
          Row() {
            Text('目标进度')
              .fontSize(12)
              .fontColor('#666666')
            
            Blank()
            
            Text(`${Math.min(100, Math.round(this.steps / this.goal * 100))}%`)
              .fontSize(12)
              .fontColor('#4ECDC4')
              .fontWeight(FontWeight.Medium)
          }
          .width('100%')
          .margin({ bottom: 5 })

          Progress({
            value: this.steps,
            total: this.goal,
            type: ProgressType.Linear
          })
            .color('#4ECDC4')
            .backgroundColor('#E0E0E0')
            .height(8)
            .borderRadius(4)
        }
        .width('100%')
        .margin({ top: 15 })
      }
    }
    .width('100%')
    .padding(15)
    .backgroundColor(Color.White)
    .borderRadius(12)
    .margin({ top: 10 })
  }

  /**
   * 统计项组件
   */
  @Builder
  StatItem(label: string, value: string, unit: string) {
    Column() {
      Text(label)
        .fontSize(12)
        .fontColor('#666666')
        .margin({ bottom: 5 })

      Row() {
        Text(value)
          .fontSize(20)
          .fontColor('#333333')
          .fontWeight(FontWeight.Bold)
        
        if (unit) {
          Text(unit)
            .fontSize(12)
            .fontColor('#666666')
            .margin({ left: 2 })
        }
      }
    }
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
