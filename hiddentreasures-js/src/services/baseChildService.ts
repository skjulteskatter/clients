import { IBaseDocument } from "../models/baseDocument";
import { BaseService, IBaseService } from "./baseService";

export type ListOptions = {
    itemIds?: string[];
    parentIds?: string[];
    limit?: number;
    skip?: number;
    orderBy?: string;
    orderByDirection?: string;
}

export interface IBaseChildService<T, TListOptions extends ListOptions = ListOptions> extends IBaseService<T, TListOptions> {
    childrenOf(parentId: string): Promise<T[]>
}

export abstract class BaseChildService<T extends TInterface, TInterface extends IBaseDocument, TListOptions extends ListOptions = ListOptions> extends BaseService<T, TInterface, ListOptions> implements IBaseChildService<T, TListOptions> {
    protected modelsByParent: {
        [parent: string]: T[];
    } = {};

    protected abstract parents(item: TInterface): string[];

    public override async list() {
        const items = await super.list();

        for (const item of items) {
            this.cacheModel(item);
            const parents = this.parents(item);
            for (const parent of parents) {
                this.modelsByParent[parent] ??= [];
                this.modelsByParent[parent].push(item);
            }
        }

        return items;
    }

    public override async retrieve(options: TListOptions): Promise<T[]> {
        return (await this.httpPost<TInterface[]>("", options)).map(i => this.cacheModel(this.toModel(i)));
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

        return this.modelsByParent[parentId] = (await this.httpPost<TInterface[]>("", options)).map(i => this.cacheModel(this.toModel(i)));
    }
}