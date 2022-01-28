import { ISong, Song } from "..";
import cache from "../cache";
import { Http } from "../http";
import { BaseService } from "./baseService";

export class Songs extends BaseService<Song, ISong> {
    constructor(http: Http) {
        super(http, "Songs", cache.songs);
    }

    protected toModel(item: ISong): Song {
        return new Song(item);
    }
}