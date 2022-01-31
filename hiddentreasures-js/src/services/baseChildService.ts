import { IBaseDocument } from "../models/baseDocument";
import { BaseService } from "./baseService";

export type ListOptions = {
    itemIds?: string[];
    parentIds?: string[];
    limit?: number;
    skip?: number;
    orderBy?: string;
    orderByDirection?: string;
}

export abstract class BaseChildService<T extends TInterface, TInterface extends IBaseDocument> extends BaseService<T, TInterface> {
    protected modelsByParent: {
        [parent: string]: T[];
    } = {};

    protected abstract parents(item: TInterface): string[];

    public override async list() {
        const items = await super.list();

        for (const item of items) {
            const parents = this.parents(item);
            for (const parent of parents) {
                this.modelsByParent[parent] ??= [];
                this.modelsByParent[parent].push(item);
            }
        }

        return items;
    }

    public async childrenOf(parentId: string) {
        if (this.modelsByParent[parentId]) {
            return this.modelsByParent[parentId];
        }
        
        if (this.models !== null) {
            this.modelsByParent[parentId] = this.models.filter(i => this.parents(i).includes(parentId));
            return this.modelsByParent[parentId];
        }

        const options: ListOptions = {
            parentIds: [parentId]
        };

        return this.modelsByParent[parentId] = (await this.httpPost<TInterface[]>("", options)).map(i => this.toModel(i));
    }
}