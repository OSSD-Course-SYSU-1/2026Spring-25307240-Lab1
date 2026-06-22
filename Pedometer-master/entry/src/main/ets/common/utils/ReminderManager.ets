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

import notificationManager from '@ohos.notificationManager';
import { wantAgent, WantAgent } from '@kit.AbilityKit';
import { common } from '@kit.AbilityKit';
import reminderAgentManager from '@ohos.reminderAgentManager';
import Logger from './Logger';
import StepsUtil from './StepsUtil';
import { CommonConstants } from '../constants/CommonConstants';

const TAG: string = 'ReminderManager';

/**
 * 提醒类型枚举
 */
export enum ReminderType {
  SEDENTARY = 'sedentary',       // 久坐提醒
  GOAL_ACHIEVED = 'goal_achieved', // 目标达成提醒
  DAILY_GOAL = 'daily_goal',      // 每日目标提醒
  HOURLY = 'hourly'               // 每小时提醒
}

/**
 * 提醒设置接口
 */
export interface ReminderSettings {
  // 久坐提醒设置
  sedentaryEnabled: boolean;
  sedentaryThreshold: number; // 分钟
  
  // 目标达成提醒设置
  goalAchievedEnabled: boolean;
  
  // 每日目标提醒设置
  dailyGoalEnabled: boolean;
  dailyGoalTime: string; // HH:mm格式
  
  // 每小时提醒设置
  hourlyEnabled: boolean;
  hourlyInterval: number; // 小时间隔
  
  // 提醒音和振动
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

/**
 * 提醒历史记录
 */
export interface ReminderHistory {
  type: ReminderType;
  timestamp: number;
  title: string;
  content: string;
}

/**
 * 提醒管理工具类
 * 
 * 功能说明:
 * 1. 管理多种类型的提醒设置
 * 2. 发送系统通知
 * 3. 设置定时提醒
 * 4. 记录提醒历史
 */
export class ReminderManager {
  private context: common.UIAbilityContext;
  private settings: ReminderSettings;
  private history: ReminderHistory[] = [];
  private hasGoalAchieved: boolean = false; // 是否已达成目标（避免重复提醒）
  
  // 通知ID
  private readonly SEDENTARY_NOTIFICATION_ID: number = 1001;
  private readonly GOAL_NOTIFICATION_ID: number = 1002;
  private readonly DAILY_NOTIFICATION_ID: number = 1003;
  private readonly HOURLY_NOTIFICATION_ID: number = 1004;
  
  // 存储键
  private readonly SETTINGS_KEY: string = 'REMINDER_SETTINGS';
  private readonly HISTORY_KEY: string = 'REMINDER_HISTORY';
  
  constructor(context: common.UIAbilityContext) {
    this.context = context;
    this.settings = this.getDefaultSettings();
  }
  
  /**
   * 获取默认设置
   */
  private getDefaultSettings(): ReminderSettings {
    return {
      sedentaryEnabled: true,
      sedentaryThreshold: 60,
      goalAchievedEnabled: true,
      dailyGoalEnabled: false,
      dailyGoalTime: '20:00',
      hourlyEnabled: false,
      hourlyInterval: 1,
      soundEnabled: true,
      vibrationEnabled: true
    };
  }
  
  /**
   * 加载提醒设置
   */
  async loadSettings(): Promise<void> {
    try {
      const settingsStr = await StepsUtil.getStorageValue(this.SETTINGS_KEY);
      if (settingsStr && !StepsUtil.checkStrIsEmpty(settingsStr)) {
        this.settings = JSON.parse(settingsStr);
        Logger.info(TAG, 'Reminder settings loaded');
      }
      
      // 加载历史记录
      const historyStr = await StepsUtil.getStorageValue(this.HISTORY_KEY);
      if (historyStr && !StepsUtil.checkStrIsEmpty(historyStr)) {
        this.history = JSON.parse(historyStr);
      }
    } catch (err) {
      Logger.error(TAG, `Load settings failed: ${JSON.stringify(err)}`);
    }
  }
  
  /**
   * 保存提醒设置
   */
  async saveSettings(): Promise<void> {
    try {
      await StepsUtil.putStorageValue(this.SETTINGS_KEY, JSON.stringify(this.settings));
      Logger.info(TAG, 'Reminder settings saved');
    } catch (err) {
      Logger.error(TAG, `Save settings failed: ${JSON.stringify(err)}`);
    }
  }
  
