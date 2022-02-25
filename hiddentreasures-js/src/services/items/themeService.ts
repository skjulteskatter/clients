import { Theme, ITheme } from "../../models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseService, IBaseService } from "../baseService";

export interface IThemeService extends IBaseService<Theme> {

}

export class ThemeService extends BaseService<Theme, ITheme> implements IThemeService {
    constructor(client: SongTreasures) {
        super(client, "Themes", cache.themes);
    }

    protected toModel(item: ITheme): Theme {
        return new Theme(item, this);
    }
}