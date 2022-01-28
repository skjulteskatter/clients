import BaseDocument, { IBaseDocument } from "./baseDocument";

export interface ICollection extends IBaseDocument {
    title: string;
    description: string;
}

export class Collection extends BaseDocument implements ICollection {
    public title;
    public description;

    constructor(i: ICollection) {
        super(i);
        this.title = i.title;
        this.description = i.description;
    }
}