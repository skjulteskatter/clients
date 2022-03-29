import { Contributor, IContributor } from "..";
import { getCache } from "../cache";
import { Client } from "../client";
import { BaseModelService, IBaseModelService } from "./baseModelService";

export interface IContributorService extends IBaseModelService<Contributor> {

}

export class ContributorService extends BaseModelService<Contributor, IContributor> {
    constructor(client: Client) {
        super(client, "Contributors", getCache("contributors"));
    }

    protected toModel(item: IContributor): Contributor {
        return new Contributor(item, this);
    }
}