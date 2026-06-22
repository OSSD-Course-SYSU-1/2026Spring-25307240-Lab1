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

import { ExerciseStatistics, MetType, MetValues } from '../types/Types';
import Logger from './Logger';

const TAG: string = 'SportsDataCalculator';

/**
 * 运动数据计算结果
 */
export interface SportsData {
  calories: number;      // 消耗卡路里（千卡）
  distance: number;      // 运动距离（米）
  steps: number;         // 步数
  duration: number;      // 运动时长（分钟）
}

/**
 * 用户身体数据（用于更精确的计算）
 */
export interface UserProfile {
  weight: number;        // 体重（千克）
  height: number;        // 身高（厘米）
  age: number;           // 年龄
  gender: 'male' | 'female'; // 性别
}

/**
 * 运动数据计算工具类
 * 
 * 功能说明:
 * 1. 根据步数计算卡路里消耗
 * 2. 根据步数计算运动距离
 * 3. 支持个性化计算（基于用户身体数据）
 * 4. 提供多种运动强度估算
 * 
 * 计算公式说明:
 * - 卡路里消耗 = 步数 × 步幅 × 体重 × 系数
 * - 运动距离 = 步数 × 步幅
 * - 步幅默认值: 男性约0.7米，女性约0.6米
 */
export class SportsDataCalculator {
  // 默认用户配置
  private defaultWeight: number = 70; // 默认体重70kg
  private defaultHeight: number = 170; // 默认身高170cm
  private defaultStrideLength: number = 0.7; // 默认步幅0.7米
  
  // 卡路里计算系数
  // 步行每公里消耗约0.75 * 体重(kg)千卡
  private readonly CALORIES_PER_KM_FACTOR: number = 0.75;
  
  // 不同运动强度的MET值（代谢当量）
  private readonly MET_VALUES: MetValues = {
    slowWalk: 2.5,      // 慢走
    normalWalk: 3.5,    // 正常步行
    briskWalk: 4.5,     // 快走
    jogging: 7.0,       // 慢跑
    running: 9.8        // 跑步
  };

  private userProfile: UserProfile | null = null;

  /**
   * 设置用户身体数据
   * 用于更精确的运动数据计算
   * 
   * @param profile 用户身体数据
   */
  setUserProfile(profile: UserProfile): void {
    this.userProfile = profile;
    Logger.info(TAG, `User profile set: weight=${profile.weight}kg, height=${profile.height}cm`);
  }

  /**
   * 获取用户步幅
   * 根据身高和性别估算步幅
   * 
   * @returns number 步幅（米）
   */
  private getStrideLength(): number {
    if (this.userProfile) {
      // 步幅估算公式：身高 × 0.415（男性）或 0.413（女性）
      const factor = this.userProfile.gender === 'male' ? 0.415 : 0.413;
      return (this.userProfile.height / 100) * factor; // 身高转换为米
    }
    return this.defaultStrideLength;
  }

  /**
   * 获取用户体重
   * 
   * @returns number 体重（千克）
   */
  private getWeight(): number {
    return this.userProfile?.weight ?? this.defaultWeight;
  }

  /**
   * 计算运动距离
   * 
   * @param steps 步数
   * @returns number 距离（米）
   */
  calculateDistance(steps: number): number {
    if (steps <= 0) {
      return 0;
    }
    
    const strideLength = this.getStrideLength();
    const distance = steps * strideLength;
    
    Logger.info(TAG, `Distance calculated: ${steps} steps = ${distance.toFixed(2)} meters`);
    return distance;
  }

  /**
   * 计算卡路里消耗
   * 使用步数和体重进行计算
   * 
   * @param steps 步数
   * @returns number 卡路里（千卡）
   */
  calculateCalories(steps: number): number {
    if (steps <= 0) {
      return 0;
    }
    
    const distance = this.calculateDistance(steps);
    const distanceKm = distance / 1000; // 转换为公里
    const weight = this.getWeight();
    
    // 卡路里 = 距离(km) × 系数 × 体重(kg)
    const calories = distanceKm * this.CALORIES_PER_KM_FACTOR * weight;
    
    Logger.info(TAG, `Calories calculated: ${steps} steps = ${calories.toFixed(2)} kcal`);
    return calories;
  }

  /**
   * 使用MET值计算卡路里
   * 更精确的计算方法，考虑运动强度
   * 
   * MET（代谢当量）: 表示运动强度相对于静息状态的倍数
   * 卡路里 = MET × 体重(kg) × 时间(小时)
   * 
   * @param steps 步数
   * @param intensity 运动强度类型
   * @returns number 卡路里（千卡）
   */
  calculateCaloriesWithMET(steps: number, intensity: MetType = 'normalWalk'): number {
    if (steps <= 0) {
      return 0;
    }
    
    const distance = this.calculateDistance(steps);
    const distanceKm = distance / 1000;
    
    // 估算步行速度：正常步行约5km/h
    const speedKmPerHour = 5;
    const timeHours = distanceKm / speedKmPerHour;
    
    let met: number = 3.5; // default normalWalk
    switch (intensity) {
      case 'slowWalk':
        met = this.MET_VALUES.slowWalk;
        break;
      case 'normalWalk':
        met = this.MET_VALUES.normalWalk;
        break;
      case 'briskWalk':
        met = this.MET_VALUES.briskWalk;
        break;
      case 'jogging':
        met = this.MET_VALUES.jogging;
        break;
      case 'running':
        met = this.MET_VALUES.running;
        break;
    }
    const weight = this.getWeight();
    
    // 卡路里 = MET × 体重 × 时间
    const calories = met * weight * timeHours;
    
    Logger.info(TAG, `Calories with MET: ${calories.toFixed(2)} kcal (MET=${met})`);
    return calories;
  }

