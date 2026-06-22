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
 * 意见反馈页面
 */
@Entry
@Component
struct FeedbackPage {
  @State feedbackType: number = 0; // 0: 功能建议, 1: 问题反馈, 2: 其他
  @State feedbackContent: string = '';
  @State contactInfo: string = '';
  
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

        Text('意见反馈')
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
          // 反馈类型选择
          Column() {
            Text('反馈类型')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .fontColor('#FFFFFF')
              .width('100%')
              .margin({ bottom: 15 })

            Row() {
              this.TypeButton('功能建议', 0)
              this.TypeButton('问题反馈', 1)
              this.TypeButton('其他', 2)
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceBetween)
          }
          .width('100%')
          .padding(15)
          .backgroundColor('#1A1A1A')
          .borderRadius(12)
          .margin({ top: 10 })

          // 反馈内容
          Column() {
            Text('反馈内容')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .fontColor('#FFFFFF')
              .width('100%')
              .margin({ bottom: 15 })

            TextArea({ placeholder: '请详细描述您的建议或遇到的问题...' })
              .width('100%')
              .height(150)
              .backgroundColor('#2A2A2A')
              .borderRadius(8)
              .fontColor('#FFFFFF')
              .placeholderColor('#666666')
              .onChange((value: string) => {
                this.feedbackContent = value;
              })
          }
          .width('100%')
          .padding(15)
          .backgroundColor('#1A1A1A')
          .borderRadius(12)
          .margin({ top: 10 })

          // 联系方式
          Column() {
            Text('联系方式（选填）')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .fontColor('#FFFFFF')
              .width('100%')
              .margin({ bottom: 15 })

            TextInput({ placeholder: '请输入您的邮箱或手机号' })
              .width('100%')
              .height(45)
              .backgroundColor('#2A2A2A')
              .borderRadius(8)
              .fontColor('#FFFFFF')
              .placeholderColor('#666666')
              .onChange((value: string) => {
                this.contactInfo = value;
              })
          }
          .width('100%')
          .padding(15)
          .backgroundColor('#1A1A1A')
          .borderRadius(12)
          .margin({ top: 10 })

          // 提交按钮
          Button('提交反馈')
            .width('100%')
            .height(50)
            .backgroundColor('#4ECDC4')
            .borderRadius(25)
            .fontColor('#FFFFFF')
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .margin({ top: 20 })
            .onClick(() => {
              this.submitFeedback();
            })

          // 提示信息
          Text('感谢您的反馈！我们会认真处理您的意见和建议。')
            .fontSize(12)
            .fontColor('#999999')
            .width('100%')
            .textAlign(TextAlign.Center)
            .margin({ top: 15 })
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
  TypeButton(text: string, type: number) {
    Button(text)
      .width('30%')
      .height(40)
      .backgroundColor(this.feedbackType === type ? '#4ECDC4' : '#2A2A2A')
      .borderRadius(20)
      .fontColor(this.feedbackType === type ? '#FFFFFF' : '#CCCCCC')
      .fontSize(14)
      .onClick(() => {
        this.feedbackType = type;
      })
  }

  private submitFeedback(): void {
    if (this.feedbackContent.trim() === '') {
      this.getUIContext().getPromptAction().showToast({
        message: '请输入反馈内容',
        duration: 2000
      });
      return;
    }

    // 模拟提交反馈
    this.getUIContext().getPromptAction().showToast({
      message: '感谢您的反馈！',
      duration: 2000
    });

    // 清空输入
    this.feedbackContent = '';
    this.contactInfo = '';
    
    // 延迟返回上一页
    setTimeout(() => {
      router.back();
    }, 1500);
  }
}
