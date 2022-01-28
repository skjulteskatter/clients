import { BaseItem, IBaseItem } from "./baseItem";

export interface ITheme extends IBaseItem {

}

export class Theme extends BaseItem implements ITheme {
    
}

export default Theme;