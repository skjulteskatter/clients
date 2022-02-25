import { ICategoryService } from "../..";
import { BaseItem, IBaseItem } from "./baseItem";

export interface ICategory extends IBaseItem {

}

export class Category extends BaseItem<ICategoryService> implements ICategory {
    
}

export default Category;