import { Category, ICategory } from "../../models";
import { getCache } from "../../cache";
import { Client } from "../../client";
import { BaseModelService, IBaseModelService } from "../baseModelService";

export interface ICategoryService extends IBaseModelService<Category> {

}

export class CategoryService extends BaseModelService<Category, ICategory> implements ICategoryService {
    constructor(client: Client) {
        super(client, "Categories", getCache("categories"));
    }

    protected toModel(item: ICategory): Category {
        return new Category(item, this);
    }
}