import { ISong, Song } from "..";
import cache from "../cache";
import { Client } from "../client";
import { BaseService } from "./baseService";

export class Songs extends BaseService<Song, ISong> {
    constructor(client: Client) {
        super(client, "Songs", cache.songs);
    }

    protected toModel(item: ISong): Song {
        return new Song(item);
    }
}