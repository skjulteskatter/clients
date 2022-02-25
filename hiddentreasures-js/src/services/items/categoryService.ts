import { Category, ICategory } from "../../models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseService, IBaseService } from "../baseService";

export interface ICategoryService extends IBaseService<Category> {

}

export class CategoryService extends BaseService<Category, ICategory> implements ICategoryService {
    constructor(client: SongTreasures) {
        super(client, "Categories", cache.categories);
    }

    protected toModel(item: ICategory): Category {
        return new Category(item, this);
    }
}