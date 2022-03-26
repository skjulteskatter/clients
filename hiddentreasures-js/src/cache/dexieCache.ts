import Dexie, { Table } from "dexie";
import { ICache, Stores } from ".";
import { IArticle, ICategory, ICollection, IContributor, ICopyright, ICountry, IGenre, ILyrics, IMediaFile, IPublication, ISong, ITheme } from "..";
import { IBaseDocument } from "../models/baseDocument";
import { INotification } from "../models/notification";

export class DexieTables extends Dexie {
    public notifications!: Table<INotification>;

    public collections!: Table<ICollection>;
    public songs!: Table<ISong>;
    public contributors!: Table<IContributor>;
    public files!: Table<IMediaFile>;

    public publications!: Table<IPublication>;
    public articles!: Table<IArticle>;

    public lyrics!: Table<ILyrics[]>;
    public lastUpdated!: Table<Date>;

    /** Items */
    public categories!: Table<ICategory>;
    public copyrights!: Table<ICopyright>;
    public countries!: Table<ICountry>;
    public genres!: Table<IGenre>;
    public themes!: Table<ITheme>;

    public config!: Table<any>;

    constructor() {
        super("hiddentreasures");
        const stores: {
            [key: string]: string | null;
        } = {
            songs: '++id, parentId',
            files: '++id, parentId',
            lyrics: '++id, parentId',
            collections: '++id',
            contributors: '++id',
            lastUpdated: '++id',
            articles: '++id',
            publications: '++id',
            notifications: '++id',
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
}

const dexieTables = new DexieTables();

export function getDexieCache<S extends keyof Stores>(store: S): ICache<Stores[S]> {
    return new DexieCache(dexieTables[store]);
}
