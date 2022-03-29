import { ICache } from "../cache";
import { Client } from "../client";
import { IBaseDocument } from "../models/baseDocument";
import { BaseService, IBaseService } from "./baseService";

export type ListOptions = {
    itemIds?: string[];
    limit?: number;
    skip?: number;
    orderBy?: string;
    orderByDirection?: string;
}

export interface IBaseModelService<T, TListOptions extends ListOptions = ListOptions> extends IBaseService<T> {
    retrieve(options: TListOptions): Promise<T[]>;
}

export abstract class BaseModelService<T extends TInterface, TInterface extends IBaseDocument, TListOptions extends ListOptions = ListOptions> extends BaseService<T, TInterface> 
implements IBaseModelService<T, TListOptions> {
    constructor(client: Client, endpoint: string, cache: ICache<TInterface>) {
        super(client, endpoint, cache);
    }
    
    public async retrieve(options: TListOptions): Promise<T[]> {
        return (await this.httpPost<TInterface[]>("", options)).map(i => this.cacheModel(this.toModel(i)));
    }

    private static retrieving: {
        [model: string]: boolean;
    } = {};
    private static retrieveModels: {
        [model: string]: string[] | null;
    } = {};

    private async getModel(id: string) {
        const retrieveModels = BaseModelService.retrieveModels[this.endpoint] ??= [];
        retrieveModels.push(id);
        await new Promise(r => setTimeout(r, 10));
        if (retrieveModels !== null && !BaseModelService.retrieving[this.endpoint]) {
            const itemIds = retrieveModels;
            BaseModelService.retrieveModels[this.endpoint] = null;
            BaseModelService.retrieving[this.endpoint] = true;
            if (itemIds.length === 1) {
                this.cacheModel(this.toModel(await this.httpGet<TInterface>(id)));
            } else {
                await this.retrieve({
                    itemIds,
                } as TListOptions);
            }
            BaseModelService.retrieving[this.endpoint] = false;
        } else {
            while(BaseModelService.retrieving[this.endpoint]) {
                await new Promise(r => setTimeout(r, 10));
            }
        }
        return this.modelCache[id];
    }
    
    protected async getOrSetModel(id: string) {
        return this.modelCache[id] ?? await this.getModel(id);
    }

    public override async get(id: string) {
        return await this.getOrSetModel(id);
    }
}