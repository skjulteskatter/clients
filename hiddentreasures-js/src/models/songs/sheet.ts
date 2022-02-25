import BaseObject from "../baseObject";

export interface ISheet {
    id: string;
    instruments: string[];
}

export class Sheet extends BaseObject implements ISheet {
    public id!: string;
    public instruments!: string[];

    constructor(i: ISheet) {
        super(i);
    } 
}