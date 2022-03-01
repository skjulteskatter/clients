import { IPublication, Publication } from "../../models";
import { SongTreasures } from "../../client";
import { BaseChildService, IBaseChildService } from "../baseChildService";
import { getCache } from "../../cache";

export interface IPublicationService extends IBaseChildService<Publication> {}

export class PublicationService extends BaseChildService<Publication, IPublication> {
    constructor(client: SongTreasures) {
        super(client, "Publications", getCache("publications"));
    }

    protected toModel(item: IPublication): Publication {
        return new Publication(item, this);
    }

    protected parents(item: IPublication): string[] {
        return [item.collectionId];
    }
}