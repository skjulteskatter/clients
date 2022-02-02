import { Contributor, IContributor } from "..";
import cache from "cache";
import { Client } from "client";
import { BaseService } from "./baseService";

export class ContributorService extends BaseService<Contributor, IContributor> {
    constructor(client: Client) {
        super(client, "Songs", cache.contributors);
    }

    protected toModel(item: IContributor): Contributor {
        return new Contributor(item);
    }
}