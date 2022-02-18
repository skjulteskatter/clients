import { Copyright, ICopyright } from "models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseService } from "../baseService";

export class CopyrightService extends BaseService<Copyright, ICopyright> {
    constructor(client: SongTreasures) {
        super(client, "Songs", cache.copyrights);
    }

    protected toModel(item: ICopyright): Copyright {
        return new Copyright(item);
    }
}