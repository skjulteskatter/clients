import { IArticle, ICategory, ICollection, IContributor, ICopyright, ICountry, IGenre, ILyrics, IMediaFile, IPublication, ISong, ITheme } from "..";
import { ICustomCollection, ITag } from "../models";
import { IBaseDocument } from "../models/baseDocument";
import { INotification } from "../models/notification";

export interface ICache<T extends IBaseDocument> {
    set(model: T, key?: string): Promise<void>;
    setAll(models: T[]): Promise<void>;
    get(id: string): Promise<T | undefined>;
    list(): Promise<T[]>;
    delete(id: string): Promise<void>;
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

    public async delete(id: string) {
        delete this.models[id];
    }
}

export interface Stores {
    notifications: INotification;
    collections: ICollection;
    customCollections: ICustomCollection;
    tags: ITag;
    songs: ISong;
    contributors: IContributor;
    files: IMediaFile;
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

export function getCache<S extends keyof Stores>(store: S): ICache<Stores[S]> {
    if (typeof indexedDB !== 'undefined' && indexedDB) {
        const { getDexieCache } = require('./dexieCache')
        return getDexieCache(store);
    } else {
        console.warn("IndexedDB is not supported. Cache functionality will be limited");
        return new MemoryCache();
    }
}