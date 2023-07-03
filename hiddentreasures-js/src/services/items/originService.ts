import { Origin, IOrigin } from "../../models";
import { getCache } from "../../cache";
import { Client } from "../../client";
import { BaseModelService, IBaseModelService } from "../baseModelService";

export interface IOriginService extends IBaseModelService<Origin> {

}

export class OriginService extends BaseModelService<Origin, IOrigin> implements IOriginService {
    constructor(client: Client) {
        super(client, "Origins", getCache("origins"));
    }

    protected toModel(item: IOrigin): Origin {
        return new Origin(item, this);
    }
}