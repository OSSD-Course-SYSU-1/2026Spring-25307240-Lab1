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
import { router } from '@kit.ArkUI';
import { CommonConstants } from '../common/constants/CommonConstants';
import StepsUtil from '../common/utils/StepsUtil';
import Logger from '../common/utils/Logger';
import { getUserProfileManager, UserProfile } from '../common/utils/UserProfileManager';
import { getCacheManager } from '../common/utils/CacheManager';

const TAG: string = 'SettingsPage';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');

/**
 * 设置页面
 */
@Entry
@Component
struct SettingsPage {
  @State stepGoal: string = '';
  @State userProfile: UserProfile = {
    weight: 70,
    height: 170,
    age: 25,
    gender: 'male',
    strideLength: 0.7
  };
  @State cacheSize: string = '0 KB';
  @State isLoggedIn: boolean = false;
  @State userName: string = '未登录';
  
  private context: common.UIAbilityContext = uiContext?.getHostContext() as common.UIAbilityContext;
  private profileManager = getUserProfileManager(this.context);
  private cacheManager = getCacheManager();

  async aboutToAppear() {
    await this.loadSettings();
    this.calculateCacheSize();
  }

  private async loadSettings(): Promise<void> {
    try {
      const goalStr = await StepsUtil.getStorageValue(CommonConstants.STEP_GOAL);
      if (goalStr && !StepsUtil.checkStrIsEmpty(goalStr)) {
        this.stepGoal = goalStr;
      }
      
      const profile = await this.profileManager.getUserProfile();
      if (profile) {
        this.userProfile = profile;
      }
      
      Logger.info(TAG, 'Settings loaded');
    } catch (err) {
      Logger.error(TAG, `Load settings failed: ${JSON.stringify(err)}`);
    }
  }
  
  /**
   * 计算缓存大小
   */
  private calculateCacheSize(): void {
    const stats = this.cacheManager.getStatistics();
    const sizeInKB = stats.totalSize / 1024;
    if (sizeInKB < 1024) {
      this.cacheSize = `${sizeInKB.toFixed(2)} KB`;
    } else {
      const sizeInMB = sizeInKB / 1024;
      this.cacheSize = `${sizeInMB.toFixed(2)} MB`;
    }
  }
  
  /**
   * 清除缓存
   */
  private clearCache(): void {
    try {
      this.cacheManager.clear();
      this.calculateCacheSize();
      this.getUIContext().getPromptAction().showToast({
        message: '缓存已清除',
        duration: 2000
      });
      Logger.info(TAG, 'Cache cleared');
    } catch (err) {
      Logger.error(TAG, `Clear cache failed: ${JSON.stringify(err)}`);
      this.getUIContext().getPromptAction().showToast({
        message: '清除缓存失败',
        duration: 2000
      });
    }
  }
  
  /**
   * 退出登录
   */
  private logout(): void {
    this.isLoggedIn = false;
    this.userName = '未登录';
    this.getUIContext().getPromptAction().showToast({
      message: '已退出登录',
      duration: 2000
    });
  }

