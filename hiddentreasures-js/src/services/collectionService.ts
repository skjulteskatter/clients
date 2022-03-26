import { Collection, ICollection } from "..";
import { getCache } from "../cache";
import { Client } from "../client";
import { BaseService, IBaseService } from "./baseService";

export interface ICollectionService extends IBaseService<Collection> {}

export class CollectionService extends BaseService<Collection, ICollection> implements ICollectionService {
    constructor(client: Client) {
        super(client, "Collections", getCache("collections"));
    }

    protected toModel(item: ICollection): Collection {
        return new Collection(item);
    }
}