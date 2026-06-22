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
import { LoadingStatus } from '../common/CommonEnums';
import { LoadingFailedView } from '../view/LoadingFailedView';
import { BreakpointConstants } from '../common/BreakpointConstants';
import { BreakpointType } from '../util/BreakpointType';
import LazyDataSource from '../util/LazyDataSource';
import { CommonConstants } from '../common/CommonConstants';
import {
  Data, DataSource
} from '../viewmodel/DeviceConnectionStatusModuleData';

@Component
export struct DeviceConnectionStatusModule {
  @State itemModel: Data =
    Data.getInstance();
  @Prop listDirection: Axis = Axis.Horizontal
  @State moduleTitle: string = "模块名";
  @State moduleRedirectContent: string = "跳转";
  @State loadingStatus: LoadingStatus = LoadingStatus.OFF;
  @State lazyDataSource: LazyDataSource<DataSource> =
    this.itemModel.lazyDataSource;
  private spaceArray: string[] = ['2vp', '16vp', '20vp'];
  @Consume('appPathStack') appPathStack: NavPathStack;
  @StorageLink('currentWidthBreakpoint') currentWidthBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;

  jump(pageName: string = 'EmptyPagePathStack'): void {
    this.appPathStack.pushPathByName(pageName, null);
  }

  aboutToAppear() {
    this.loadResources();
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
      if (this.loadingStatus === LoadingStatus.FAILED) {
        LoadingFailedView(() => this.loadResources())
      }
      if (this.loadingStatus === LoadingStatus.SUCCESS) {
        List({
          space: new BreakpointType(this.spaceArray[0], this.spaceArray[1],
            this.spaceArray[2]).getValue(this.currentWidthBreakpoint)
        }) {
          LazyForEach(this.lazyDataSource, (item: DataSource, index: number) => {
            ListItem() {
              VerticalGraphicTextFunctionItem1({
                title: item.getTitle(),
                icon: item.getIcon()
              })
            }
            .width(58)
            .height(60)
            .onClick(() => {
              this.jump("DeviceConnectionStatusModuleDetail" + index.toString())
            })
          }, (item: DataSource, index: number) => index + JSON.stringify(item))
        }
        .width('100%')
        .edgeEffect(EdgeEffect.Spring, { alwaysEnabled: true })
        .listDirection(this.listDirection)
        .scrollBar(BarState.Off)
      }
    }
    .width('92%')
    .margin({ bottom: "10vp" })
  }
}

@Component
export struct VerticalGraphicTextFunctionItem1 {
  @State icon: Resource = $r('app.media.icon')
  @State title: string = '功能名'

  build() {
    Column() {
      Image(this.icon)
        .width('65%')
        .fillColor($r('app.color.comp_background_emphasize'))
        .margin({ bottom: 3 })
      Text(this.title)
        .fontColor($r('app.color.font_secondary'))
        .fontSize($r('app.integer.body_text_S'))
        .fontWeight(FontWeight.Medium)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .maxLines(1)
        .width("90%")
        .textAlign(TextAlign.Center)
    }
    .justifyContent(FlexAlign.Center)
    .borderRadius($r('sys.float.corner_radius_level4'))
    .width(CommonConstants.FULL_PERCENT)
    .height(CommonConstants.FULL_PERCENT)
  }
}