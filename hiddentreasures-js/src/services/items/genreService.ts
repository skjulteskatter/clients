import { Genre, IGenre } from "../../models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseService, IBaseService } from "../baseService";

export interface IGenreService extends IBaseService<Genre> {

}

export class GenreService extends BaseService<Genre, IGenre> implements IGenreService {
    constructor(client: SongTreasures) {
        super(client, "Genres", cache.genres);
    }

    protected toModel(item: IGenre): Genre {
        return new Genre(item, this);
    }
}