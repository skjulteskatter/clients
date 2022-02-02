import { Collection, ICollection } from "..";
import cache from "cache";
import { Client } from "client";
import { BaseService } from "./baseService";

export class CollectionService extends BaseService<Collection, ICollection> {
    constructor(client: Client) {
        super(client, "Songs", cache.collections);
    }

    protected toModel(item: ICollection): Collection {
        return new Collection(item);
    }
}