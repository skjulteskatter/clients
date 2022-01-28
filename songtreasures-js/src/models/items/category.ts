import { BaseItem, IBaseItem } from "./baseItem";

export interface ICategory extends IBaseItem {

}

export class Category extends BaseItem implements ICategory {
    
}

export default Category;