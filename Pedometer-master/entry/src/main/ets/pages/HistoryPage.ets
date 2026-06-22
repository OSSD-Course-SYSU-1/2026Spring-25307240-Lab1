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

import { common } from '@kit.AbilityKit';
import { StepRecord, getStepDatabaseUtil } from '../common/utils/StepDatabaseUtil';
import { StepChart, ChartType, ChartDataItem, StatsCard } from '../view/StepChart';
import { CommonConstants } from '../common/constants/CommonConstants';
import { StatisticsData } from '../common/types/Types';
import Logger from '../common/utils/Logger';

const TAG: string = 'HistoryPage';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');

/**
 * 历史数据页面
 * 
 * 功能说明:
 * 1. 显示日/周/月步数趋势图
 * 2. 查看历史最佳记录
 * 3. 按日期查询历史数据
 * 4. 显示统计数据汇总
 * 
 * 使用的HarmonyOS API:
 * - @kit.ArkData.relationalStore: 关系型数据库查询
 * - Canvas: 图表绘制
 */
@Entry
@Component
struct HistoryPage {
  @State currentChartType: ChartType = ChartType.WEEK;  // 当前图表类型
  @State chartData: ChartDataItem[] = [];               // 图表数据
  @State statistics: StatisticsData = {
    totalDays: 0,
    totalSteps: 0,
    averageSteps: 0,
    totalCalories: 0,
    totalDistance: 0
  };                        // 统计数据
  @State bestRecord: StepRecord | null = null;          // 最佳记录
  @State isLoading: boolean = true;                     // 加载状态
  @State selectedDate: string = '';                     // 选中的日期
  
  private context: common.UIAbilityContext = uiContext?.getHostContext() as common.UIAbilityContext;
  private dbUtil = getStepDatabaseUtil(this.context);

  aboutToAppear() {
    // 初始化数据
    this.loadData();
  }

  /**
   * 加载历史数据
   */
  async loadData(): Promise<void> {
    this.isLoading = true;
    
    try {
      // 加载图表数据
      await this.loadChartData();
      
      // 加载统计数据
      await this.loadStatistics();
      
      // 加载最佳记录
      await this.loadBestRecord();
      
      this.isLoading = false;
    } catch (err) {
      Logger.error(TAG, `Load data failed: ${JSON.stringify(err)}`);
      this.isLoading = false;
    }
  }

  /**
   * 加载图表数据
   */
  async loadChartData(): Promise<void> {
    let days = 7;
    if (this.currentChartType === ChartType.MONTH) {
      days = 30;
    } else if (this.currentChartType === ChartType.DAY) {
      days = 1;
    }
    
    const records = await this.dbUtil.getRecentRecords(days);
    
    // 转换为图表数据格式
    this.chartData = records.map((record: StepRecord): ChartDataItem => {
      return {
        label: record.date,
        value: record.steps,
        goal: record.goal
      };
    });
    
    // 如果数据不足，填充空数据
    if (this.chartData.length < days) {
      const filledData: ChartDataItem[] = [];
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dateStr = this.formatDate(date);
        const existingData = this.chartData.find(d => d.label === dateStr);
        
        if (existingData) {
          filledData.push(existingData);
        } else {
          filledData.push({
            label: dateStr,
            value: 0,
            goal: 0
          });
        }
      }
      this.chartData = filledData;
    }
    
