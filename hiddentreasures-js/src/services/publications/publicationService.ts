import { IPublication, Publication } from "../../models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseChildService } from "../baseChildService";

export class PublicationService extends BaseChildService<Publication, IPublication> {
    constructor(client: SongTreasures) {
        super(client, "Publications", cache.publications);
    }

    protected toModel(item: IPublication): Publication {
        return new Publication(item);
    }

    protected parents(item: IPublication): string[] {
        return Object.keys(item.collections);
    }
}