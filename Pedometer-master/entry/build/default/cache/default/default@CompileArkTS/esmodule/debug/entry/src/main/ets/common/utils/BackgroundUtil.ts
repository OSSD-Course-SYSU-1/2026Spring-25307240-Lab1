import type common from "@ohos:app.ability.common";
import wantAgent from "@ohos:app.ability.wantAgent";
import backgroundTaskManager from "@ohos:resourceschedule.backgroundTaskManager";
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
const TAG = 'Steps Utils';
export class BackgroundUtil {
    /**
     * Start background task.
     *
     * @param context
     */
    public static startContinuousTask(context: common.UIAbilityContext): void {
        let wantAgentInfo: wantAgent.WantAgentInfo = {
            wants: [
                {
                    bundleName: context.abilityInfo.bundleName,
                    abilityName: context.abilityInfo.name
                }
            ],
            operationType: wantAgent.OperationType.START_ABILITY,
            requestCode: 0,
            wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
        };
        wantAgent.getWantAgent(wantAgentInfo).then((wantAgentObj) => {
            try {
                backgroundTaskManager.startBackgroundRunning(context, backgroundTaskManager.BackgroundMode.LOCATION, wantAgentObj).then(() => {
                    Logger.info(TAG, 'startBackgroundRunning succeeded');
                }).catch((err: Error) => {
                    Logger.error(TAG, `startBackgroundRunning failed Cause:  ${JSON.stringify(err)}`);
                });
            }
            catch (error) {
                Logger.error(TAG, `stopBackgroundRunning failed. error: ${JSON.stringify(error)} `);
            }
        }).catch((err: Error) => {
            Logger.error(TAG, `get want agent failed Cause:  ${JSON.stringify(err)}`);
        });
    }
    /**
     * Stop background task.
     *
     * @param context
     */
    public static stopContinuousTask(context: common.UIAbilityContext): void {
        try {
            backgroundTaskManager.stopBackgroundRunning(context).then(() => {
                Logger.info(TAG, 'stopBackgroundRunning succeeded');
            }).catch((err: Error) => {
                Logger.error(TAG, `stopBackgroundRunning failed Cause:  ${JSON.stringify(err)}`);
            });
        }
        catch (error) {
            Logger.error(TAG, `stopBackgroundRunning failed. error: ${JSON.stringify(error)} `);
        }
    }
}
