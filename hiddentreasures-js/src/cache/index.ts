import Dexie, { Table } from "dexie";
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

    constructor() {
        super("hiddentreasures");
        this.version(1).stores({
            songs: '++id, parentId',
            files: '++id, parentId',
            lyrics: '++id, parentId',
            contributors: '++id',
            lastUpdated: '++id',
        });
    }
}

export default new Cache();