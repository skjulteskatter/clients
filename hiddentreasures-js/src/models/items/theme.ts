import { IThemeService } from "../..";
import { BaseItem, IBaseItem } from "./baseItem";

export interface ITheme extends IBaseItem {

}

export class Theme extends BaseItem<IThemeService> implements ITheme {
    
}

export default Theme;