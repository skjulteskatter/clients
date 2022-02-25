import { Contributor, IContributor } from "..";
import cache from "../cache";
import { SongTreasures } from "../client";
import { BaseService, IBaseService } from "./baseService";

export interface IContributorService extends IBaseService<Contributor> {

}

export class ContributorService extends BaseService<Contributor, IContributor> {
    constructor(client: SongTreasures) {
        super(client, "Songs", cache.contributors);
    }

    protected toModel(item: IContributor): Contributor {
        return new Contributor(item, this);
    }
}