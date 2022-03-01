import Dexie, { Table } from "dexie";
import { IArticle, ICategory, ICollection, IContributor, ICopyright, ICountry, IGenre, ILyrics, IMediaFile, IPublication, ISong, ITheme } from "..";
import { IBaseDocument } from "../models/baseDocument";

export interface ICache<T extends IBaseDocument> {
    set: (model: T, key?: string) => Promise<void>;
    setAll: (models: T[]) => Promise<void>;
    get: (id: string) => Promise<T | undefined>;
    list: () => Promise<T[]>;
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

export class MemoryCache<T extends IBaseDocument> implements ICache<T> {
    private models: {
        [key: string]: T;
    } = {};

    public async set(model: T, key?: string) {
        this.models[key ?? model.id] = model;
    }

    public async setAll(models: T[]) {
        this.models = models.reduce((a, b) => {
            a[b.id] = b;
            return a;
        }, {} as {
            [key: string]: T;
        });
    }

    public async get(id: string) {
        return this.models[id];
    }

    public async list() {
        return Object.values(this.models);
    }
}



export interface Stores {
    collections: ICollection;
    songs: ISong;
    contributors: IContributor;
    files: IMediaFile
    publications: IPublication;
    articles: IArticle;
    lyrics: ILyrics[];
    lastUpdated: Date;
    categories: ICategory;
    copyrights: ICopyright;
    countries: ICountry;
    genres: IGenre;
    themes: ITheme;
    config: any;
}

export class DexieTables extends Dexie {
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
            contributors: '++id',
            lastUpdated: '++id',
            articles: '++id',
            publications: '++id',
            config: null,
        };
        ["categories", "copyrights", "countries", "genres", "themes"].forEach(i => {
            stores[i] = '++id';
        });

        this.version(2).stores(stores);
    }
}

let dexieTables: DexieTables | null = null;

export function getCache<S extends keyof Stores>(store: S): ICache<Stores[S]> {
    try {
        dexieTables ??= new DexieTables();
        return new DexieCache(dexieTables[store]);
    } catch {
        return new MemoryCache();
    }
}