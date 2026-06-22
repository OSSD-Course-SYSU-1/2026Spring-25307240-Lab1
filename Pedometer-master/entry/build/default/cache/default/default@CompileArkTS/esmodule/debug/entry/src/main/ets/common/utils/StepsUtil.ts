import type common from "@ohos:app.ability.common";
import preferences from "@ohos:data.preferences";
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/constants/CommonConstants&";
import { GlobalContext } from "@normalized:N&&&entry/src/main/ets/common/utils/GlobalContext&";
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
const TAG: string = 'StepsUtil';
const PREFERENCES_NAME = 'myPreferences';
/**
 * Steps util function.
 */
export class StepsUtil {
    createStepsPreferences(context: common.UIAbilityContext) {
        try {
        }
        catch (error) {
        }
        let preference: Promise<preferences.Preferences | null> = preferences.getPreferences(context, PREFERENCES_NAME)
            .catch((err: Error) => {
            Logger.error(TAG, `create steps preference failed Cause:  ${JSON.stringify(err)}`);
            return null;
        });
        if (preference !== null) {
            GlobalContext.getContext().setObject('getStepsPreferences', preference as Promise<preferences.Preferences>);
        }
    }
    /**
     * Get the progress value.
     *
     * @param {number} setSteps
     * @param {number} currentSteps
     * @return {number} progressValue
     */
    getProgressValue(setSteps: number, currentSteps: number): number {
        let progressValue: number = 0;
        if (setSteps > 0 && currentSteps > 0) {
            progressValue = Math.round((currentSteps / setSteps) * CommonConstants.ONE_HUNDRED);
        }
        return progressValue;
    }
    /**
     * Put preferences value.
     *
     * @param {string} key
     * @param {string} value
     */
    putStorageValue(key: string, value: string) {
        GlobalContext.getContext().getObject('getStepsPreferences')?.then((preferences: preferences.Preferences) => {
            preferences.put(key, value).then(() => {
                Logger.info(TAG, 'Storage put succeeded, key:' + key);
            }).catch((err: Error) => {
                Logger.error(TAG, 'Failed to put the value of startup with err: ' + JSON.stringify(err));
            });
        }).catch((err: Error) => {
            Logger.error(TAG, 'Failed to get the storage with err:' + JSON.stringify(err));
        });
    }
    /**
     * Get preferences value.
     *
     * @param {number} setSteps
     * @param {Function} callback
     */
    async getStorageValue(key: string): Promise<string> {
        let ret: preferences.ValueType = '';
        const preferences: preferences.Preferences | undefined = await GlobalContext.getContext()
            .getObject('getStepsPreferences');
        if (preferences) {
            try {
                ret = await preferences?.get(key, ret);
            }
            catch (err) {
                Logger.error(TAG, `get storage value failed Cause:  ${JSON.stringify(err)}`);
            }
        }
        return String(ret);
    }
    /**
     * Clean steps data.
     */
    CleanStepsData(): void {
        this.putStorageValue(CommonConstants.OLD_STEPS, '');
        this.putStorageValue(CommonConstants.IS_START, CommonConstants.FALSE);
        this.putStorageValue(CommonConstants.START_POSITION, '');
        this.putStorageValue(CommonConstants.PROGRESS_VALUE_TAG, CommonConstants.INITIALIZATION_VALUE);
    }
    /**
     * Check str is empty.
     *
     * @param {string} str
     * @return {boolean} true
     */
    checkStrIsEmpty(str: string): boolean {
        return str?.trim().length === 0;
    }
}
let stepsUtil = new StepsUtil();
export default stepsUtil as StepsUtil;
