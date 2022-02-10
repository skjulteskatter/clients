import { Theme, ITheme } from "../../models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseService } from "../baseService";

export class ThemeService extends BaseService<Theme, ITheme> {
    constructor(client: SongTreasures) {
        super(client, "Songs", cache.themes);
    }

    protected toModel(item: ITheme): Theme {
        return new Theme(item);
    }
}