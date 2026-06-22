import type preferences from "@ohos:data.preferences";
export class GlobalContext {
    private constructor() { }
    private static instance: GlobalContext;
    private _objects = new Map<string, Promise<preferences.Preferences>>();
    public static getContext(): GlobalContext {
        if (!GlobalContext.instance) {
            GlobalContext.instance = new GlobalContext();
        }
        return GlobalContext.instance;
    }
    getObject(value: string): Promise<preferences.Preferences> | undefined {
        return this._objects.get(value);
    }
    setObject(key: string, objectClass: Promise<preferences.Preferences>): void {
        this._objects.set(key, objectClass);
    }
}
