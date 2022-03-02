import { ISong, Song } from "../../models";
import { getCache } from "../../cache";
import { Client } from "../../client";
import { BaseChildService, IBaseChildService } from "../baseChildService";

export interface ISongService extends IBaseChildService<Song> {};

export class SongService extends BaseChildService<Song, ISong> {
    constructor(client: Client) {
        super(client, "Songs", getCache("songs"));
    }

    protected toModel(item: ISong): Song {
        return new Song(item, this);
    }

    protected parents(item: ISong): string[] {
        return Object.keys(item.collections);
    }
}