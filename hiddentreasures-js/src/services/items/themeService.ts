import { Theme, ITheme } from "../../models";
import { Client } from "../../client";
import { BaseService, IBaseService } from "../baseService";
import { getCache } from "../../cache";

export interface IThemeService extends IBaseService<Theme> {

}

export class ThemeService extends BaseService<Theme, ITheme> implements IThemeService {
    constructor(client: Client) {
        super(client, "Themes", getCache("themes"));
    }

    protected toModel(item: ITheme): Theme {
        return new Theme(item, this);
    }
}