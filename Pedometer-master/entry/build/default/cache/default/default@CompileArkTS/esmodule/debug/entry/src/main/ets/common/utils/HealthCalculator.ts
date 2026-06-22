import type { UserProfile } from './UserProfileManager';
const TAG: string = 'HealthCalculator';
/**
 * 健康指标接口
 */
export interface HealthMetrics {
    bmi: number; // 身体质量指数
    bmiCategory: string; // BMI分类
    bmr: number; // 基础代谢率（千卡/天）
    tdee: number; // 每日总能量消耗（千卡/天）
    idealWeight: number; // 理想体重（kg）
    healthyWeightRange: [
        number,
        number
    ]; // 健康体重范围
    bodyFatPercentage?: number; // 体脂率（可选）
}
/**
 * 运动数据接口
 */
export interface ExerciseData {
    steps: number; // 步数
    distance: number; // 距离（米）
    duration: number; // 时长（分钟）
    intensity: ExerciseIntensity; // 运动强度
}
/**
 * 运动强度枚举
 */
export enum ExerciseIntensity {
    SEDENTARY = "sedentary",
    LIGHT = "light",
    MODERATE = "moderate",
    VIGOROUS = "vigorous",
    VERY_VIGOROUS = "very_vigorous" // 非常剧烈
}
/**
 * 卡路里消耗结果接口
 */
export interface CalorieResult {
    totalCalories: number; // 总卡路里消耗
    basalCalories: number; // 基础代谢消耗
    activityCalories: number; // 活动消耗
    stepsCalories: number; // 步行消耗
    distanceCalories: number; // 距离消耗
}
/**
 * 健康指标计算器
 *
 * 功能说明:
 * 1. 计算BMI、BMR、TDEE等健康指标
 * 2. 计算卡路里消耗
 * 3. 评估运动强度
 * 4. 提供健康建议
 */
