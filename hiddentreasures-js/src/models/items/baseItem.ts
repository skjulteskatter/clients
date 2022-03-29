import { IService } from "../../services/baseService";
import { BaseDocument, IBaseDocument } from "../baseDocument";

export interface IBaseItem extends IBaseDocument {
    name: string;
}

export class BaseItem<TService extends IService> extends BaseDocument implements IBaseItem {
    public name;

    protected service;

    constructor(i: IBaseItem, s: TService) {
        super(i);
        this.service = s;
        this.name = i.name;
    }
}

export default BaseItem;