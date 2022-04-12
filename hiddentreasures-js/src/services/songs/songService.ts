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
        return new Song(item);
    }

    protected parents(item: ISong): string[] {
        return item.collections.map(i => i.collectionId);
    }

    public async find(collectionId: string, number: number) {
        return (await this.childrenOf(collectionId)).find(i => i.getNumber(collectionId) === number) ?? null;
    }
}