export class HealthCalculator {
    /**
     * 计算所有健康指标
     *
     * @param profile 用户档案
     * @param activityLevel 活动水平（1-5）
     * @returns HealthMetrics 健康指标
     */
    calculateHealthMetrics(profile: UserProfile, activityLevel: number = 1): HealthMetrics {
        const bmi = this.calculateBMI(profile);
        const bmr = this.calculateBMR(profile);
        const tdee = this.calculateTDEE(bmr, activityLevel);
        const idealWeight = this.calculateIdealWeight(profile);
        const healthyWeightRange = this.calculateHealthyWeightRange(profile.height);
        return {
            bmi: Math.round(bmi * 10) / 10,
            bmiCategory: this.getBMICategory(bmi),
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            idealWeight: Math.round(idealWeight * 10) / 10,
            healthyWeightRange: [
                Math.round(healthyWeightRange[0] * 10) / 10,
                Math.round(healthyWeightRange[1] * 10) / 10
            ]
        };
    }
    /**
     * 计算BMI（身体质量指数）
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
        }
        else if (bmi < 24) {
            return '正常';
        }
        else if (bmi < 28) {
            return '偏胖';
        }
        else {
            return '肥胖';
        }
    }
    /**
     * 获取BMI颜色
     *
     * @param bmi BMI值
     * @returns string 颜色值
     */
    getBMIColor(bmi: number): string {
        if (bmi < 18.5) {
            return '#FFA500'; // 橙色
        }
        else if (bmi < 24) {
            return '#4CAF50'; // 绿色
        }
        else if (bmi < 28) {
            return '#FF9800'; // 橙色
        }
        else {
            return '#F44336'; // 红色
        }
    }
    /**
     * 计算BMR（基础代谢率）
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
        }
        else {
            return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
        }
    }
    /**
     * 计算TDEE（每日总能量消耗）
     *
     * @param bmr 基础代谢率
     * @param activityLevel 活动水平（1-5）
     * @returns number TDEE（千卡/天）
     */
    calculateTDEE(bmr: number, activityLevel: number): number {
        // 活动水平系数
        const factors = [1.2, 1.375, 1.55, 1.725, 1.9];
        const factor = factors[Math.max(0, Math.min(4, activityLevel - 1))];
        return bmr * factor;
    }
    /**
     * 计算理想体重
     * 使用Devine公式
     *
     * @param profile 用户档案
     * @returns number 理想体重（kg）
     */
    calculateIdealWeight(profile: UserProfile): number {
        // Devine公式
        // 男性: 50 + 2.3 × (身高(cm) - 152.4) / 2.54
        // 女性: 45.5 + 2.3 × (身高(cm) - 152.4) / 2.54
        const heightOver5Feet = (profile.height - 152.4) / 2.54;
        if (profile.gender === 'male') {
            return 50 + 2.3 * heightOver5Feet;
        }
        else {
            return 45.5 + 2.3 * heightOver5Feet;
        }
    }
    /**
     * 计算健康体重范围
     * 基于BMI 18.5-24
     *
     * @param height 身高（cm）
     * @returns [number, number] 健康体重范围
     */
    calculateHealthyWeightRange(height: number): [
        number,
        number
    ] {
        const heightInMeters = height / 100;
        const minWeight = 18.5 * heightInMeters * heightInMeters;
        const maxWeight = 24 * heightInMeters * heightInMeters;
        return [minWeight, maxWeight];
    }
    /**
     * 计算卡路里消耗
     *
     * @param profile 用户档案
     * @param exerciseData 运动数据
     * @returns CalorieResult 卡路里消耗结果
     */
    calculateCalories(profile: UserProfile, exerciseData: ExerciseData): CalorieResult {
        // 基础代谢消耗（按分钟计算）
        const bmr = this.calculateBMR(profile);
        const basalCalories = (bmr / 1440) * exerciseData.duration; // 1440 = 24 * 60
        // 步行消耗卡路里
        // 公式: 卡路里 = 0.0175 × MET × 体重(kg) × 时间(分钟)
        // 步行MET值约为3.5
        const stepsMET = 3.5;
        const stepsCalories = 0.0175 * stepsMET * profile.weight * exerciseData.duration;
        // 距离消耗卡路里（基于距离和体重）
        // 粗略估算: 每公里消耗约 1 kcal/kg
        const distanceKm = exerciseData.distance / 1000;
        const distanceCalories = distanceKm * profile.weight;
        // 活动强度系数
        const intensityFactor = this.getIntensityFactor(exerciseData.intensity);
        // 总活动消耗
        const activityCalories = (stepsCalories + distanceCalories) * intensityFactor;
        // 总卡路里消耗
        const totalCalories = basalCalories + activityCalories;
        return {
            totalCalories: Math.round(totalCalories),
            basalCalories: Math.round(basalCalories),
            activityCalories: Math.round(activityCalories),
            stepsCalories: Math.round(stepsCalories * intensityFactor),
            distanceCalories: Math.round(distanceCalories * intensityFactor)
        };
    }
    /**
     * 获取运动强度系数
     *
     * @param intensity 运动强度
     * @returns number 强度系数
     */
    private getIntensityFactor(intensity: ExerciseIntensity): number {
        switch (intensity) {
            case ExerciseIntensity.SEDENTARY:
                return 0.8;
            case ExerciseIntensity.LIGHT:
                return 1.0;
            case ExerciseIntensity.MODERATE:
                return 1.2;
            case ExerciseIntensity.VIGOROUS:
                return 1.5;
            case ExerciseIntensity.VERY_VIGOROUS:
                return 2.0;
            default:
                return 1.0;
        }
    }
    /**
     * 评估运动强度
     *
     * @param stepsPerMinute 每分钟步数
     * @returns ExerciseIntensity 运动强度
     */
    assessIntensity(stepsPerMinute: number): ExerciseIntensity {
        if (stepsPerMinute < 20) {
            return ExerciseIntensity.SEDENTARY;
        }
        else if (stepsPerMinute < 40) {
            return ExerciseIntensity.LIGHT;
        }
        else if (stepsPerMinute < 60) {
            return ExerciseIntensity.MODERATE;
        }
        else if (stepsPerMinute < 80) {
            return ExerciseIntensity.VIGOROUS;
        }
        else {
            return ExerciseIntensity.VERY_VIGOROUS;
        }
    }
    /**
     * 计算步数对应的距离
     *
     * @param steps 步数
     * @param strideLength 步幅（米）
     * @returns number 距离（米）
     */
    calculateDistance(steps: number, strideLength: number): number {
        return steps * strideLength;
    }
    /**
     * 计算步数对应的时间（分钟）
     *
     * @param steps 步数
     * @param stepsPerMinute 每分钟步数
     * @returns number 时间（分钟）
     */
    calculateDuration(steps: number, stepsPerMinute: number): number {
        return steps / stepsPerMinute;
    }
    /**
     * 获取健康建议
     *
     * @param profile 用户档案
     * @param currentSteps 当前步数
     * @param stepGoal 步数目标
     * @returns string[] 健康建议列表
     */
    getHealthAdvice(profile: UserProfile, currentSteps: number, stepGoal: number): string[] {
        const advice: string[] = [];
        const bmi = this.calculateBMI(profile);
        const progress = currentSteps / stepGoal;
        // BMI建议
        if (bmi < 18.5) {
            advice.push('您的体重偏轻，建议适当增加营养摄入');
        }
        else if (bmi >= 24 && bmi < 28) {
            advice.push('您的体重偏重，建议增加运动量');
        }
        else if (bmi >= 28) {
            advice.push('您的体重超标，建议咨询医生制定健康计划');
        }
        // 步数建议
        if (progress < 0.5) {
            advice.push('今日步数较少，建议增加日常活动');
        }
        else if (progress < 0.8) {
            advice.push('继续加油，距离目标还有一点距离');
        }
        else if (progress >= 1.0) {
            advice.push('恭喜！您已完成今日步数目标');
        }
        // 久坐提醒
        advice.push('记得每隔1小时起身活动一下');
        return advice;
    }
}
// 单例实例
let healthCalculator: HealthCalculator | null = null;
/**
 * 获取健康计算器实例
 *
 * @returns HealthCalculator 实例
 */
export function getHealthCalculator(): HealthCalculator {
    if (!healthCalculator) {
        healthCalculator = new HealthCalculator();
    }
    return healthCalculator;
}
