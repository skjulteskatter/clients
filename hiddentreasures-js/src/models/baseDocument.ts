import BaseObject from "./baseObject";

export abstract class IBaseDocument {
    public id!: string;
    public updatedAt!: string;
}

export class BaseDocument extends BaseObject implements IBaseDocument {
    public id!: string;
    public updatedAt!: string;
    
    constructor(i: IBaseDocument) {
        super(i);
    }
}

export default BaseDocument;