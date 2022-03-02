import { getCache, ICache } from "../cache";
import { Client } from "../client";
import { IBaseDocument } from "../models/baseDocument";

export interface IService {
    
}

export type ListOptions = {
    itemIds?: string[];
    limit?: number;
    skip?: number;
    orderBy?: string;
    orderByDirection?: string;
}

export interface IBaseService<T, TListOptions extends ListOptions = ListOptions> extends IService {
    retrieve(options: TListOptions): Promise<T[]>;
    list(): Promise<T[]>;
    get(id: string): Promise<T>;
}

export abstract class BaseService<T extends TInterface, TInterface extends IBaseDocument, TListOptions extends ListOptions = ListOptions> implements IBaseService<T, TListOptions> {
    protected endpoint;
    protected client;
    protected cache;

    protected httpGet<T>(path = "") {
        return this.client.get<T>(`api/${this.endpoint}${path}`);
    }
    protected httpPost<T>(path = "", content: any = undefined) {
        return this.client.post<T>(`api/${this.endpoint}${path}`, content);
    }

    constructor(client: Client, endpoint: string, cache: ICache<TInterface>) {
        this.endpoint = endpoint;
        this.client = client;

        this.cache = cache;
    }
    
    protected abstract toModel(item: TInterface): T;

    protected models: T[] | null = null;

    protected modelCache: {
        [key: string]: T;
    } = {};
    
    public async retrieve(options: TListOptions): Promise<T[]> {
        return (await this.httpPost<TInterface[]>("", options)).map(i => this.cacheModel(this.toModel(i)));
    }

    public async list() {
        if (!this.models) {
            const lastUpdated = await getCache("lastUpdated").get(this.endpoint);

            const items: TInterface[] = [];

            const date = new Date();
            date.setSeconds(date.getSeconds() - 300);

            if (lastUpdated && lastUpdated > date) {
                items.push(...await this.cache.list());
            }

            let updatedAt: string | null = null;
            for (const i of items) {
                if (!updatedAt || i.updatedAt > updatedAt) {
                    updatedAt = i.updatedAt;
                }
            }

            const result = await this.client.get<TInterface[]>(`api/${this.endpoint}` + (updatedAt ? '?updatedAt=' + updatedAt : ""));
            if (result.length > 0) {
                await this.cache.setAll(result);
            }

            items.push(...result);

            await getCache("lastUpdated").set(new Date(), this.endpoint);

            this.models = items.map(i => this.cacheModel(this.toModel(i)));
        }
        return this.models;
    }

    private _willDelete: {
        [key: string]: boolean;
    } = {};
    protected cacheModel(model: T) {
        try {
            return this.modelCache[model.id] ??= model;
        } finally {
            if (!this._willDelete[model.id]) {
                this._willDelete[model.id] = true;
                setTimeout(() => {
                    delete this.modelCache[model.id];
                    delete this._willDelete[model.id];
                }, 30000);
            }
        }
    }

    private static retrieving: {
        [model: string]: boolean;
    } = {};
    private static retrieveModels: {
        [model: string]: string[] | null;
    } = {};
    
    protected async getOrSetModel(id: string) {
        const getModel = async () => {
            const retrieveModels = BaseService.retrieveModels[this.endpoint] ??= [];
            retrieveModels.push(id);
            await new Promise(r => setTimeout(r, 10));
            if (retrieveModels !== null && !BaseService.retrieving[this.endpoint]) {
                const itemIds = retrieveModels;
                BaseService.retrieveModels[this.endpoint] = null;
                BaseService.retrieving[this.endpoint] = true;
                if (itemIds.length === 1) {
                    this.cacheModel(this.toModel(await this.httpGet<TInterface>(id)));
                } else {
                    await this.retrieve({
                        itemIds,
                    } as TListOptions);
                }
                BaseService.retrieving[this.endpoint] = false;
            } else {
                while(BaseService.retrieving[this.endpoint]) {
                    await new Promise(r => setTimeout(r, 10));
                }
            }
            return this.modelCache[id];
        };
        return this.modelCache[id] ?? await getModel();
    }

    public async get(id: string) {
        return await this.getOrSetModel(id);
    }
}