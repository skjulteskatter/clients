import { Table } from "dexie";
import cache from "../cache";
import { Http } from "../http";
import { IBaseDocument } from "../models/baseDocument";


export abstract class BaseService<T extends TInterface, TInterface extends IBaseDocument> {
    protected endpoint;
    private http;
    protected table;

    protected httpGet<T>(path = "") {
        return this.http.get<T>(`api/${this.endpoint}${path}`);
    }
    protected httpPost<T>(path = "", content: any = undefined) {
        return this.http.post<T>(`api/${this.endpoint}${path}`, content);
    }

    constructor(http: Http, endpoint: string, table: Table<TInterface>) {
        this.endpoint = endpoint;
        this.http = http;

        this.table = table;
    }
    
    protected abstract toModel(item: TInterface): T;

    protected models: T[] | null = null;

    public async list() {
        if (!this.models) {
            const lastUpdated = await cache.lastUpdated.get(this.endpoint);

            const items: TInterface[] = [];

            const date = new Date();
            date.setSeconds(date.getSeconds() - 300);

            if (lastUpdated && lastUpdated > date) {
                items.push(...await this.table.toArray());
            }

            let updatedAt: string | null = null;
            for (const i of items) {
                if (!updatedAt || i.updatedAt > updatedAt) {
                    updatedAt = i.updatedAt;
                }
            }

            const result = await this.http.get<TInterface[]>(`api/${this.endpoint}` + (updatedAt ? '?updatedAt=' + updatedAt : ""));
            if (result.length > 0) {
                await this.table.bulkPut(result);
            }

            items.push(...result);

            await cache.lastUpdated.put(new Date(), this.endpoint);

            this.models = items.map(i => this.toModel(i));
        }
        return this.models;
    }

    public async get(id: string) {
        const model = this.models?.find(i => i.id === id);

        if (model) {
            return model;
        }

        const stored = await this.table.get(id);

        if (stored) {
            return this.toModel(stored);
        }

        return this.toModel(await this.http.get<TInterface>(`api/${this.endpoint}/${id}`));
    }
}