import Dexie, { Table } from "dexie";
import { ICategory, ICopyright, ICountry, IGenre, ITheme } from "../../dist";
import { 
    ICollection, 
    IContributor, 
    ISong, 
    ILyrics, 
    IMediaFile 
} from "../models";

export class Cache extends Dexie {
    public collections!: Table<ICollection>;
    public songs!: Table<ISong>;
    public contributors!: Table<IContributor>;
    public files!: Table<IMediaFile>;
    public lyrics!: Table<ILyrics>;
    public lastUpdated!: Table<Date>;

    /** Items */
    public categories!: Table<ICategory>;
    public copyrights!: Table<ICopyright>;
    public countries!: Table<ICountry>;
    public genres!: Table<IGenre>;
    public themes!: Table<ITheme>;

    constructor() {
        super("hiddentreasures");
        const stores: {
            [key: string]: string;
        } = {
            songs: '++id, parentId',
            files: '++id, parentId',
            lyrics: '++id, parentId',
            contributors: '++id',
            lastUpdated: '++id',
        };
        ["categories", "copyrights", "countries", "genres", "themes"].forEach(i => {
            stores[i] = '++id';
        });

        this.version(1).stores(stores);
    }
}

export default new Cache();