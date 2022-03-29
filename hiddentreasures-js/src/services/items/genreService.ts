import { Genre, IGenre } from "../../models";
import { Client } from "../../client";
import { BaseModelService, IBaseModelService } from "../baseModelService";
import { getCache } from "../../cache";

export interface IGenreService extends IBaseModelService<Genre> {

}

export class GenreService extends BaseModelService<Genre, IGenre> implements IGenreService {
    constructor(client: Client) {
        super(client, "Genres", getCache("genres"));
    }

    protected toModel(item: IGenre): Genre {
        return new Genre(item, this);
    }
}