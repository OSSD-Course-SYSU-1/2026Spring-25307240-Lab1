/*
* Copyright (c) 2024 Huawei Device Co., Ltd.
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
import {
  Data, DataSource
} from '../viewmodel/PremiumContentRecommendationModuleData';
import { LoadingStatus } from '../common/CommonEnums';
import { LoadingFailedView } from '../view/LoadingFailedView';
import { BreakpointConstants } from '../common/BreakpointConstants';
import { BreakpointType } from '../util/BreakpointType';
import LazyDataSource from '../util/LazyDataSource';
import { CommonConstants } from '../common/CommonConstants';

@Component
export struct PremiumContentRecommendationModule {
  @State itemModel: Data =
    Data.getInstance();
  @State lazyDataSource: LazyDataSource<DataSource> =
    this.itemModel.lazyDataSource;
  @State moduleTitle: string = "为你推荐";
  @State moduleRedirectContent: string = "查看更多";
  @State rowHeight: number = 150;
  @State rowGap: number = 6;
  private columnGapArray: number[] = [6, 10, 12];
  private columnNumberArray: number[] = [3, 6, 6];
  private rowNumberArray: number[] = [2, 1, 1];
  @Consume('appPathStack') appPathStack: NavPathStack;
  @State loadingStatus: LoadingStatus = LoadingStatus.OFF;
  @StorageLink('currentWidthBreakpoint') currentWidthBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;

  aboutToAppear() {
    this.loadResources();
  }

  jump(pageName: string = 'EmptyPagePathStack'): void {
    this.appPathStack.pushPathByName(pageName, null);
  }

  loadResources(): void {
    this.loadingStatus = LoadingStatus.LOADING;
    this.itemModel.getResources().then(() => {
      this.loadingStatus = LoadingStatus.SUCCESS;
    }).catch(() => {
      this.loadingStatus = LoadingStatus.FAILED;
    });
  }

  build() {
    Column() {
      Column() {
        PremiumContentRecommendationModuleTitleInfo({
          title: this.moduleTitle,
          moduleRedirectContent: this.moduleRedirectContent,
          onJump: () => {
            this.jump()
          }
        })
        if (this.loadingStatus === LoadingStatus.FAILED) {
          LoadingFailedView(() => this.loadResources())
        }
        if (this.loadingStatus === LoadingStatus.SUCCESS) {
          Grid() {
            LazyForEach(this.lazyDataSource,
              (item: DataSource) => {
                GridItem() {
                  StackGraphicButtonItem({
                    image: item.getImage()
                  })
                }
                .borderRadius($r('sys.float.corner_radius_level6'))
              }, (item: DataSource, index: number) => index + JSON.stringify(item))
          }
          .columnsTemplate(("1fr ").repeat(new BreakpointType(this.columnNumberArray[0], this.columnNumberArray[1],
            this.columnNumberArray[2]).getValue(this.currentWidthBreakpoint)).trim())
          .rowsTemplate(("1fr ").repeat(new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1],
            this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint)).trim())
          .height(this.currentWidthBreakpoint !== BreakpointConstants.BREAKPOINT_LG ?
            (this.rowGap + this.rowHeight) * new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1],
              this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint) :
            (this.rowGap + this.rowHeight + 30) * new BreakpointType(this.rowNumberArray[0], this.rowNumberArray[1],
              this.rowNumberArray[2]).getValue(this.currentWidthBreakpoint))
          .columnsGap(new BreakpointType(this.columnGapArray[0], this.columnGapArray[1],
            this.columnGapArray[2]).getValue(this.currentWidthBreakpoint))
          .rowsGap(this.rowGap)
        }
      }
      .width('92%')
      .align(Alignment.Center)
      .borderRadius($r('sys.float.corner_radius_level8'))
      .margin({ bottom: "10vp" })
    }
    .width('100%')
  }
}

@Component
export struct StackGraphicButtonItem {
  @State image: Resource = $r("app.media.noImage");
  @Consume('appPathStack') appPathStack: NavPathStack;

  jump(pageName: string = 'EmptyPagePathStack'): void {
    this.appPathStack.pushPathByName(pageName, null);
  }

  build() {
    Stack({ alignContent: Alignment.BottomEnd }) {
      /**
       * TODO:
       * please modify it according to the actual situation.
       * directly modify {@link Data#IMAGES}
       * or refactor method {@code getResources()} to implement your custom code logic.
       * @see Data#getResources()
       */
      Image(this.image)
        .width(CommonConstants.FULL_PERCENT)
        .height(CommonConstants.FULL_PERCENT)
        .borderRadius($r('sys.float.corner_radius_level6'))
      Button('点击跳转')
        .type(ButtonType.Capsule)
        .controlSize(ControlSize.SMALL)
        .fontColor($r('app.color.font_on_primary'))
        .fontWeight(FontWeight.Regular)
        .backgroundColor($r('app.color.comp_background_emphasize'))
        .margin({ right: 8, bottom: 8 })
        .padding(4)
        .onClick(() => {
          this.jump()
        })
    }
    .height(CommonConstants.FULL_PERCENT)
    .width(CommonConstants.FULL_PERCENT)
  }
}

@Component
export struct PremiumContentRecommendationModuleTitleInfo {
  @StorageLink('currentWidthBreakpoint') currentWidthBreakpoint: string = BreakpointConstants.BREAKPOINT_LG;
  public title: string = '';
  public moduleRedirectContent: string = "查看更多";
  @Consume('appPathStack') appPathStack: NavPathStack;
  public onJump?: () => void;

  jump(): void {
    this.appPathStack.pushPathByName('EmptyPagePathStack', null);
  }

  build() {
    if (this.title.length) {
      Row() {
        Text(this.title)
          .fontSize($r('app.integer.subtitle_text_L'))
          .fontWeight(FontWeight.Bold)
          .fontColor($r('app.color.font_primary'))
        Text(this.moduleRedirectContent)
          .fontColor($r('app.color.font_secondary'))
          .fontSize($r('app.integer.body_text_S'))
          .fontWeight(FontWeight.Medium)
          .onClick(() => {
            if (this.onJump) {
              this.onJump()
            } else {
              this.jump()
            }
          })
      }
      .width(CommonConstants.FULL_PERCENT)
      .height("44vp")
      .justifyContent(FlexAlign.SpaceBetween)
      .borderRadius($r('sys.float.corner_radius_level8'))
    }
  }
}