    Logger.info(TAG, `Chart data loaded: ${this.chartData.length} items`);
  }

  /**
   * 加载统计数据
   */
  async loadStatistics(): Promise<void> {
    this.statistics = await this.dbUtil.getStatistics();
    Logger.info(TAG, `Statistics loaded: ${JSON.stringify(this.statistics)}`);
  }

  /**
   * 加载最佳记录
   */
  async loadBestRecord(): Promise<void> {
    this.bestRecord = await this.dbUtil.getBestRecord();
    if (this.bestRecord) {
      Logger.info(TAG, `Best record: ${this.bestRecord.steps} steps on ${this.bestRecord.date}`);
    }
  }

  build() {
    Column() {
      // 标题栏
      this.TitleBar()

      if (this.isLoading) {
        // 加载中
        Column() {
          LoadingProgress()
            .width(50)
            .height(50)
            .color('#4ECDC4')
          
          Text('加载中...')
            .fontSize(14)
            .fontColor('#999999')
            .margin({ top: 10 })
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
      } else {
        // 内容区域
        Scroll() {
          Column() {
            // 图表类型选择器
            this.ChartTypeSelector()

            // 步数趋势图
            StepChart({
              chartData: this.chartData,
              chartType: this.currentChartType,
              title: this.getChartTitle()
            })
              .margin({ top: 10 })

            // 统计数据卡片
            this.StatisticsCard()

            // 最佳记录卡片
            if (this.bestRecord) {
              this.BestRecordCard()
            }

            // 历史记录列表
            this.HistoryList()
          }
          .width('100%')
          .padding(15)
        }
        .width('100%')
        .layoutWeight(1)
        .scrollBar(BarState.Off)
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  /**
   * 标题栏
   */
  @Builder
  TitleBar() {
    Row() {
      // 返回按钮
      Button() {
        Row() {
          Text('←')
            .fontSize(20)
            .fontColor(Color.White)
        }
      }
      .width(40)
      .height(40)
      .backgroundColor(Color.Transparent)
      .onClick(() => {
        // 返回主页
        this.context.terminateSelf();
      })

      Text('历史数据')
        .fontSize(18)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Medium)
        .layoutWeight(1)
        .textAlign(TextAlign.Center)

      // 占位
      Blank()
        .width(40)
    }
    .width('100%')
    .height(56)
    .padding({ left: 10, right: 10 })
    .linearGradient({
      angle: 135,
      colors: [['#4ECDC4', 0], ['#45B7AA', 1]]
    })
  }

  /**
   * 图表类型选择器
   */
  @Builder
  ChartTypeSelector() {
    Row() {
      Button('周')
        .width(60)
        .height(32)
        .fontSize(14)
        .fontColor(this.currentChartType === ChartType.WEEK ? Color.White : '#4ECDC4')
        .backgroundColor(this.currentChartType === ChartType.WEEK ? '#4ECDC4' : Color.White)
        .borderRadius(16)
        .border({ width: 1, color: '#4ECDC4' })
        .onClick(async () => {
          if (this.currentChartType !== ChartType.WEEK) {
            this.currentChartType = ChartType.WEEK;
            await this.loadChartData();
          }
        })

      Button('月')
        .width(60)
        .height(32)
        .fontSize(14)
        .fontColor(this.currentChartType === ChartType.MONTH ? Color.White : '#4ECDC4')
        .backgroundColor(this.currentChartType === ChartType.MONTH ? '#4ECDC4' : Color.White)
        .borderRadius(16)
        .border({ width: 1, color: '#4ECDC4' })
        .onClick(async () => {
          if (this.currentChartType !== ChartType.MONTH) {
            this.currentChartType = ChartType.MONTH;
            await this.loadChartData();
          }
        })
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
    .margin({ top: 10, bottom: 10 })
  }

  /**
   * 统计数据卡片
   */
  @Builder
  StatisticsCard() {
    Column() {
      Text('数据统计')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .margin({ bottom: 15 })

      Row() {
        this.StatItem('总天数', `${this.statistics.totalDays}`, '天')
        Divider().vertical(true).height(40).color('#E0E0E0')
        this.StatItem('总步数', `${this.statistics.totalSteps}`, '步')
        Divider().vertical(true).height(40).color('#E0E0E0')
        this.StatItem('平均步数', `${this.statistics.averageSteps}`, '步')
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
      .margin({ bottom: 15 })

      Row() {
        this.StatItem('总卡路里', `${Math.round(this.statistics.totalCalories)}`, '千卡')
        Divider().vertical(true).height(40).color('#E0E0E0')
        this.StatItem('总距离', this.formatDistance(this.statistics.totalDistance), '')
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
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
          .fontSize(18)
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
   * 最佳记录卡片
   */
  @Builder
  BestRecordCard() {
    Column() {
      Row() {
        Text('🏆 历史最佳')
          .fontSize(16)
          .fontWeight(FontWeight.Medium)

        Blank()

        Text(this.bestRecord?.date || '')
          .fontSize(12)
          .fontColor('#999999')
      }
      .width('100%')
      .margin({ bottom: 15 })

      Row() {
        Column() {
          Text('步数')
            .fontSize(12)
            .fontColor('#666666')
          Text(`${this.bestRecord?.steps || 0}`)
            .fontSize(24)
            .fontColor('#4ECDC4')
            .fontWeight(FontWeight.Bold)
            .margin({ top: 5 })
        }
        .layoutWeight(1)

        Column() {
          Text('卡路里')
            .fontSize(12)
            .fontColor('#666666')
          Text(`${(this.bestRecord?.calories || 0).toFixed(1)}`)
            .fontSize(24)
            .fontColor('#FF6B6B')
            .fontWeight(FontWeight.Bold)
            .margin({ top: 5 })
        }
        .layoutWeight(1)

        Column() {
          Text('距离')
            .fontSize(12)
            .fontColor('#666666')
          Text(this.formatDistance(this.bestRecord?.distance || 0))
            .fontSize(20)
            .fontColor('#FFE66D')
            .fontWeight(FontWeight.Bold)
            .margin({ top: 5 })
        }
        .layoutWeight(1)
      }
      .width('100%')
    }
    .width('100%')
    .padding(15)
    .backgroundColor(Color.White)
    .borderRadius(12)
    .margin({ top: 10 })
  }

  /**
   * 历史记录列表
   */
  @Builder
  HistoryList() {
    Column() {
      Text('最近记录')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .width('100%')
        .margin({ bottom: 10 })

      if (this.chartData.length > 0) {
        ForEach(this.chartData.slice().reverse().slice(0, 7), (item: ChartDataItem, index: number) => {
          this.HistoryItem(item, index)
        })
      } else {
        Text('暂无历史记录')
          .fontSize(14)
          .fontColor('#999999')
          .margin({ top: 20 })
      }
    }
    .width('100%')
    .padding(15)
    .backgroundColor(Color.White)
    .borderRadius(12)
    .margin({ top: 10 })
  }

  /**
   * 历史记录项
   */
  @Builder
  HistoryItem(item: ChartDataItem, index: number) {
    Row() {
      Column() {
        Text(this.formatDisplayDate(item.label))
          .fontSize(14)
          .fontColor('#333333')
          .fontWeight(FontWeight.Medium)
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)

      Column() {
        Text(`${item.value} 步`)
          .fontSize(14)
          .fontColor('#4ECDC4')
          .fontWeight(FontWeight.Medium)
      }
      .alignItems(HorizontalAlign.End)

      // 完成状态
      if ((item.goal ?? 0) > 0) {
        Column() {
          Text(item.value >= (item.goal ?? 0) ? '✓' : '')
            .fontSize(16)
            .fontColor(item.value >= (item.goal ?? 0) ? '#4ECDC4' : '#CCCCCC')
        }
        .width(30)
        .alignItems(HorizontalAlign.End)
      }
    }
    .width('100%')
    .padding({ top: 10, bottom: 10 })
    .border({
      width: { bottom: index < 6 ? 0.5 : 0 },
      color: '#E0E0E0'
    })
  }

  /**
   * 获取图表标题
   */
  private getChartTitle(): string {
    switch (this.currentChartType) {
      case ChartType.WEEK:
        return '近7天步数趋势';
      case ChartType.MONTH:
        return '近30天步数趋势';
      default:
        return '步数趋势';
    }
  }

  /**
   * 格式化日期
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * 格式化显示日期
   */
  private formatDisplayDate(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    if (this.formatDate(today) === dateStr) {
      return '今天';
    } else if (this.formatDate(yesterday) === dateStr) {
      return '昨天';
    } else {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日`;
    }
  }

  /**
   * 格式化距离
   */
  private formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${Math.round(meters)}米`;
    } else {
      return `${(meters / 1000).toFixed(1)}公里`;
    }
  }
}
