import { ILyrics, Lyrics, LyricsFormat } from "models";
import { SongTreasures } from "client";
import cache from "cache";

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

export class LyricsService {
    protected client;
    protected table;
    protected models: Lyrics[] | null = null;
    protected modelsByCollection: {
        [key: string]: Lyrics[];
    } = {};

    constructor(client: SongTreasures) {
        this.client = client;
        this.table = cache.lyrics;
    }

    public async get(songId: string, options: RetrieveLyricsOptions): Promise<Lyrics> {
        let model = this.models?.find(i => i.songId === songId && i.language === options.language && i.format === options.format && i.transposition === options.transposition);

        if (!model) {
            model = new Lyrics(await this.client.post<ILyrics>(`api/Songs/${songId}/Lyrics`, options))
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