  /**
   * 计算完整的运动数据
   * 
   * @param steps 步数
   * @param durationMinutes 运动时长（分钟），可选
   * @returns SportsData 运动数据对象
   */
  calculateSportsData(steps: number, durationMinutes?: number): SportsData {
    const distance = this.calculateDistance(steps);
    const calories = this.calculateCalories(steps);
    
    // 如果没有提供时长，根据步数估算
    // 假设正常步行速度为100步/分钟
    const duration = durationMinutes ?? Math.round(steps / 100);
    
    return {
      steps: steps,
      calories: Math.round(calories * 10) / 10, // 保留一位小数
      distance: Math.round(distance),
      duration: duration
    };
  }

  /**
   * 格式化距离显示
   * 
   * @param distanceMeters 距离（米）
   * @returns string 格式化后的距离字符串
   */
  formatDistance(distanceMeters: number): string {
    if (distanceMeters < 1000) {
      return `${Math.round(distanceMeters)}米`;
    } else {
      const km = distanceMeters / 1000;
      return `${km.toFixed(2)}公里`;
    }
  }

  /**
   * 格式化卡路里显示
   * 
   * @param calories 卡路里（千卡）
   * @returns string 格式化后的卡路里字符串
   */
  formatCalories(calories: number): string {
    return `${Math.round(calories)}千卡`;
  }

  /**
   * 计算步数目标完成进度
   * 
   * @param currentSteps 当前步数
   * @param goalSteps 目标步数
   * @returns number 完成百分比（0-100）
   */
  calculateProgress(currentSteps: number, goalSteps: number): number {
    if (goalSteps <= 0) {
      return 0;
    }
    
    const progress = Math.round((currentSteps / goalSteps) * 100);
    return Math.min(progress, 100); // 最大100%
  }

  /**
   * 估算达到目标所需时间
   * 
   * @param currentSteps 当前步数
   * @param goalSteps 目标步数
   * @param stepsPerMinute 每分钟步数（默认100步/分钟）
   * @returns number 所需分钟数
   */
  estimateTimeToGoal(currentSteps: number, goalSteps: number, stepsPerMinute: number = 100): number {
    if (currentSteps >= goalSteps) {
      return 0;
    }
    
    const remainingSteps = goalSteps - currentSteps;
    return Math.ceil(remainingSteps / stepsPerMinute);
  }

  /**
   * 获取运动建议
   * 根据当前步数给出运动建议
   * 
   * @param steps 当前步数
   * @param goal 目标步数
   * @returns string 运动建议
   */
  getExerciseSuggestion(steps: number, goal: number): string {
    const progress = this.calculateProgress(steps, goal);
    
    if (progress >= 100) {
      return '恭喜！您已完成今日目标！';
    } else if (progress >= 80) {
      return '太棒了！再坚持一下就能达成目标！';
    } else if (progress >= 50) {
      return '已经完成一半了，继续加油！';
    } else if (progress >= 30) {
      return '不错的开始，保持这个节奏！';
    } else if (steps > 0) {
      return '开始运动了，坚持下去！';
    } else {
      return '开始今天的运动吧！';
    }
  }

  /**
   * 计算周/月统计数据
   * 
   * @param records 历史记录数组
   * @returns object 统计数据
   */
  calculateStatistics(records: SportsData[]): ExerciseStatistics {
    if (records.length === 0) {
      const emptyResult: ExerciseStatistics = {
        totalSteps: 0,
        totalCalories: 0,
        totalDistance: 0,
        averageSteps: 0,
        averageCalories: 0,
        averageDistance: 0,
        maxSteps: 0,
        days: 0
      };
      return emptyResult;
    }
    
    const totalSteps = records.reduce((sum, r) => sum + r.steps, 0);
    const totalCalories = records.reduce((sum, r) => sum + r.calories, 0);
    const totalDistance = records.reduce((sum, r) => sum + r.distance, 0);
    const maxSteps = Math.max(...records.map(r => r.steps));
    
    const result: ExerciseStatistics = {
      totalSteps: totalSteps,
      totalCalories: Math.round(totalCalories * 10) / 10,
      totalDistance: Math.round(totalDistance),
      averageSteps: Math.round(totalSteps / records.length),
      averageCalories: Math.round((totalCalories / records.length) * 10) / 10,
      averageDistance: Math.round(totalDistance / records.length),
      maxSteps: maxSteps,
      days: records.length
    };
    return result;
  }
}

// 单例实例
let sportsDataCalculator: SportsDataCalculator | null = null;

/**
 * 获取运动数据计算器实例
 * 
 * @returns SportsDataCalculator 实例
 */
export function getSportsDataCalculator(): SportsDataCalculator {
  if (!sportsDataCalculator) {
    sportsDataCalculator = new SportsDataCalculator();
  }
  return sportsDataCalculator;
}
