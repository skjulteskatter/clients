import { Table } from "dexie";
import cache from "../cache";
import { Http } from "../http";
import { IBaseDocument } from "../models/baseDocument";

export abstract class BaseService<T extends TInterface, TInterface extends IBaseDocument> {
    private _endpoint;
    private _http;

    private _table;

    constructor(http: Http, endpoint: string, table: Table<TInterface>) {
        this._endpoint = endpoint;
        this._http = http;

        this._table = table;
    }
    
    protected abstract toModel(item: TInterface): T;

    protected models: T[] | null = null;
    protected modelsByParent: {
        [parent: string]: string[];
    } = {};

    public async list() {
        if (!this.models) {
            const lastUpdated = await cache.lastUpdated.get(this._endpoint);

            const items: TInterface[] = [];

            const date = new Date();
            date.setSeconds(date.getSeconds() - 300);

            if (lastUpdated && lastUpdated > date) {
                items.push(...await this._table.toArray());
            }

            let updatedAt: string | null = null;

            for (const i of items) {
                if (!updatedAt || i.updatedAt > updatedAt) {
                    updatedAt = i.updatedAt;
                }
            }

            const result = await this._http.get<TInterface[]>(`api/${this._endpoint}` + (updatedAt ? '?updatedAt=' + updatedAt : ""));

            if (result.length > 0) {
                await this._table.bulkPut(result);
            }

            items.push(...result);

            await cache.lastUpdated.put(new Date(), this._endpoint);

            this.models = items.map(i => this.toModel(i));
        }
        return this.models;
    }
}