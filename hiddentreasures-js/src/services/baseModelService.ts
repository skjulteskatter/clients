import { ICache } from "../cache";
import { Client } from "../client";
import { IBaseDocument } from "../models/baseDocument";
import { BaseService, IBaseService, ListOptions as BaseListOptions } from "./baseService";

export type ListOptions = BaseListOptions;

export interface IBaseModelService<T, TListOptions extends ListOptions = ListOptions> extends IBaseService<T, TListOptions> {

}

export abstract class BaseModelService<T extends TInterface, TInterface extends IBaseDocument, TListOptions extends ListOptions = ListOptions> extends BaseService<T, TInterface, TListOptions> 
implements IBaseModelService<T, TListOptions> {
    constructor(client: Client, endpoint: string, cache: ICache<TInterface>) {
        super(client, endpoint, cache);
    }
}