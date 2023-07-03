import { Source, ISource } from "../../models";
import { getCache } from "../../cache";
import { Client } from "../../client";
import { BaseModelService, IBaseModelService } from "../baseModelService";

export interface ISourceService extends IBaseModelService<Source> {

}

export class SourceService extends BaseModelService<Source, ISource> implements ISourceService {
    constructor(client: Client) {
        super(client, "Sources", getCache("sources"));
    }

    protected toModel(item: ISource): Source {
        return new Source(item, this);
    }
}