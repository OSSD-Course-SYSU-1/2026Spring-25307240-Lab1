# 实现计步器功能

### 简介

基于计步传感器、位置服务和后台任务，实现计步器应用。效果图如下：

![](screenshots/device/pedometer.gif)

### 相关权限

本篇Codelab需要添加以下权限：

- ohos.permission.LOCATION
- ohos.permission.LOCATION_IN_BACKGROUND
- ohos.permission.APPROXIMATELY_LOCATION
- ohos.permission.ACTIVITY_MOTION
- ohos.permission.KEEP_BACKGROUND_RUNNING

### 使用说明

1. 打开应用，显示计步器界面。
2. 在计步器界面，在运动时获取实时位置和计步器数据。
3. 在计步器界面，设置目标步数，点击开始获取计步器数据并计算完成度。
4. 在计步器界面，点击结束停止计算完成度。

### 约束与限制

1. 本示例仅支持标准系统上运行，支持设备：华为手机。
2. HarmonyOS系统：HarmonyOS 5.0.5 Release及以上。
3. DevEco Studio版本：DevEco Studio 6.0.2 Release及以上。
4. HarmonyOS SDK版本：HarmonyOS 6.0.2 Release SDK及以上。
