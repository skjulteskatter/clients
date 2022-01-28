import { ISong, Song } from "..";
import { Http } from "../http/http";
import { BaseService } from "./baseService";

export class Songs extends BaseService<Song, ISong> {
    constructor(http: Http) {
        super(http, "Songs");
    }

    protected toModel(item: ISong): Song {
        return new Song(item);
    }
}