import { ILyrics, Lyrics } from "models";
import cache from "cache";
import { Client } from "client";
import { BaseChildService } from "../baseChildService";

export class LyricsService extends BaseChildService<Lyrics, ILyrics> {
    constructor(client: Client) {
        super(client, "Lyrics", cache.lyrics);
    }

    public override list(): Promise<Lyrics[]> {
        throw new Error("Not implemented");
    }

    protected toModel(item: ILyrics): Lyrics {
        return new Lyrics(item);
    }

    protected parents(item: ILyrics): string[] {
        return [item.songId];
    }
}