import { Country, ICountry } from "../../models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseService } from "../baseService";

export class CountryService extends BaseService<Country, ICountry> {
    constructor(client: SongTreasures) {
        super(client, "Songs", cache.countries);
    }

    protected toModel(item: ICountry): Country {
        return new Country(item);
    }
}