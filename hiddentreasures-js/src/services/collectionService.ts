import { Collection, ICollection } from "..";
import cache from "../cache";
import { SongTreasures } from "../client";
import { BaseService, IBaseService } from "./baseService";

export interface ICollectionService extends IBaseService<Collection> {}

export class CollectionService extends BaseService<Collection, ICollection> implements ICollectionService {
    constructor(client: SongTreasures) {
        super(client, "Collections", cache.collections);
    }

    protected toModel(item: ICollection): Collection {
        return new Collection(item, this);
    }
}