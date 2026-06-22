import { EmptyPagePathStack } from "@normalized:N&&&entry/src/main/ets/generated1/detail/EmptyPagePathStack&";
import { SecondPageSearch } from "@normalized:N&&&entry/src/main/ets/generated1/detail/SecondPageSearch&";
// import reference line
export function PageMap(name: string, parent = null) {
    const __name__ = name;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, name = __name__) => {
        If.create();
        if (name === 'SearchPage') {
            (parent ? parent : this).ifElseBranchUpdateFunction(0, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, name = __name__) => {
                        if (isInitialRender) {
                            let componentCall = new SecondPageSearch(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/detail/SecondPageBuilder.ets", line: 22, col: 5 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "SecondPageSearch" });
                }
            });
        }
        // code reference line
        else {
            (parent ? parent : this).ifElseBranchUpdateFunction(1, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, name = __name__) => {
                        if (isInitialRender) {
                            let componentCall = new EmptyPagePathStack(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/generated1/detail/SecondPageBuilder.ets", line: 26, col: 5 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "EmptyPagePathStack" });
                }
            });
        }
    }, If);
    If.pop();
}
