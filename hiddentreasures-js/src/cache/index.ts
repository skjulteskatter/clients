import Dexie, { Table } from "dexie";
import { IArticle, ICategory, ICollection, IContributor, ICopyright, ICountry, IGenre, ILyrics, IMediaFile, IPublication, ISong, ITheme } from "..";

export class Cache extends Dexie {
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

export default new Cache();