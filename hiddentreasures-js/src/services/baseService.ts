import { getCache, ICache } from "../cache";
import { SongTreasures } from "../client";
import { IBaseDocument } from "../models/baseDocument";

export interface IService {
    
}

export interface IBaseService<T, TListOptions = string[]> extends IService {
    retrieve(options: TListOptions): Promise<T[]>;
    list(): Promise<T[]>;
    get(id: string): Promise<T>;
}

export abstract class BaseService<T extends TInterface, TInterface extends IBaseDocument, TListOptions = string[]> implements IBaseService<T, TListOptions> {
    protected endpoint;
    protected client;
    protected cache;

    protected httpGet<T>(path = "") {
        return this.client.get<T>(`api/${this.endpoint}${path}`);
    }
    protected httpPost<T>(path = "", content: any = undefined) {
        return this.client.post<T>(`api/${this.endpoint}${path}`, content);
    }

    constructor(client: SongTreasures, endpoint: string, cache: ICache<TInterface>) {
        this.endpoint = endpoint;
        this.client = client;

        this.cache = cache;
    }
    
    protected abstract toModel(item: TInterface): T;

    protected models: T[] | null = null;

    protected modelCache: {
        [key: string]: T;
    } = {};

    public async retrieve(options: TListOptions) {
        const models = Array.isArray(options) && this.models ? this.models.filter(i => options.includes(i.id)) : [];

        models.push(...(await this.httpPost<TInterface[]>("", options)).map(i => this.toModel(i)));

        return models;
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
    
    protected async getOrSetModel(id: string, retrieve: () => Promise<T>) {
        return this.cacheModel(this.modelCache[id] ??= await retrieve());
    }

    public async get(id: string) {
        return await this.getOrSetModel(id, async () => 
            this.models?.find(i => i.id === id) 
            ?? this.toModel(
                await this.cache.get(id) 
                ?? await this.client.get<TInterface>(`api/${this.endpoint}/${id}`)
            )
        );
    }
}