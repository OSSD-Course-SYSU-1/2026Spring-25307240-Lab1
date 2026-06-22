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

import { relationalStore } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';
import { StatisticsData } from '../types/Types';
import Logger from './Logger';

const TAG: string = 'StepDatabaseUtil';

/**
 * 步数数据表结构定义
 * 表名: step_history
 * 字段:
 *   - id: 主键，自增
 *   - date: 日期，格式 YYYY-MM-DD
 *   - steps: 当日步数
 *   - goal: 当日目标步数
 *   - calories: 消耗卡路里
 *   - distance: 运动距离(米)
 *   - create_time: 创建时间戳
 */
export interface StepRecord {
  id?: number;
  date: string;
  steps: number;
  goal: number;
  calories: number;
  distance: number;
  createTime?: number;
}

/**
 * 数据库工具类 - 用于历史步数数据的本地存储
 * 
 * 使用的HarmonyOS API:
 * - @kit.ArkData.relationalStore: 关系型数据库API
 * 
 * 功能说明:
 * 1. 创建步数历史数据表
 * 2. 插入/更新每日步数记录
 * 3. 按日期范围查询历史数据
 * 4. 查询历史最佳记录
 */
export class StepDatabaseUtil {
  private rdbStore: relationalStore.RdbStore | null = null;
  private context: common.UIAbilityContext;
  
  // 数据库配置常量
  private readonly DB_NAME: string = 'StepHistory.db';
  private readonly TABLE_NAME: string = 'step_history';
  
  // SQL建表语句
  private readonly CREATE_TABLE_SQL: string = `
    CREATE TABLE IF NOT EXISTS step_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      steps INTEGER NOT NULL DEFAULT 0,
      goal INTEGER NOT NULL DEFAULT 0,
      calories REAL NOT NULL DEFAULT 0,
      distance REAL NOT NULL DEFAULT 0,
      create_time INTEGER NOT NULL
    )
  `;
  
