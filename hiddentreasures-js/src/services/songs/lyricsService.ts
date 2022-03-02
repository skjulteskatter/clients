import { ILyrics, Lyrics, LyricsFormat } from "../../models";
import { Client } from "../../client";
import { IService } from "../baseService";
import { getCache } from "../../cache";

export interface IRetrieveLyricsOptions {
    language?: string;
    format?: LyricsFormat;
    transposition?: number;
    newMelody?: boolean;
}

export class RetrieveLyricsOptions implements IRetrieveLyricsOptions {
    public language;
    public format;
    public transposition;
    public newMelody;

    constructor(i: IRetrieveLyricsOptions) {
        this.language = i.language ?? "default";
        this.format = i.format ?? "json";
        this.transposition = i.transposition ?? 0;
        this.newMelody = i.newMelody ?? false;
    }
}

export interface ILyricsService extends IService {
    get(songId: string, options: RetrieveLyricsOptions): Promise<Lyrics>
    list(collectionId: string, options: RetrieveLyricsOptions): Promise<Lyrics[]>
}

export class LyricsService {
    protected client;
    protected table;
    protected models: Lyrics[] | null = null;
    protected modelsByCollection: {
        [key: string]: Lyrics[];
    } = {};

    constructor(client: Client) {
        this.client = client;
        this.table = getCache("lyrics");
    }

    public async get(songId: string, options: RetrieveLyricsOptions): Promise<Lyrics> {
        let model = this.models?.find(i => i.songId === songId && i.language === options.language && i.format === options.format && i.transposition === options.transposition);

        if (!model) {
            model = new Lyrics(await this.client.post<ILyrics>(`api/Songs/${songId}/Lyrics`, options), this)
        }

        return model;
    }

    public async list(collectionId: string, options: RetrieveLyricsOptions): Promise<Lyrics[]> {
        const key = `${collectionId}:${options.format}:${options.language}:${options.newMelody}:${options.transposition}`;
        if (this.modelsByCollection[key]) {
            return this.modelsByCollection[key];
        }

        return [];
    }
}