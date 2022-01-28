import { BaseItem, IBaseItem } from "./baseItem";

export interface IGenre extends IBaseItem {
    description: string | null;
}

export class Genre extends BaseItem implements IGenre {
    public description;

    constructor(i: IGenre) {
        super(i);
        this.description = i.description ?? null;
    }
}

export default Genre;