  /**
   * 获取当前设置
   */
  getSettings(): ReminderSettings {
    return {
      sedentaryEnabled: this.settings.sedentaryEnabled,
      sedentaryThreshold: this.settings.sedentaryThreshold,
      goalAchievedEnabled: this.settings.goalAchievedEnabled,
      dailyGoalEnabled: this.settings.dailyGoalEnabled,
      dailyGoalTime: this.settings.dailyGoalTime,
      hourlyEnabled: this.settings.hourlyEnabled,
      hourlyInterval: this.settings.hourlyInterval,
      soundEnabled: this.settings.soundEnabled,
      vibrationEnabled: this.settings.vibrationEnabled
    };
  }
  
  /**
   * 更新设置
   */
  async updateSettings(newSettings: Partial<ReminderSettings>): Promise<void> {
    if (newSettings.sedentaryEnabled !== undefined) {
      this.settings.sedentaryEnabled = newSettings.sedentaryEnabled;
    }
    if (newSettings.sedentaryThreshold !== undefined) {
      this.settings.sedentaryThreshold = newSettings.sedentaryThreshold;
    }
    if (newSettings.goalAchievedEnabled !== undefined) {
      this.settings.goalAchievedEnabled = newSettings.goalAchievedEnabled;
    }
    if (newSettings.dailyGoalEnabled !== undefined) {
      this.settings.dailyGoalEnabled = newSettings.dailyGoalEnabled;
    }
    if (newSettings.dailyGoalTime !== undefined) {
      this.settings.dailyGoalTime = newSettings.dailyGoalTime;
    }
    if (newSettings.hourlyEnabled !== undefined) {
      this.settings.hourlyEnabled = newSettings.hourlyEnabled;
    }
    if (newSettings.hourlyInterval !== undefined) {
      this.settings.hourlyInterval = newSettings.hourlyInterval;
    }
    if (newSettings.soundEnabled !== undefined) {
      this.settings.soundEnabled = newSettings.soundEnabled;
    }
    if (newSettings.vibrationEnabled !== undefined) {
      this.settings.vibrationEnabled = newSettings.vibrationEnabled;
    }
    await this.saveSettings();
  }
  
  /**
   * 发送久坐提醒
   */
  async sendSedentaryReminder(inactiveMinutes: number): Promise<void> {
    if (!this.settings.sedentaryEnabled) {
      return;
    }
    
    const title = '久坐提醒';
    const content = `您已经连续${inactiveMinutes}分钟没有活动了，起来走走吧！`;
    
    await this.sendNotification(this.SEDENTARY_NOTIFICATION_ID, title, content);
    this.addHistory(ReminderType.SEDENTARY, title, content);
    
    Logger.info(TAG, `Sedentary reminder sent: ${inactiveMinutes} minutes`);
  }
  
  /**
   * 发送目标达成提醒
   */
  async sendGoalAchievedReminder(currentSteps: number, goalSteps: number): Promise<void> {
    if (!this.settings.goalAchievedEnabled || this.hasGoalAchieved) {
      return;
    }
    
    const title = '🎉 目标达成！';
    const content = `恭喜！您已完成今日${goalSteps}步的目标，当前步数：${currentSteps}步`;
    
    await this.sendNotification(this.GOAL_NOTIFICATION_ID, title, content);
    this.addHistory(ReminderType.GOAL_ACHIEVED, title, content);
    this.hasGoalAchieved = true;
    
    Logger.info(TAG, `Goal achieved reminder sent: ${currentSteps}/${goalSteps}`);
  }
  
  /**
   * 重置目标达成状态（新的一天）
   */
  resetGoalStatus(): void {
    this.hasGoalAchieved = false;
    Logger.info(TAG, 'Goal status reset');
  }
  
  /**
   * 检查目标达成
   */
  async checkGoalAchievement(currentSteps: number, goalSteps: number): Promise<void> {
    if (currentSteps >= goalSteps && !this.hasGoalAchieved) {
      await this.sendGoalAchievedReminder(currentSteps, goalSteps);
    }
  }
  
  /**
   * 发送每日目标提醒
   */
  async sendDailyGoalReminder(): Promise<void> {
    if (!this.settings.dailyGoalEnabled) {
      return;
    }
    
    const title = '每日目标提醒';
    const content = `现在是${this.settings.dailyGoalTime}，别忘了完成今日步数目标哦！`;
    
    await this.sendNotification(this.DAILY_NOTIFICATION_ID, title, content);
    this.addHistory(ReminderType.DAILY_GOAL, title, content);
    
    Logger.info(TAG, 'Daily goal reminder sent');
  }
  
