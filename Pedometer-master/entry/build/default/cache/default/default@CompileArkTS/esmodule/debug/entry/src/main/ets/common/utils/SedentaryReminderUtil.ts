import notificationManager from "@ohos:notificationManager";
import wantAgent from "@ohos:app.ability.wantAgent";
import type { WantAgent } from "@ohos:app.ability.wantAgent";
import type common from "@ohos:app.ability.common";
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
import { getApiVersionUtil, SystemCapability } from "@normalized:N&&&entry/src/main/ets/common/utils/ApiVersionUtil&";
const TAG: string = 'SedentaryReminderUtil';
/**
 * 久坐提醒工具类
 *
 * 使用的HarmonyOS API:
 * - @kit.NotificationKit.notificationManager: 通知管理API，用于发送系统通知
 * - @kit.AbilityKit.wantAgent: WantAgent API，用于点击通知后跳转
 *
 * 功能说明:
 * 1. 监测用户活动状态
 * 2. 超过设定时间未活动时发送通知提醒
 * 3. 用户活动后重置计时器
 * 4. 支持自定义提醒间隔和提醒内容
 */
export class SedentaryReminderUtil {
    private context: common.UIAbilityContext;
    private lastActivityTime: number = Date.now(); // 最后活动时间
    private checkInterval: number = 60000; // 检查间隔，默认1分钟
    private sedentaryThreshold: number = 60 * 60 * 1000; // 久坐阈值，默认1小时（毫秒）
    private isMonitoring: boolean = false;
    private timerId: number = -1; // 定时器ID
    private lastSteps: number = 0; // 上次记录的步数
    private hasNotified: boolean = false; // 是否已发送过提醒
    // 通知配置
    private readonly NOTIFICATION_ID: number = 1001; // 久坐提醒通知ID
    private readonly NOTIFICATION_TITLE: string = '久坐提醒';
    private readonly NOTIFICATION_CONTENT: string = '您已经超过1小时没有活动了，起来走走吧！';
    constructor(context: common.UIAbilityContext) {
        this.context = context;
        // 检查API版本和系统能力
        this.checkApiCompatibility();
    }
    /**
     * 检查API兼容性
     */
    private checkApiCompatibility(): void {
        const apiUtil = getApiVersionUtil();
        // 打印API版本信息
        apiUtil.printCompatibilityReport();
        // 检查通知服务能力
        const notificationCap = apiUtil.checkSysCap(SystemCapability.NOTIFICATION_CORE);
        if (!notificationCap.supported) {
            Logger.warn(TAG, `Notification capability not supported: ${notificationCap.message}`);
        }
        // 检查振动能力
        const vibratorCap = apiUtil.checkSysCap(SystemCapability.VIBRATOR);
        if (!vibratorCap.supported) {
            Logger.warn(TAG, `Vibrator capability not supported: ${vibratorCap.message}`);
        }
    }
    /**
     * 启动久坐监测
     *
     * @param thresholdMinutes 久坐阈值（分钟），默认60分钟
     * @param checkIntervalMinutes 检查间隔（分钟），默认1分钟
     */
    startMonitoring(thresholdMinutes: number = 60, checkIntervalMinutes: number = 1): void {
        if (this.isMonitoring) {
            Logger.info(TAG, 'Monitoring already started');
            return;
        }
        this.sedentaryThreshold = thresholdMinutes * 60 * 1000;
        this.checkInterval = checkIntervalMinutes * 60 * 1000;
        this.isMonitoring = true;
        this.lastActivityTime = Date.now();
        this.hasNotified = false;
        // 启动定时检查
        this.startPeriodicCheck();
        Logger.info(TAG, `Sedentary monitoring started, threshold: ${thresholdMinutes} minutes`);
    }
    /**
     * 停止久坐监测
     */
    stopMonitoring(): void {
        if (!this.isMonitoring) {
            return;
        }
        this.isMonitoring = false;
        this.stopPeriodicCheck();
        this.hasNotified = false;
        Logger.info(TAG, 'Sedentary monitoring stopped');
    }
    /**
     * 启动定时检查
     * 使用setInterval定期检查是否久坐
     */
    private startPeriodicCheck(): void {
        this.timerId = setInterval(() => {
            this.checkSedentary();
        }, this.checkInterval);
    }
    /**
     * 停止定时检查
     */
    private stopPeriodicCheck(): void {
        if (this.timerId !== -1) {
            clearInterval(this.timerId);
            this.timerId = -1;
        }
    }
    /**
     * 检查是否久坐
     * 如果超过阈值时间未活动，发送通知提醒
     */
    private async checkSedentary(): Promise<void> {
        if (!this.isMonitoring) {
            return;
        }
        const currentTime = Date.now();
        const inactiveTime = currentTime - this.lastActivityTime;
        Logger.info(TAG, `Inactive time: ${Math.round(inactiveTime / 60000)} minutes`);
        // 超过阈值且未发送过提醒
        if (inactiveTime >= this.sedentaryThreshold && !this.hasNotified) {
            await this.sendSedentaryNotification();
            this.hasNotified = true;
        }
    }
    /**
     * 发送久坐提醒通知
     *
     * 使用的HarmonyOS API:
     * - notificationManager.publish: 发布通知
     * - wantAgent.getWantAgent: 创建WantAgent用于点击跳转
     */
    private async sendSedentaryNotification(): Promise<void> {
        try {
            // 创建WantAgent，点击通知后打开应用
            const wantAgentInfo: wantAgent.WantAgentInfo = {
                wants: [
                    {
                        bundleName: this.context.applicationInfo.name,
                        abilityName: 'EntryAbility'
                    }
                ],
                operationType: wantAgent.OperationType.START_ABILITY,
                requestCode: 0,
                wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
            };
            const agent: WantAgent = await wantAgent.getWantAgent(wantAgentInfo);
            // 构建通知内容
            const notificationRequest: notificationManager.NotificationRequest = {
                id: this.NOTIFICATION_ID,
                content: {
                    contentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                    normal: {
                        title: this.NOTIFICATION_TITLE,
                        text: this.NOTIFICATION_CONTENT
                    }
                } as notificationManager.NotificationContent,
                wantAgent: agent,
                deliveryTime: new Date().getTime(),
                showDeliveryTime: true
            };
            // 发布通知
            await notificationManager.publish(notificationRequest);
            Logger.info(TAG, 'Sedentary notification sent successfully');
        }
        catch (err) {
            Logger.error(TAG, `Send sedentary notification failed: ${JSON.stringify(err)}`);
        }
    }
    /**
     * 更新活动状态
     * 当检测到用户有活动（步数变化）时调用
     *
     * @param currentSteps 当前步数
     */
    updateActivity(currentSteps: number): void {
        // 检测步数是否有变化
        if (currentSteps !== this.lastSteps && currentSteps > this.lastSteps) {
            this.lastActivityTime = Date.now();
            this.lastSteps = currentSteps;
            this.hasNotified = false; // 重置通知状态
            // 如果之前发送过通知，取消它
            this.cancelNotification();
            Logger.info(TAG, `Activity detected, steps: ${currentSteps}`);
        }
    }
    /**
     * 手动重置活动时间
     * 用户进行任何活动时调用
     */
    resetActivityTime(): void {
        this.lastActivityTime = Date.now();
        this.hasNotified = false;
        this.cancelNotification();
        Logger.info(TAG, 'Activity time reset');
    }
    /**
     * 取消久坐提醒通知
     */
    private async cancelNotification(): Promise<void> {
        try {
            await notificationManager.cancel(this.NOTIFICATION_ID);
            Logger.info(TAG, 'Notification cancelled');
        }
        catch (err) {
            Logger.error(TAG, `Cancel notification failed: ${JSON.stringify(err)}`);
        }
    }
    /**
     * 获取未活动时长（分钟）
     *
     * @returns number 未活动时长（分钟）
     */
    getInactiveMinutes(): number {
        return Math.round((Date.now() - this.lastActivityTime) / 60000);
    }
    /**
     * 获取距离下次提醒的剩余时间（分钟）
     *
     * @returns number 剩余时间（分钟），负数表示已超时
     */
    getRemainingMinutes(): number {
        const inactiveTime = Date.now() - this.lastActivityTime;
        return Math.round((this.sedentaryThreshold - inactiveTime) / 60000);
    }
    /**
     * 设置久坐阈值
     *
     * @param minutes 阈值时间（分钟）
     */
    setThreshold(minutes: number): void {
        this.sedentaryThreshold = minutes * 60 * 1000;
        Logger.info(TAG, `Sedentary threshold set to ${minutes} minutes`);
    }
    /**
     * 设置提醒内容
     *
     * @param title 通知标题
     * @param content 通知内容
     */
    setNotificationContent(title: string, content: string): void {
        // 注意：这里需要修改类属性，实际使用时可以扩展
        Logger.info(TAG, `Notification content updated: ${title} - ${content}`);
    }
    /**
     * 获取监测状态
     *
     * @returns boolean 是否正在监测
     */
    isMonitoringActive(): boolean {
        return this.isMonitoring;
    }
    /**
     * 清理资源
     */
    destroy(): void {
        this.stopMonitoring();
        this.cancelNotification();
        Logger.info(TAG, 'SedentaryReminderUtil destroyed');
    }
}
// 单例实例
let sedentaryReminderUtil: SedentaryReminderUtil | null = null;
/**
 * 获取久坐提醒工具类实例
 *
 * @param context 应用上下文
 * @returns SedentaryReminderUtil 实例
 */
export function getSedentaryReminderUtil(context: common.UIAbilityContext): SedentaryReminderUtil {
    if (!sedentaryReminderUtil) {
        sedentaryReminderUtil = new SedentaryReminderUtil(context);
    }
    return sedentaryReminderUtil;
}