  build() {
    Column() {
      // 标题栏
      this.HeaderBar()
      
      Scroll() {
        Column() {
          // 账号管理
          this.AccountSection()
          
          // 基础通用设置
          this.BasicSettingsSection()
          
          // 关于我们
          this.AboutSection()
          
          // 反馈与帮助
          this.FeedbackSection()
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
  
  /**
   * 标题栏
   */
  @Builder
  HeaderBar() {
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

      Text('设置')
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
  }
  
  /**
   * 账号管理
   */
  @Builder
  AccountSection() {
    Column() {
      Text('账号管理')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor('#FFFFFF')
        .width('100%')
        .margin({ bottom: 15 })

      // 登录/用户信息
      Row() {
        Row() {
          Text('👤')
            .fontSize(24)
          
          Column() {
            Text(this.isLoggedIn ? this.userName : '点击登录')
              .fontSize(14)
              .fontColor('#CCCCCC')
            
            if (this.isLoggedIn) {
              Text('已登录')
                .fontSize(12)
                .fontColor('#4ECDC4')
                .margin({ top: 4 })
            }
          }
          .alignItems(HorizontalAlign.Start)
          .margin({ left: 12 })
        }
        
        Blank()
        
        Text('>')
          .fontSize(16)
          .fontColor('#666666')
      }
      .width('100%')
      .height(60)
      .onClick(() => {
        if (this.isLoggedIn) {
          // 显示账号管理选项
          this.showAccountOptions();
        } else {
          // 模拟登录
          this.isLoggedIn = true;
          this.userName = '用户123456';
          this.getUIContext().getPromptAction().showToast({
            message: '登录成功',
            duration: 2000
          });
        }
      })

      Divider().color('#33FFFFFF')

      // 退出登录
      if (this.isLoggedIn) {
        Row() {
          Text('退出登录')
            .fontSize(14)
            .fontColor('#FF6B6B')
          
          Blank()
          
          Text('>')
            .fontSize(16)
            .fontColor('#666666')
        }
        .width('100%')
        .height(50)
        .onClick(() => {
          this.logout();
        })
      }
    }
    .width('100%')
    .padding(15)
    .backgroundColor('#1A1A1A')
    .borderRadius(12)
    .margin({ top: 10 })
    .shadow({
      radius: 20,
      color: '#33D3D3D3',
      offsetX: 0,
      offsetY: 0
    })
  }
  
  /**
   * 基础通用设置
   */
  @Builder
  BasicSettingsSection() {
    Column() {
      Text('基础通用设置')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor('#FFFFFF')
        .width('100%')
        .margin({ bottom: 15 })

      // 步数目标
      Row() {
        Text('每日步数目标')
          .fontSize(14)
          .fontColor('#CCCCCC')
        
        Blank()
        
        Text(`${this.stepGoal || '20000'} 步`)
          .fontSize(14)
          .fontColor('#AAAAAA')
        
        Text('>')
          .fontSize(16)
          .fontColor('#666666')
          .margin({ left: 8 })
      }
      .width('100%')
      .height(50)
      .onClick(() => {
        // TODO: 打开步数目标设置页面
        this.getUIContext().getPromptAction().showToast({
          message: '步数目标设置',
          duration: 2000
        });
      })

      Divider().color('#33FFFFFF')

      // 用户档案
      Row() {
        Text('用户档案')
          .fontSize(14)
          .fontColor('#CCCCCC')
        
        Blank()
        
        Text(`${this.userProfile.height}cm / ${this.userProfile.weight}kg`)
          .fontSize(14)
          .fontColor('#AAAAAA')
        
        Text('>')
          .fontSize(16)
          .fontColor('#666666')
          .margin({ left: 8 })
      }
      .width('100%')
      .height(50)
      .onClick(() => {
        // TODO: 打开用户档案设置页面
        this.getUIContext().getPromptAction().showToast({
          message: '用户档案设置',
          duration: 2000
        });
      })

      Divider().color('#33FFFFFF')

      // 清除缓存
      Row() {
        Text('清除缓存')
          .fontSize(14)
          .fontColor('#CCCCCC')
        
        Blank()
        
        Text(this.cacheSize)
          .fontSize(14)
          .fontColor('#AAAAAA')
        
        Text('>')
          .fontSize(16)
          .fontColor('#666666')
          .margin({ left: 8 })
      }
      .width('100%')
      .height(50)
      .onClick(() => {
        this.clearCache();
      })
    }
    .width('100%')
    .padding(15)
    .backgroundColor('#1A1A1A')
    .borderRadius(12)
    .margin({ top: 10 })
    .shadow({
      radius: 20,
      color: '#33D3D3D3',
      offsetX: 0,
      offsetY: 0
    })
  }
  
  /**
   * 关于我们
   */
  @Builder
  AboutSection() {
    Column() {
      Text('关于我们')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor('#FFFFFF')
        .width('100%')
        .margin({ bottom: 15 })

      // 版本号
      Row() {
        Text('版本号')
          .fontSize(14)
          .fontColor('#CCCCCC')
        
        Blank()
        
        Text('1.0.0')
          .fontSize(14)
          .fontColor('#AAAAAA')
      }
      .width('100%')
      .height(50)

      Divider().color('#33FFFFFF')

      // 用户协议
      Row() {
        Text('用户协议')
          .fontSize(14)
          .fontColor('#CCCCCC')
        
        Blank()
        
        Text('>')
          .fontSize(16)
          .fontColor('#666666')
      }
      .width('100%')
      .height(50)
      .onClick(() => {
        router.pushUrl({
          url: 'pages/UserAgreementPage'
        });
      })

      Divider().color('#33FFFFFF')

      // 隐私政策
      Row() {
        Text('隐私政策')
          .fontSize(14)
          .fontColor('#CCCCCC')
        
        Blank()
        
        Text('>')
          .fontSize(16)
          .fontColor('#666666')
      }
      .width('100%')
      .height(50)
      .onClick(() => {
        router.pushUrl({
          url: 'pages/PrivacyPolicyPage'
        });
      })
    }
    .width('100%')
    .padding(15)
    .backgroundColor('#1A1A1A')
    .borderRadius(12)
    .margin({ top: 10 })
    .shadow({
      radius: 20,
      color: '#33D3D3D3',
      offsetX: 0,
      offsetY: 0
    })
  }
  
  /**
   * 反馈与帮助
   */
  @Builder
  FeedbackSection() {
    Column() {
      Text('反馈与帮助')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor('#FFFFFF')
        .width('100%')
        .margin({ bottom: 15 })

      // 意见反馈
      Row() {
        Text('意见反馈')
          .fontSize(14)
          .fontColor('#CCCCCC')
        
        Blank()
        
        Text('>')
          .fontSize(16)
          .fontColor('#666666')
      }
      .width('100%')
      .height(50)
      .onClick(() => {
        router.pushUrl({
          url: 'pages/FeedbackPage'
        });
      })

      Divider().color('#33FFFFFF')

      // 常见问题
      Row() {
        Text('常见问题 FAQ')
          .fontSize(14)
          .fontColor('#CCCCCC')
        
        Blank()
        
        Text('>')
          .fontSize(16)
          .fontColor('#666666')
      }
      .width('100%')
      .height(50)
      .onClick(() => {
        router.pushUrl({
          url: 'pages/FAQPage'
        });
      })
    }
    .width('100%')
    .padding(15)
    .backgroundColor('#1A1A1A')
    .borderRadius(12)
    .margin({ top: 10 })
    .shadow({
      radius: 20,
      color: '#33D3D3D3',
      offsetX: 0,
      offsetY: 0
    })
  }
  
  /**
   * 显示账号管理选项
   */
  private showAccountOptions(): void {
    // 这里可以显示一个对话框让用户选择切换账号或退出登录
    this.getUIContext().getPromptAction().showDialog({
      title: '账号管理',
      message: `当前账号: ${this.userName}`,
      buttons: [
        { text: '切换账号', color: '#4ECDC4' },
        { text: '退出登录', color: '#FF6B6B' },
        { text: '取消', color: '#666666' }
      ]
    }).then((result) => {
      if (result.index === 0) {
        // 切换账号
        this.getUIContext().getPromptAction().showToast({
          message: '切换账号功能',
          duration: 2000
        });
      } else if (result.index === 1) {
        // 退出登录
        this.logout();
      }
    });
  }
}
