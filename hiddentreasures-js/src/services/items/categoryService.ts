import { Category, ICategory } from "../../models";
import { getCache } from "../../cache";
import { SongTreasures } from "../../client";
import { BaseService, IBaseService } from "../baseService";

export interface ICategoryService extends IBaseService<Category> {

}

export class CategoryService extends BaseService<Category, ICategory> implements ICategoryService {
    constructor(client: SongTreasures) {
        super(client, "Categories", getCache("categories"));
    }

    protected toModel(item: ICategory): Category {
        return new Category(item, this);
    }
}