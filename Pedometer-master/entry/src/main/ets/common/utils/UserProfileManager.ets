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
import { preferences } from '@kit.ArkData';
import Logger from './Logger';
import { CommonConstants } from '../constants/CommonConstants';

const TAG: string = 'UserProfileManager';

/**
 * 用户档案接口
 */
export interface UserProfile {
  weight: number;              // 体重（千克）
  height: number;              // 身高（厘米）
  age: number;                 // 年龄
  gender: 'male' | 'female';   // 性别
  strideLength?: number;       // 步幅（米），可选
}

/**
 * 用户档案管理器
 * 
 * 功能说明:
 * 1. 管理用户身体数据
 * 2. 计算个性化运动参数
 * 3. 持久化用户设置
 * 4. 提供默认值和验证
 */
export class UserProfileManager {
  private context: common.UIAbilityContext;
  private preferences: preferences.Preferences | null = null;
  
  // 默认用户档案
  private readonly DEFAULT_PROFILE: UserProfile = {
    weight: 70,
    height: 170,
    age: 25,
    gender: 'male',
    strideLength: 0.7
  };
  
  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }
  
  /**
   * 初始化用户档案管理器
   */
  async init(): Promise<void> {
    try {
      this.preferences = await preferences.getPreferences(this.context, 'user_profile');
      Logger.info(TAG, 'UserProfileManager initialized');
    } catch (err) {
      Logger.error(TAG, `Init failed: ${JSON.stringify(err)}`);
    }
  }
  
  /**
   * 获取用户档案
   * 
   * @returns Promise<UserProfile> 用户档案
   */
  async getUserProfile(): Promise<UserProfile> {
    if (!this.preferences) {
      await this.init();
    }
    
    try {
      const weight = await this.preferences?.get('weight', this.DEFAULT_PROFILE.weight) as number;
      const height = await this.preferences?.get('height', this.DEFAULT_PROFILE.height) as number;
      const age = await this.preferences?.get('age', this.DEFAULT_PROFILE.age) as number;
      const gender = await this.preferences?.get('gender', this.DEFAULT_PROFILE.gender) as 'male' | 'female';
      
      const profile: UserProfile = {
        weight,
        height,
        age,
        gender,
        strideLength: this.calculateStrideLength(height, gender)
      };
      
      return profile;
    } catch (err) {
      Logger.error(TAG, `Get user profile failed: ${JSON.stringify(err)}`);
      return this.DEFAULT_PROFILE;
    }
  }
  
  /**
   * 保存用户档案
   * 
   * @param profile 用户档案
   */
  async saveUserProfile(profile: UserProfile): Promise<void> {
    if (!this.preferences) {
      await this.init();
    }
    
    try {
      // 验证数据
      const validatedProfile = this.validateProfile(profile);
      
      await this.preferences?.put('weight', validatedProfile.weight);
      await this.preferences?.put('height', validatedProfile.height);
      await this.preferences?.put('age', validatedProfile.age);
      await this.preferences?.put('gender', validatedProfile.gender);
      
      await this.preferences?.flush();
      
      Logger.info(TAG, `User profile saved: ${JSON.stringify(validatedProfile)}`);
    } catch (err) {
      Logger.error(TAG, `Save user profile failed: ${JSON.stringify(err)}`);
    }
  }
  
  /**
   * 计算步幅
   * 根据身高和性别估算步幅
   * 
   * @param height 身高（厘米）
   * @param gender 性别
   * @returns number 步幅（米）
   */
  private calculateStrideLength(height: number, gender: 'male' | 'female'): number {
    // 步幅估算公式：身高 × 0.415（男性）或 0.413（女性）
    const factor = gender === 'male' ? 0.415 : 0.413;
    return (height / 100) * factor; // 身高转换为米
  }
  
  /**
   * 验证用户档案数据
   * 
   * @param profile 用户档案
   * @returns UserProfile 验证后的用户档案
   */
  private validateProfile(profile: UserProfile): UserProfile {
    return {
      weight: Math.max(30, Math.min(200, profile.weight)), // 体重范围：30-200kg
      height: Math.max(100, Math.min(250, profile.height)), // 身高范围：100-250cm
      age: Math.max(1, Math.min(120, profile.age)), // 年龄范围：1-120岁
      gender: profile.gender === 'female' ? 'female' : 'male', // 性别：male或female
      strideLength: profile.strideLength
    };
  }
  
  /**
   * 重置为默认档案
   */
  async resetToDefault(): Promise<void> {
    await this.saveUserProfile(this.DEFAULT_PROFILE);
    Logger.info(TAG, 'User profile reset to default');
  }
  
  /**
   * 获取BMI（身体质量指数）
   * 
   * @param profile 用户档案
   * @returns number BMI值
   */
  calculateBMI(profile: UserProfile): number {
    const heightInMeters = profile.height / 100;
    return profile.weight / (heightInMeters * heightInMeters);
  }
  
  /**
   * 获取BMI分类
   * 
   * @param bmi BMI值
   * @returns string BMI分类
   */
  getBMICategory(bmi: number): string {
    if (bmi < 18.5) {
      return '偏瘦';
    } else if (bmi < 24) {
      return '正常';
    } else if (bmi < 28) {
      return '偏胖';
    } else {
      return '肥胖';
    }
  }
  
  /**
   * 估算基础代谢率（BMR）
   * 使用Mifflin-St Jeor公式
   * 
   * @param profile 用户档案
   * @returns number 基础代谢率（千卡/天）
   */
  calculateBMR(profile: UserProfile): number {
    // Mifflin-St Jeor公式
    // 男性: BMR = 10 × 体重(kg) + 6.25 × 身高(cm) - 5 × 年龄 + 5
    // 女性: BMR = 10 × 体重(kg) + 6.25 × 身高(cm) - 5 × 年龄 - 161
    
    if (profile.gender === 'male') {
      return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
      return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }
  }
}

// 单例实例
let userProfileManager: UserProfileManager | null = null;

/**
 * 获取用户档案管理器实例
 * 
 * @param context 应用上下文
 * @returns UserProfileManager 实例
 */
export function getUserProfileManager(context: common.UIAbilityContext): UserProfileManager {
  if (!userProfileManager) {
    userProfileManager = new UserProfileManager(context);
  }
  return userProfileManager;
}
