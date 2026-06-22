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

import { router } from '@kit.ArkUI';

/**
 * FAQ项接口
 */
interface FAQItem {
  question: string;
  answer: string;
}

/**
 * 常见问题页面
 */
@Entry
@Component
struct FAQPage {
  @State expandedIndex: number = 0; // 展开的FAQ索引，默认展开第一个

  private faqList: FAQItem[] = [
    {
      question: '如何开始记录步数？',
      answer: '打开应用后，点击首页的"开始运动"按钮即可开始记录步数。应用会自动使用手机的计步传感器进行记录。'
    },
    {
      question: '步数统计不准确怎么办？',
      answer: '请检查以下几点：\n1. 确保已授予应用运动与健身权限\n2. 保持应用在后台运行\n3. 某些手机型号的计步传感器精度有限，建议结合实际情况参考\n4. 避免频繁开关应用，这可能导致数据丢失'
    },
    {
      question: '如何设置每日步数目标？',
      answer: '进入"设置" -> "基础通用设置" -> "每日步数目标"，可以设置您的个人目标。建议根据自身情况设置合理的目标，循序渐进。'
    },
    {
      question: '卡路里消耗是如何计算的？',
      answer: '卡路里消耗基于以下因素计算：\n1. 您的体重、身高、年龄等个人信息\n2. 步数和运动距离\n3. 运动强度评估\n\n建议在设置中完善个人信息以获得更准确的计算结果。'
    },
    {
      question: '数据会自动保存吗？',
      answer: '是的，应用会自动保存您的运动数据。数据存储在本地数据库中，即使关闭应用也不会丢失。建议定期查看历史记录了解运动情况。'
    },
    {
      question: '如何查看历史运动数据？',
      answer: '点击底部导航栏的"历史"按钮，可以查看过去7天、30天或更长时间的运动数据统计。支持按日期筛选和查看详细数据。'
    },
    {
      question: '应用耗电量大吗？',
      answer: '应用使用计步传感器进行记录，这是硬件级别的传感器，功耗非常低。正常使用情况下，对电池续航影响很小。'
    },
    {
      question: '如何清除缓存数据？',
      answer: '进入"设置" -> "基础通用设置" -> "清除缓存"，可以清除应用的临时缓存数据。注意：这不会删除您的运动记录数据。'
    },
    {
      question: '支持哪些设备？',
      answer: '支持HarmonyOS系统的智能设备，包括手机、手表等。需要设备具备计步传感器硬件支持。'
    },
    {
      question: '如何联系客服？',
      answer: '您可以通过以下方式联系我们：\n1. 在"设置" -> "反馈与帮助" -> "意见反馈"提交问题\n2. 发送邮件至：support@pedometer.example.com\n3. 拨打客服电话：400-123-4567'
    }
  ];

  build() {
    Column() {
      // 标题栏
      Row() {
        Button() {
          Text('←')
            .fontSize(20)
            .fontColor(Color.White)
        }
        .width(40)
        .height(40)
        .backgroundColor(Color.Transparent)
        .onClick(() => {
          router.back();
        })

        Text('常见问题 FAQ')
          .fontSize(18)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Medium)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)

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

      Scroll() {
        Column() {
          // 搜索提示
          Row() {
            Text('🔍')
              .fontSize(16)
            Text('  点击问题查看答案')
              .fontSize(14)
              .fontColor('#999999')
          }
          .width('100%')
          .padding(15)
          .backgroundColor('#1A1A1A')
          .borderRadius(12)
          .margin({ top: 10, bottom: 10 })

          // FAQ列表
          ForEach(this.faqList, (item: FAQItem, index: number) => {
            this.FAQItem(item.question, item.answer, index)
          }, (item: FAQItem, index: number) => index.toString())
        }
        .width('100%')
        .padding(15)
      }
      .width('100%')
      .layoutWeight(1)
      .scrollBar(BarState.Off)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#000000')
  }

  @Builder
  FAQItem(question: string, answer: string, index: number) {
    Column() {
      // 问题
      Row() {
        Text(`${index + 1}. ${question}`)
          .fontSize(15)
          .fontColor('#FFFFFF')
          .layoutWeight(1)
        
        Text(this.expandedIndex === index ? '▲' : '▼')
          .fontSize(12)
          .fontColor('#4ECDC4')
          .margin({ left: 10 })
      }
      .width('100%')
      .padding(15)
      .onClick(() => {
        this.expandedIndex = this.expandedIndex === index ? -1 : index;
      })

      // 答案
      if (this.expandedIndex === index) {
        Column() {
          Text(answer)
            .fontSize(14)
            .fontColor('#CCCCCC')
            .width('100%')
            .lineHeight(22)
        }
        .width('100%')
        .padding({ left: 15, right: 15, bottom: 15 })
        .backgroundColor('#2A2A2A')
      }

      Divider().color('#33FFFFFF')
    }
    .width('100%')
    .backgroundColor('#1A1A1A')
    .borderRadius(12)
    .margin({ top: 10 })
  }
}
