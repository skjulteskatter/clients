import { Genre, IGenre } from "models";
import cache from "cache";
import { SongTreasures } from "client";
import { BaseService } from "../baseService";

export class GenreService extends BaseService<Genre, IGenre> {
    constructor(client: SongTreasures) {
        super(client, "Songs", cache.genres);
    }

    protected toModel(item: IGenre): Genre {
        return new Genre(item);
    }
}