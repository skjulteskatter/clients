import { BaseDocument, IBaseDocument } from "../baseDocument";

export interface IBaseItem extends IBaseDocument {
    name: string;
}

export class BaseItem extends BaseDocument implements IBaseItem {
    public name;

    constructor(i: IBaseItem) {
        super(i);
        this.name = i.name;
    }
}

export default BaseItem;