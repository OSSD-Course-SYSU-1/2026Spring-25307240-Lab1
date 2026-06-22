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
 * 用户协议页面
 */
@Entry
@Component
struct UserAgreementPage {
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

        Text('用户协议')
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
          Text('用户服务协议')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
            .width('100%')
            .margin({ bottom: 20 })

          this.AgreementContent()
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
  AgreementContent() {
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

      this.Section('一、服务条款的确认和接纳')
      
      Text('1.1 本协议是您与步数计应用（以下简称"本应用"）之间关于使用本应用服务所订立的协议。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('1.2 请您仔细阅读本协议的全部内容，如果您不同意本协议的任何内容，请立即停止使用本应用提供的服务。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('1.3 您一旦使用本应用的服务，即视为您已了解并完全同意本协议各项内容。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('二、服务内容')
      
      Text('2.1 本应用为您提供步数统计、运动数据记录、健康指标计算等服务。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('2.2 本应用有权在必要时修改服务条款，修改后的条款将在应用内公布。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('2.3 本应用保留随时中断或终止服务的权利，无需对用户或第三方承担责任。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('三、用户注册与账号管理')
      
      Text('3.1 用户应按照注册页面提示完成注册流程，确保提供的信息真实、准确、完整。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('3.2 用户应妥善保管账号和密码，因用户保管不当造成的损失由用户自行承担。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('3.3 用户发现账号被盗用或存在安全漏洞时，应立即通知本应用。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('四、用户行为规范')
      
      Text('4.1 用户不得利用本应用从事违法违规活动。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('4.2 用户不得干扰或破坏本应用的正常运营。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('4.3 用户不得以任何方式侵犯他人的合法权益。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('五、知识产权')
      
      Text('5.1 本应用的所有内容，包括但不限于文字、图片、音频、视频、软件等，其知识产权归本应用所有。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('5.2 未经本应用书面许可，用户不得复制、转载、引用本应用的任何内容。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('六、免责声明')
      
      Text('6.1 本应用不对因网络状况、通讯线路等任何原因造成的服务中断或不能满足用户要求的情况承担责任。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('6.2 本应用不对第三方的侵权行为承担责任。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('6.3 用户使用本应用服务所存在的风险由用户自行承担。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('七、协议修改')
      
      Text('7.1 本应用有权随时修改本协议，修改后的协议将在应用内公布。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('7.2 用户继续使用本应用服务，即表示用户接受修改后的协议。')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 25 })

      this.Section('八、联系我们')
      
      Text('如果您对本协议有任何疑问，请通过以下方式联系我们：')
        .fontSize(14)
        .fontColor('#CCCCCC')
        .width('100%')
        .margin({ bottom: 15 })

      Text('邮箱：support@pedometer.example.com')
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
