export interface IBaseDocument {
    id: string;
    updatedAt: string;
}

export class BaseDocument implements IBaseDocument {
    public id;
    public updatedAt;
    
    constructor(i: IBaseDocument) {
        this.id = i.id;
        this.updatedAt = i.updatedAt;
    }
}

export default BaseDocument;