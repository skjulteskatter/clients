import BaseObject from "./baseObject";

export interface IBaseDocument {
    id: string;
    updatedAt: string;
}

export class BaseDocument extends BaseObject implements IBaseDocument {
    public id!: string;
    public updatedAt!: string;
    
    constructor(i: IBaseDocument) {
        super(i);
    }
}

export default BaseDocument;