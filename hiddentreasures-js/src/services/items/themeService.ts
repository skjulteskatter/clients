import { Theme, ITheme } from "../../models";
import { Client } from "../../client";
import { BaseModelService, IBaseModelService } from "../baseModelService";
import { getCache } from "../../cache";

export interface IThemeService extends IBaseModelService<Theme> {

}

export class ThemeService extends BaseModelService<Theme, ITheme> implements IThemeService {
    constructor(client: Client) {
        super(client, "Themes", getCache("themes"));
    }

    protected toModel(item: ITheme): Theme {
        return new Theme(item, this);
    }
}