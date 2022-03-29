import { getCache, ICache } from "../cache";
import { Client } from "../client";
import { IBaseDocument } from "../models/baseDocument";

export interface IService {
    
}

export interface IBaseService<T> extends IService {
    list(): Promise<T[]>;
    get(id: string): Promise<T>;
}

export abstract class BaseService<T extends TInterface, TInterface extends IBaseDocument> implements IBaseService<T> {
    protected endpoint;
    protected client;
    protected cache;

    protected httpGet<T>(path = "") {
        return this.client.get<T>(`api/${this.endpoint}${path ? "/" + path : ""}`);
    }
    protected httpPost<T>(path = "", content: any = undefined) {
        return this.client.post<T>(`api/${this.endpoint}${path ? "/" + path : ""}`, content);
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
                    this.removeFromcache(model.id);
                }, 30000);
            }
        }
    }
    protected removeFromcache(id: string) {
        delete this.modelCache[id];
        delete this._willDelete[id];
        this.cache.delete(id);
    }

    public async get(id: string) {
        if (!this.modelCache[id]) {
            this.cacheModel(this.toModel(await this.httpGet<TInterface>(id)));
        }
        return this.modelCache[id];
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
}