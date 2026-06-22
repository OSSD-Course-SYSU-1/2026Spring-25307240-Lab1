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
 * 隐私政策页面
 */
@Entry
@Component
struct PrivacyPolicyPage {
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

        Text('隐私政策')
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
          Text('隐私保护政策')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
            .width('100%')
            .margin({ bottom: 20 })

          this.PolicyContent()
        }
        .width('100%')
        .padding(20)
      }
      .width('100%')
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#000000')
  }

  @Builder
  PolicyContent() {
    Column() {
      Text('更新日期：2024年1月1日')
        .fontSize(12)
        .fontColor('#999999')
        .width('100%')
        .margin({ bottom: 20 })

      Text('生效日期：2024年1月1日')
        .fontSize(12)
        .fontColor('#999999')
        .width('100%')
        .margin({ bottom: 30 })

      this.Section('引言')
      
      Text('步数计应用（以下简称"我们"）非常重视用户的隐私保护。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('一、我们收集的信息')
      
      Text('1.1 基本信息：当您注册账号时，我们会收集您的手机号码、昵称等基本信息。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('1.2 运动数据：我们会收集您的步数、运动距离、卡路里消耗等运动相关数据。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('1.3 设备信息：我们会收集您的设备型号、操作系统版本等信息以优化服务。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('1.4 位置信息：在获得您授权后，我们会收集您的位置信息用于记录运动轨迹。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('二、我们如何使用信息')
      
      Text('2.1 提供、维护和改进我们的服务。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('2.2 向您发送服务通知和更新信息。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('2.3 进行数据分析以改善用户体验。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('2.4 保障服务安全，防止欺诈行为。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('三、信息存储与保护')
      
      Text('3.1 我们采用行业标准的安全技术和管理措施保护您的个人信息。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('3.2 我们会对您的个人信息进行加密存储，防止未经授权的访问。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('3.3 我们会定期审查和更新安全措施，以应对新的安全威胁。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('四、信息共享')
      
      Text('4.1 我们不会向第三方出售您的个人信息。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('4.2 我们仅在以下情况下共享您的信息：')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('   • 获得您的明确同意')
        .fontSize(14)
        .fontColor('#AAAAAA')
        .width('100%')
        .margin({ bottom: 10 })

      Text('   • 法律法规要求')
        .fontSize(14)
        .fontColor('#AAAAAA')
        .width('100%')
        .margin({ bottom: 10 })

      Text('   • 与授权合作伙伴共享（如数据分析服务商）')
        .fontSize(14)
        .fontColor('#AAAAAA')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('五、您的权利')
      
      Text('5.1 您有权访问、更正和删除您的个人信息。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('5.2 您有权撤回对信息收集的授权同意。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('5.3 您有权注销账号，注销后我们将删除您的个人信息。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('六、未成年人保护')
      
      Text('6.1 我们非常重视未成年人的隐私保护。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('6.2 如果您是未成年人，请在监护人陪同下阅读本政策，并在取得监护人同意后使用我们的服务。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('七、政策更新')
      
      Text('7.1 我们可能会不时更新本隐私政策，更新后的政策将在应用内公布。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('7.2 如果您继续使用我们的服务，即表示您同意接受更新后的隐私政策。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('八、联系我们')
      
      Text('如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('邮箱：privacy@pedometer.example.com')
        .fontSize(14)
        .fontColor('#4ECDC4')
        .width('100%')
        .margin({ bottom: 15 })

      Text('客服电话：400-123-4567')
        .fontSize(14)
        .fontColor('#4ECDC4')
        .width('100%')
        .margin({ bottom: 15 })
    }
    .width('100%')
  }

  @Builder
  Section(title: string) {
    Text(title)
      .fontSize(16)
      .fontWeight(FontWeight.Bold)
      .fontColor('#4ECDC4')
      .width('100%')
      .margin({ bottom: 15 })
  }
}
