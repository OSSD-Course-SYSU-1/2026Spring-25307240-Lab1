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

/**
 * 类型定义文件
 * 用于定义应用中使用的所有接口和类型
 */

/**
 * 弹窗数据接口
 */
export interface DialogData {
  steps: number;
  goal: number;
  calories: number;
  distance: number;
  duration: number;
}

/**
 * 统计数据接口
 */
export interface StatisticsData {
  totalDays: number;
  totalSteps: number;
  averageSteps: number;
  totalCalories: number;
  totalDistance: number;
}

/**
 * 运动统计数据接口
 */
export interface ExerciseStatistics {
  totalSteps: number;
  totalCalories: number;
  totalDistance: number;
  averageSteps: number;
  averageCalories: number;
  averageDistance: number;
  maxSteps: number;
  days: number;
}

/**
 * MET值类型
 */
export type MetType = 'slowWalk' | 'normalWalk' | 'briskWalk' | 'jogging' | 'running';

/**
 * MET值映射接口
 */
export interface MetValues {
  slowWalk: number;
  normalWalk: number;
  briskWalk: number;
  jogging: number;
  running: number;
}

/**
 * 图表类型选择器项
 */
export interface ChartTypeItem {
  type: string;
  label: string;
}
