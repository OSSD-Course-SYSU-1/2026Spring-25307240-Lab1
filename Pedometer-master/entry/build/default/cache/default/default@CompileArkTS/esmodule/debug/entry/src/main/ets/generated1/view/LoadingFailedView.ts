import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/generated1/common/CommonConstants&";
export function LoadingFailedView(handleReload?: () => void, parent = null) {
    const __handleReload__ = handleReload;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, handleReload = __handleReload__) => {
        Row.create();
        Row.justifyContent(FlexAlign.Center);
        Row.layoutWeight(1);
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, handleReload = __handleReload__) => {
        Column.create();
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, handleReload = __handleReload__) => {
        Image.create({ "id": 16777432, "type": 20000, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        Image.width("120vp");
        Image.height("120vp");
    }, Image);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, handleReload = __handleReload__) => {
        Text.create("Failed to load the network");
        Text.fontColor({ "id": 125830998, "type": 10001, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        Text.fontFamily(CommonConstants.HARMONY_HEI_TI_FONT_FAMILY);
        Text.fontSize("14fp");
        Text.margin({ top: "8vp" });
    }, Text);
    Text.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, handleReload = __handleReload__) => {
        Row.create();
        Row.height("32vp");
        Row.width("80vp");
        Row.margin({ top: "8vp" });
        Row.borderRadius({ "id": 125830911, "type": 10002, params: [], "bundleName": "com.example.pedometerapp", "moduleName": "entry" });
        Row.onClick(() => handleReload?.());
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, handleReload = __handleReload__) => {
        Text.create("Reload");
        Text.fontColor("#FF3E50");
        Text.fontFamily(CommonConstants.HARMONY_HEI_TI_FONT_FAMILY);
        Text.fontSize("12fp");
        Text.width(CommonConstants.FULL_PERCENT);
        Text.textAlign(TextAlign.Center);
    }, Text);
    Text.pop();
    Row.pop();
    Column.pop();
    Row.pop();
}
