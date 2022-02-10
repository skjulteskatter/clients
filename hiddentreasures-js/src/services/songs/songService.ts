import { ISong, Song } from "../../models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseChildService } from "../baseChildService";

export class SongService extends BaseChildService<Song, ISong> {
    constructor(client: SongTreasures) {
        super(client, "Songs", cache.songs);
    }

    protected toModel(item: ISong): Song {
        return new Song(item);
    }

    protected parents(item: ISong): string[] {
        return Object.keys(item.collections);
    }
}