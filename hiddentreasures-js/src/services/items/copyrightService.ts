import { Copyright, ICopyright } from "../../models";
import { getCache } from "../../cache";
import { SongTreasures } from "../../client";
import { BaseService, IBaseService } from "../baseService";

export interface ICopyrightService extends IBaseService<Copyright> {

}

export class CopyrightService extends BaseService<Copyright, ICopyright> implements ICopyrightService {
    constructor(client: SongTreasures) {
        super(client, "Copyrights", getCache("copyrights"));
    }

    protected toModel(item: ICopyright): Copyright {
        return new Copyright(item, this);
    }
}