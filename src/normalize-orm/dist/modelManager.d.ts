import { IModelInstance, AnyData } from './types';
export default class ModelManager {
    private data;
    private modelDepMap;
    /**
     * 计算model间的依赖关系
     * @returns
     */
    private getModelDepMap;
    hasModel(name: string): boolean;
    getModel<T>(name: string): IModelInstance<T>;
    setModel<T>(name: string, modelInstance: IModelInstance<T>): void;
    traverse(cb: (modelInstance: IModelInstance<AnyData>) => void): void;
    /**
     * 获取model依赖的其他model的列表
     * @param name model名称
     * @returns
     */
    getDeps(name: string): string[];
}
