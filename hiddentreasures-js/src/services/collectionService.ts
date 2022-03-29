import { Collection, ICollection } from "..";
import { getCache } from "../cache";
import { Client } from "../client";
import { BaseModelService, IBaseModelService } from "./baseModelService";

export interface ICollectionService extends IBaseModelService<Collection> {}

export class CollectionService extends BaseModelService<Collection, ICollection> implements ICollectionService {
    constructor(client: Client) {
        super(client, "Collections", getCache("collections"));
    }

    protected toModel(item: ICollection): Collection {
        return new Collection(item);
    }
}