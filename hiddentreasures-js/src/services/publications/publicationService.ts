import { IPublication, Publication } from "../../models";
import { Client } from "../../client";
import { BaseChildService, IBaseChildService } from "../baseChildService";
import { getCache } from "../../cache";

export interface IPublicationService extends IBaseChildService<Publication> {}

export class PublicationService extends BaseChildService<Publication, IPublication> {
    constructor(client: Client) {
        super(client, "Publications", getCache("publications"));
    }

    protected toModel(item: IPublication): Publication {
        return new Publication(item);
    }

    protected parents(item: IPublication): string[] {
        return [item.collectionId];
    }
}