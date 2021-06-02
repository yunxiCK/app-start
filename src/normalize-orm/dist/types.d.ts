import { SetRecoilState, ResetRecoilState, RecoilState, GetRecoilValue } from 'recoil';
export interface IModelOpt {
    name: string;
    idAttr: string;
    fields?: {
        [key: string]: string;
    };
}
export interface IModelStaticMethods {
    reset: () => void;
}
export interface IModelInstance<T> {
    option: IModelOpt;
    name: string;
    atom: RecoilState<IModelDataMap<T>>;
}
export interface IModelDataMap<T> {
    [key: string]: T;
}
export interface IModelMethods<T> {
    useShallowData: (ids: IModelId[] | IModelId) => T | T[] | null;
    useData: (ids: IModelId[] | IModelId) => T | T[] | null;
    useChangeData: () => {
        set: (id: IModelId | Partial<T> | Partial<T>[], data?: Partial<T>) => IModelId | IModelId[] | null;
        remove: (id: IModelId | IModelId[]) => void;
    };
}
export interface IRecoilSetOpt {
    set: SetRecoilState;
    get: GetRecoilValue;
    reset: ResetRecoilState;
}
export declare type IModelId = string | number;
export declare type AnyData = any;
