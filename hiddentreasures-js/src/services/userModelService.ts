import { ICache } from "../cache";
import { Client } from "../client";
import { UserModel } from "../models/users/userModel";
import { BaseService, IBaseService } from "./baseService";

export type ModelCreateOptions = {
    name: string;
    color: string;
}

export type ModelUpdateOptions = {
    name: string | null;
    color: string | null;
}

export interface IUserModelService<TInterface, TCreateOptions extends ModelCreateOptions, TUpdateOptions extends ModelUpdateOptions> extends IBaseService<TInterface> {
    create(options: TCreateOptions): Promise<TInterface>;
    update(id: string, options: TUpdateOptions): Promise<TInterface>;
    delete(id: string): Promise<void>;
}

export abstract class UserModelService<
    T extends TInterface, 
    TInterface extends UserModel, 
    TCreateOptions extends ModelCreateOptions,
    TUpdateOptions extends ModelUpdateOptions
> extends BaseService<T, TInterface> implements IUserModelService<TInterface, TCreateOptions, TUpdateOptions> {
    constructor(client: Client, endpoint: string, cache: ICache<TInterface>) {
        super(client, endpoint, cache);
    }

    protected httpPatch<T>(path = "", content: any = undefined) {
        return this.client.patch<T>(`api/${this.endpoint}${path ? "/" + path : ""}`, content);
    }
    protected httpDelete<T>(path = "") {
        return this.client.delete<T>(`api/${this.endpoint}${path ? "/" + path : ""}`);
    }

    public async create(options: TCreateOptions): Promise<T> {
        return this.cacheModel(this.toModel(await this.httpPost<TInterface>("", options)));
    }

    public async update(id: string, options: TUpdateOptions): Promise<T> {
        return this.cacheModel(this.toModel(await this.httpPatch<TInterface>(id, options)));
    }

    public async delete(id: string): Promise<void> {
        await this.httpDelete(id);
        this.removeFromcache(id);
    }
}