import { Country, ICountry } from "../../models";
import { getCache } from "../../cache";
import { Client } from "../../client";
import { BaseModelService, IBaseModelService } from "../baseModelService";

export interface ICountryService extends IBaseModelService<Country> {

}

export class CountryService extends BaseModelService<Country, ICountry> implements ICountryService {
    constructor(client: Client) {
        super(client, "Countries", getCache("countries"));
    }

    protected toModel(item: ICountry): Country {
        return new Country(item, this);
    }
}