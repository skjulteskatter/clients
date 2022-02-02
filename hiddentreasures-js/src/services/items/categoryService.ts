import { Category, ICategory } from "models";
import cache from "cache";
import { Client } from "client";
import { BaseService } from "../baseService";

export class CategoryService extends BaseService<Category, ICategory> {
    constructor(client: Client) {
        super(client, "Songs", cache.categories);
    }

    protected toModel(item: ICategory): Category {
        return new Category(item);
    }
}