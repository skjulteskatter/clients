import Dexie, { Table } from "dexie";
import { ICache, Stores } from ".";
import { IBaseDocument } from "../models/baseDocument";

export class DexieTables extends Dexie {
    constructor() {
        super("hiddentreasures");
        const stores: {
            [key: string]: string | null;
        } = {
            songs: '++id, parentId',
            files: '++id, parentId',
            lyrics: '++id, parentId',
            contributors: '++id',
            lastUpdated: '++id',
            articles: '++id',
            publications: '++id',
            notifications: '++id',
            customCollections: '++id',
            tags: '++id',
            config: null,
        };
        ["categories", "copyrights", "countries", "genres", "themes"].forEach(i => {
            stores[i] = '++id';
        });

        this.version(3).stores(stores);
    }
}

export class DexieCache<T extends IBaseDocument> implements ICache<T> {
    private table: Table<T>;

    constructor(table: Table<T>) {
        this.table = table;
    }

    public async set(model: T, key?: string) {
        await this.table.put(model, key ?? model.id);
    }

    public async setAll(models: T[]) {
        await this.table.bulkPut(models);
    }

    public async get(id: string) {
        return await this.table.get(id);
    }

    public async list() {
        return await this.table.toArray();
    }

    public async delete(id: string) {
        return await this.table.delete(id);
    }
}

const dexieTables = new DexieTables();

export function getDexieCache<S extends keyof Stores>(store: S): ICache<Stores[S]> {
    return new DexieCache((dexieTables as any)[store as any]);
}
