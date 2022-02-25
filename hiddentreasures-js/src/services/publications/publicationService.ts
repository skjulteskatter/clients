import { IPublication, Publication } from "../../models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseChildService, IBaseChildService } from "../baseChildService";

export interface IPublicationService extends IBaseChildService<Publication> {}

export class PublicationService extends BaseChildService<Publication, IPublication> {
    constructor(client: SongTreasures) {
        super(client, "Publications", cache.publications);
    }

    protected toModel(item: IPublication): Publication {
        return new Publication(item, this);
    }

    protected parents(item: IPublication): string[] {
        return [item.collectionId];
    }
}