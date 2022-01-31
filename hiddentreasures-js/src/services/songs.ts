import { ISong, Song } from "..";
import cache from "../cache";
import { Client } from "../client";
import { BaseChildService } from "./baseChildService";

export class Songs extends BaseChildService<Song, ISong> {
    constructor(client: Client) {
        super(client, "Songs", cache.songs);
    }

    protected toModel(item: ISong): Song {
        return new Song(item);
    }

    protected parents(item: ISong): string[] {
        return Object.keys(item.collections);
    }
}