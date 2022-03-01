import { Country, ICountry } from "../../models";
import { getCache } from "../../cache";
import { SongTreasures } from "../../client";
import { BaseService, IBaseService } from "../baseService";

export interface ICountryService extends IBaseService<Country> {

}

export class CountryService extends BaseService<Country, ICountry> implements ICountryService {
    constructor(client: SongTreasures) {
        super(client, "Countries", getCache("countries"));
    }

    protected toModel(item: ICountry): Country {
        return new Country(item, this);
    }
}