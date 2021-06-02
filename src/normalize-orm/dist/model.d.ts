import { AnyData, IModelStaticMethods, IModelMethods, IModelOpt } from './types';
export default function initModel(): {
    createModel: <T extends {
        [key: string]: AnyData;
    }>(opt: IModelOpt) => IModelMethods<T>;
    useChangeData: () => IModelStaticMethods;
};
