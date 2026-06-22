import geoLocationManager from "@ohos:geoLocationManager";
import Logger from "@normalized:N&&&entry/src/main/ets/common/utils/Logger&";
const TAG = 'LocationUtil';
class LocationUtil {
    geolocationOn(locationChange: (location: geoLocationManager.Location) => void): void {
        let requestInfo: geoLocationManager.LocationRequest = {
            'priority': 0x203,
            'scenario': 0x300,
            'timeInterval': 0,
            'distanceInterval': 0,
            'maxAccuracy': 0
        };
        try {
            geoLocationManager.on('locationChange', requestInfo, locationChange);
        }
        catch (err) {
            console.error("locationChange error:" + JSON.stringify(err));
        }
    }
    geolocationOff(): void {
        try {
            geoLocationManager.off('locationChange');
        }
        catch (err) {
            Logger.error(TAG, `get location off failed Cause:  ${JSON.stringify(err)}`);
        }
    }
}
let locationUtil = new LocationUtil();
export default locationUtil as LocationUtil;
