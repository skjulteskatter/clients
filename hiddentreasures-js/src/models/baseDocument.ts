import { IService } from "../services/baseService";
import BaseObject from "./baseObject";

export interface IBaseDocument {
    id: string;
    updatedAt: string;
}

export class BaseDocument<TService extends IService> extends BaseObject implements IBaseDocument {
    public id!: string;
    public updatedAt!: string;

    protected service;
    
    constructor(i: IBaseDocument, service: TService) {
        super(i);
        this.service = service;
    }
}

export default BaseDocument;