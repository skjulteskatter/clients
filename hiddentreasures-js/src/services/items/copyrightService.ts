import { Copyright, ICopyright } from "models";
import cache from "cache";
import { Client } from "client";
import { BaseService } from "../baseService";

export class CopyrightService extends BaseService<Copyright, ICopyright> {
    constructor(client: Client) {
        super(client, "Songs", cache.copyrights);
    }

    protected toModel(item: ICopyright): Copyright {
        return new Copyright(item);
    }
}