  // 创建日期索引，提高查询效率
  private readonly CREATE_INDEX_SQL: string = `
    CREATE INDEX IF NOT EXISTS idx_date ON step_history(date)
  `;

  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }

  /**
   * 初始化数据库
   * 创建数据库连接和表结构
   * 
   * @returns Promise<boolean> 初始化是否成功
   */
  async initDatabase(): Promise<boolean> {
    try {
      // 配置数据库创建参数
      const config: relationalStore.StoreConfig = {
        name: this.DB_NAME,
        securityLevel: relationalStore.SecurityLevel.S1 // S1级别：设备解锁后可读写
      };
      
      // 获取RdbStore实例
      this.rdbStore = await relationalStore.getRdbStore(this.context, config);
      Logger.info(TAG, 'Database created successfully');
      
      // 创建数据表
      await this.rdbStore.executeSql(this.CREATE_TABLE_SQL);
      Logger.info(TAG, 'Table created successfully');
      
      // 创建索引
      await this.rdbStore.executeSql(this.CREATE_INDEX_SQL);
      Logger.info(TAG, 'Index created successfully');
      
      return true;
    } catch (err) {
      Logger.error(TAG, `Init database failed: ${JSON.stringify(err)}`);
      return false;
    }
  }

  /**
   * 保存或更新当日步数记录
   * 如果该日期已有记录则更新，否则插入新记录
   * 
   * @param record 步数记录数据
   * @returns Promise<boolean> 操作是否成功
   */
  async saveStepRecord(record: StepRecord): Promise<boolean> {
    if (!this.rdbStore) {
      Logger.error(TAG, 'RdbStore is null, please init first');
      return false;
    }

    try {
      // 先查询是否存在该日期的记录
      const existingRecord = await this.getRecordByDate(record.date);
      
      const valueBucket: relationalStore.ValuesBucket = {
        'date': record.date,
        'steps': record.steps,
        'goal': record.goal,
        'calories': record.calories,
        'distance': record.distance,
        'create_time': Date.now()
      };

      if (existingRecord) {
        // 更新现有记录
        const predicates = new relationalStore.RdbPredicates(this.TABLE_NAME);
        predicates.equalTo('date', record.date);
        
        const updateResult = await this.rdbStore.update(valueBucket, predicates);
        Logger.info(TAG, `Update record for date: ${record.date}, affected rows: ${updateResult}`);
      } else {
        // 插入新记录
        const insertResult = await this.rdbStore.insert(this.TABLE_NAME, valueBucket);
        Logger.info(TAG, `Insert record for date: ${record.date}, rowId: ${insertResult}`);
      }
      
      return true;
    } catch (err) {
      Logger.error(TAG, `Save step record failed: ${JSON.stringify(err)}`);
      return false;
    }
  }

  /**
   * 根据日期获取步数记录
   * 
   * @param date 日期字符串，格式 YYYY-MM-DD
   * @returns Promise<StepRecord | null> 步数记录或null
   */
  async getRecordByDate(date: string): Promise<StepRecord | null> {
    if (!this.rdbStore) {
      Logger.error(TAG, 'RdbStore is null');
      return null;
    }

    try {
      const predicates = new relationalStore.RdbPredicates(this.TABLE_NAME);
      predicates.equalTo('date', date);
      
      const resultSet = await this.rdbStore.query(predicates);
      
      if (resultSet.goToFirstRow()) {
        const record: StepRecord = {
          id: resultSet.getLong(resultSet.getColumnIndex('id')),
          date: resultSet.getString(resultSet.getColumnIndex('date')),
          steps: resultSet.getLong(resultSet.getColumnIndex('steps')),
          goal: resultSet.getLong(resultSet.getColumnIndex('goal')),
          calories: resultSet.getDouble(resultSet.getColumnIndex('calories')),
          distance: resultSet.getDouble(resultSet.getColumnIndex('distance')),
          createTime: resultSet.getLong(resultSet.getColumnIndex('create_time'))
        };
        resultSet.close();
        return record;
      }
      
      resultSet.close();
      return null;
    } catch (err) {
      Logger.error(TAG, `Get record by date failed: ${JSON.stringify(err)}`);
      return null;
    }
  }

  /**
   * 获取指定日期范围的步数记录
   * 用于绘制趋势图
   * 
   * @param startDate 开始日期 YYYY-MM-DD
   * @param endDate 结束日期 YYYY-MM-DD
   * @returns Promise<StepRecord[]> 步数记录数组
   */
  async getRecordsByDateRange(startDate: string, endDate: string): Promise<StepRecord[]> {
    if (!this.rdbStore) {
      Logger.error(TAG, 'RdbStore is null');
      return [];
    }

    try {
      const predicates = new relationalStore.RdbPredicates(this.TABLE_NAME);
      predicates.between('date', startDate, endDate);
      predicates.orderByAsc('date'); // 按日期升序排列
      
      const resultSet = await this.rdbStore.query(predicates);
      const records: StepRecord[] = [];
      
      while (resultSet.goToNextRow()) {
        const record: StepRecord = {
          id: resultSet.getLong(resultSet.getColumnIndex('id')),
          date: resultSet.getString(resultSet.getColumnIndex('date')),
          steps: resultSet.getLong(resultSet.getColumnIndex('steps')),
          goal: resultSet.getLong(resultSet.getColumnIndex('goal')),
          calories: resultSet.getDouble(resultSet.getColumnIndex('calories')),
          distance: resultSet.getDouble(resultSet.getColumnIndex('distance')),
          createTime: resultSet.getLong(resultSet.getColumnIndex('create_time'))
        };
        records.push(record);
      }
      
      resultSet.close();
      Logger.info(TAG, `Query records from ${startDate} to ${endDate}, count: ${records.length}`);
      return records;
    } catch (err) {
      Logger.error(TAG, `Get records by date range failed: ${JSON.stringify(err)}`);
      return [];
    }
  }

  /**
   * 获取最近N天的步数记录
   * 
   * @param days 天数
   * @returns Promise<StepRecord[]> 步数记录数组
   */
  async getRecentRecords(days: number): Promise<StepRecord[]> {
    const endDate = this.formatDate(new Date());
    const startDate = this.formatDate(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
    
    return await this.getRecordsByDateRange(startDate, endDate);
  }

  /**
   * 获取历史最佳记录（步数最多的一天）
   * 
   * @returns Promise<StepRecord | null> 最佳记录或null
   */
  async getBestRecord(): Promise<StepRecord | null> {
    if (!this.rdbStore) {
      Logger.error(TAG, 'RdbStore is null');
      return null;
    }

    try {
      const predicates = new relationalStore.RdbPredicates(this.TABLE_NAME);
      predicates.orderByDesc('steps'); // 按步数降序
      predicates.limitAs(1); // 只取第一条
      
      const resultSet = await this.rdbStore.query(predicates);
      
      if (resultSet.goToFirstRow()) {
        const record: StepRecord = {
          id: resultSet.getLong(resultSet.getColumnIndex('id')),
          date: resultSet.getString(resultSet.getColumnIndex('date')),
          steps: resultSet.getLong(resultSet.getColumnIndex('steps')),
          goal: resultSet.getLong(resultSet.getColumnIndex('goal')),
          calories: resultSet.getDouble(resultSet.getColumnIndex('calories')),
          distance: resultSet.getDouble(resultSet.getColumnIndex('distance')),
          createTime: resultSet.getLong(resultSet.getColumnIndex('create_time'))
        };
        resultSet.close();
        return record;
      }
      
      resultSet.close();
      return null;
    } catch (err) {
      Logger.error(TAG, `Get best record failed: ${JSON.stringify(err)}`);
      return null;
    }
  }

  /**
   * 获取统计数据
   * 
   * @returns Promise<Object> 包含总步数、平均步数、总天数等统计信息
   */
  async getStatistics(): Promise<StatisticsData> {
    const emptyResult: StatisticsData = {
      totalDays: 0,
      totalSteps: 0,
      averageSteps: 0,
      totalCalories: 0,
      totalDistance: 0
    };
    
    if (!this.rdbStore) {
      Logger.error(TAG, 'RdbStore is null');
      return emptyResult;
    }

    try {
      // 查询总记录数
      const countPredicates = new relationalStore.RdbPredicates(this.TABLE_NAME);
      const countResultSet = await this.rdbStore.query(countPredicates, ['COUNT(*) as total']);
      let totalDays = 0;
      if (countResultSet.goToFirstRow()) {
        totalDays = countResultSet.getLong(countResultSet.getColumnIndex('total'));
      }
      countResultSet.close();

      // 查询总步数
      const sumPredicates = new relationalStore.RdbPredicates(this.TABLE_NAME);
      const sumResultSet = await this.rdbStore.query(sumPredicates, ['SUM(steps) as total_steps', 'SUM(calories) as total_calories', 'SUM(distance) as total_distance']);
      let totalSteps = 0;
      let totalCalories = 0;
      let totalDistance = 0;
      if (sumResultSet.goToFirstRow()) {
        totalSteps = sumResultSet.getLong(sumResultSet.getColumnIndex('total_steps'));
        totalCalories = sumResultSet.getDouble(sumResultSet.getColumnIndex('total_calories'));
        totalDistance = sumResultSet.getDouble(sumResultSet.getColumnIndex('total_distance'));
      }
      sumResultSet.close();

      const result: StatisticsData = {
        totalDays: totalDays,
        totalSteps: totalSteps,
        averageSteps: totalDays > 0 ? Math.round(totalSteps / totalDays) : 0,
        totalCalories: totalCalories,
        totalDistance: totalDistance
      };
      return result;
    } catch (err) {
      Logger.error(TAG, `Get statistics failed: ${JSON.stringify(err)}`);
      const emptyResult: StatisticsData = {
        totalDays: 0,
        totalSteps: 0,
        averageSteps: 0,
        totalCalories: 0,
        totalDistance: 0
      };
      return emptyResult;
    }
  }

  /**
   * 删除指定日期之前的记录（数据清理）
   * 
   * @param beforeDate 日期字符串 YYYY-MM-DD
   * @returns Promise<number> 删除的记录数
   */
  async deleteOldRecords(beforeDate: string): Promise<number> {
    if (!this.rdbStore) {
      Logger.error(TAG, 'RdbStore is null');
      return 0;
    }

    try {
      const predicates = new relationalStore.RdbPredicates(this.TABLE_NAME);
      predicates.lessThan('date', beforeDate);
      
      const deleteResult = await this.rdbStore.delete(predicates);
      Logger.info(TAG, `Delete ${deleteResult} records before ${beforeDate}`);
      return deleteResult;
    } catch (err) {
      Logger.error(TAG, `Delete old records failed: ${JSON.stringify(err)}`);
      return 0;
    }
  }

  /**
   * 格式化日期为 YYYY-MM-DD 格式
   * 
   * @param date Date对象
   * @returns string 格式化后的日期字符串
   */
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * 获取今天的日期字符串
   * 
   * @returns string 今天的日期 YYYY-MM-DD
   */
  getTodayDate(): string {
    return this.formatDate(new Date());
  }

  /**
   * 关闭数据库连接
   */
  async closeDatabase(): Promise<void> {
    if (this.rdbStore) {
      await relationalStore.deleteRdbStore(this.context, this.DB_NAME);
      this.rdbStore = null;
      Logger.info(TAG, 'Database closed');
    }
  }
}

// 单例模式
let stepDatabaseUtil: StepDatabaseUtil | null = null;

/**
 * 获取数据库工具类实例
 * 
 * @param context 应用上下文
 * @returns StepDatabaseUtil 实例
 */
export function getStepDatabaseUtil(context: common.UIAbilityContext): StepDatabaseUtil {
  if (!stepDatabaseUtil) {
    stepDatabaseUtil = new StepDatabaseUtil(context);
  }
  return stepDatabaseUtil;
}
