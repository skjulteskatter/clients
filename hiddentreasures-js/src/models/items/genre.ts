import { IGenreService } from "../..";
import { BaseItem, IBaseItem } from "./baseItem";

export interface IGenre extends IBaseItem {
    description: string | null;
}

export class Genre extends BaseItem<IGenreService> implements IGenre {
    public description;

    constructor(i: IGenre, s: IGenreService) {
        super(i, s);
        this.description = i.description ?? null;
    }
}

export default Genre;