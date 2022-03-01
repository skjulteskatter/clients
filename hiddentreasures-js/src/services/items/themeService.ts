import { Theme, ITheme } from "../../models";
import { SongTreasures } from "../../client";
import { BaseService, IBaseService } from "../baseService";
import { getCache } from "../../cache";

export interface IThemeService extends IBaseService<Theme> {

}

export class ThemeService extends BaseService<Theme, ITheme> implements IThemeService {
    constructor(client: SongTreasures) {
        super(client, "Themes", getCache("themes"));
    }

    protected toModel(item: ITheme): Theme {
        return new Theme(item, this);
    }
}