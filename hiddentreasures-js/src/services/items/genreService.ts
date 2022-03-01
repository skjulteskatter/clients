import { Genre, IGenre } from "../../models";
import { SongTreasures } from "../../client";
import { BaseService, IBaseService } from "../baseService";
import { getCache } from "../../cache";

export interface IGenreService extends IBaseService<Genre> {

}

export class GenreService extends BaseService<Genre, IGenre> implements IGenreService {
    constructor(client: SongTreasures) {
        super(client, "Genres", getCache("genres"));
    }

    protected toModel(item: IGenre): Genre {
        return new Genre(item, this);
    }
}