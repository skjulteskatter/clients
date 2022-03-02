import { Copyright, ICopyright } from "../../models";
import { getCache } from "../../cache";
import { Client } from "../../client";
import { BaseService, IBaseService } from "../baseService";

export interface ICopyrightService extends IBaseService<Copyright> {

}

export class CopyrightService extends BaseService<Copyright, ICopyright> implements ICopyrightService {
    constructor(client: Client) {
        super(client, "Copyrights", getCache("copyrights"));
    }

    protected toModel(item: ICopyright): Copyright {
        return new Copyright(item, this);
    }
}