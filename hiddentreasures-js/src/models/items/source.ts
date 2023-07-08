import { ISourceService } from "../..";
import { BaseItem, IBaseItem } from "./baseItem";

export interface ISource extends IBaseItem {
    image: string | null;
}

export class Source extends BaseItem<ISourceService> implements ISource {
    public image: string | null;

    constructor(i: ISource, s: ISourceService) {
        super(i, s);
        this.image = i.image ?? null;
    }
}

export default Source;