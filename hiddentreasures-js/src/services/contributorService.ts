import { Contributor, IContributor } from "..";
import { getCache } from "../cache";
import { Client } from "../client";
import { BaseService, IBaseService } from "./baseService";

export interface IContributorService extends IBaseService<Contributor> {

}

export class ContributorService extends BaseService<Contributor, IContributor> {
    constructor(client: Client) {
        super(client, "Contributors", getCache("contributors"));
    }

    protected toModel(item: IContributor): Contributor {
        return new Contributor(item, this);
    }
}