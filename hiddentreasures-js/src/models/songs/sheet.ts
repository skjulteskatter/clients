import BaseDocument, { IBaseDocument } from "../../models/baseDocument";

export interface ISheet extends IBaseDocument {
    instruments: string[];
}

export class Sheet extends BaseDocument implements ISheet {
    public instruments;

    constructor(i: ISheet) {
        super(i);
        this.instruments = i.instruments;
    } 
}