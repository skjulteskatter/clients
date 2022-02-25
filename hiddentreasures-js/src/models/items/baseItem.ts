import { IService } from "../../services/baseService";
import { BaseDocument, IBaseDocument } from "../baseDocument";

export interface IBaseItem extends IBaseDocument {
    name: string;
}

export class BaseItem<TService extends IService> extends BaseDocument<TService> implements IBaseItem {
    public name;

    constructor(i: IBaseItem, s: TService) {
        super(i, s);
        this.name = i.name;
    }
}

export default BaseItem;