  /**
   * 发送每小时提醒
   */
  async sendHourlyReminder(hour: number): Promise<void> {
    if (!this.settings.hourlyEnabled) {
      return;
    }
    
    const title = '运动提醒';
    const content = `现在是${hour}点整，起来活动一下吧！`;
    
    await this.sendNotification(this.HOURLY_NOTIFICATION_ID, title, content);
    this.addHistory(ReminderType.HOURLY, title, content);
    
    Logger.info(TAG, `Hourly reminder sent: ${hour}:00`);
  }
  
  /**
   * 发送系统通知
   */
  private async sendNotification(id: number, title: string, content: string): Promise<void> {
    try {
      // 创建WantAgent用于点击通知后跳转
      const wantAgentInfo: wantAgent.WantAgentInfo = {
        wants: [
          {
            bundleName: this.context.abilityInfo.bundleName,
            abilityName: this.context.abilityInfo.name
          }
        ],
        requestCode: id,
        operationType: wantAgent.OperationType.START_ABILITY,
        wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
      };
      
      const agent: WantAgent = await wantAgent.getWantAgent(wantAgentInfo);
      
      // 构建通知内容
      const notificationRequest: notificationManager.NotificationRequest = {
        id: id,
        content: {
          contentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
          normal: {
            title: title,
            text: content
          }
        } as notificationManager.NotificationContent,
        wantAgent: agent
      };
      
      // 发送通知
      await notificationManager.publish(notificationRequest);
      Logger.info(TAG, `Notification published: ${title}`);
    } catch (err) {
      Logger.error(TAG, `Send notification failed: ${JSON.stringify(err)}`);
    }
  }
  
  /**
   * 取消通知
   */
  async cancelNotification(id: number): Promise<void> {
    try {
      await notificationManager.cancel(id);
      Logger.info(TAG, `Notification cancelled: ${id}`);
    } catch (err) {
      Logger.error(TAG, `Cancel notification failed: ${JSON.stringify(err)}`);
    }
  }
  
  /**
   * 取消所有通知
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await notificationManager.cancelAll();
      Logger.info(TAG, 'All notifications cancelled');
    } catch (err) {
      Logger.error(TAG, `Cancel all notifications failed: ${JSON.stringify(err)}`);
    }
  }
  
  /**
   * 添加提醒历史
   */
  private addHistory(type: ReminderType, title: string, content: string): void {
    const record: ReminderHistory = {
      type: type,
      timestamp: Date.now(),
      title: title,
      content: content
    };
    
    this.history.unshift(record);
    
    // 只保留最近50条记录
    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50);
    }
    
    // 异步保存历史
    StepsUtil.putStorageValue(this.HISTORY_KEY, JSON.stringify(this.history));
  }
  
  /**
   * 获取提醒历史
   */
  getHistory(): ReminderHistory[] {
    return [...this.history];
  }
  
  /**
   * 清空提醒历史
   */
  async clearHistory(): Promise<void> {
    this.history = [];
    await StepsUtil.putStorageValue(this.HISTORY_KEY, '[]');
    Logger.info(TAG, 'Reminder history cleared');
  }
  
  /**
   * 获取今日提醒次数
   */
  getTodayReminderCount(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime();
    
    return this.history.filter(h => h.timestamp >= todayStart).length;
  }
  
  /**
   * 获取各类型今日提醒次数
   */
  getTodayReminderCountByType(): Map<ReminderType, number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime();
    
    const countMap = new Map<ReminderType, number>();
    countMap.set(ReminderType.SEDENTARY, 0);
    countMap.set(ReminderType.GOAL_ACHIEVED, 0);
    countMap.set(ReminderType.DAILY_GOAL, 0);
    countMap.set(ReminderType.HOURLY, 0);
    
    this.history
      .filter(h => h.timestamp >= todayStart)
      .forEach(h => {
        const current = countMap.get(h.type) || 0;
        countMap.set(h.type, current + 1);
      });
    
    return countMap;
  }
}

// 单例管理
let reminderManagerInstance: ReminderManager | null = null;

/**
 * 获取ReminderManager实例
 */
export function getReminderManager(context: common.UIAbilityContext): ReminderManager {
  if (!reminderManagerInstance) {
    reminderManagerInstance = new ReminderManager(context);
  }
  return reminderManagerInstance;
}
