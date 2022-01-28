import Dexie, { Table } from "dexie";
import { IContributor } from "./models/contributor";
import { ILyrics, IMediaFile, ISong } from "./models/songs";

export class Cache extends Dexie {
    public songs!: Table<ISong>;
    public contributors!: Table<IContributor>;
    public files!: Table<IMediaFile>;
    public lyrics!: Table<ILyrics>;

    constructor() {
        super("hiddentreasures");
        this.version(1).stores({
            songs: '++id',
            contributors: '++id',
            files: '++id',
            lyrics: '++id',
        });
    }
}

export default new Cache();