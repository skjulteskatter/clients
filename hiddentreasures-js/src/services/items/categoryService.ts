import { Category, ICategory } from "../../models";
import { getCache } from "../../cache";
import { Client } from "../../client";
import { BaseService, IBaseService } from "../baseService";

export interface ICategoryService extends IBaseService<Category> {

}

export class CategoryService extends BaseService<Category, ICategory> implements ICategoryService {
    constructor(client: Client) {
        super(client, "Categories", getCache("categories"));
    }

    protected toModel(item: ICategory): Category {
        return new Category(item, this);
    }
}