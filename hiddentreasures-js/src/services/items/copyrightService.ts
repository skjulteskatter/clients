import { Copyright, ICopyright } from "../../models";
import { getCache } from "../../cache";
import { Client } from "../../client";
import { BaseModelService, IBaseModelService } from "../baseModelService";

export interface ICopyrightService extends IBaseModelService<Copyright> {

}

export class CopyrightService extends BaseModelService<Copyright, ICopyright> implements ICopyrightService {
    constructor(client: Client) {
        super(client, "Copyrights", getCache("copyrights"));
    }

    protected toModel(item: ICopyright): Copyright {
        return new Copyright(item, this);
    }
}