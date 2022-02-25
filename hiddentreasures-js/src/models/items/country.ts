import { ICountryService } from "../..";
import { BaseItem, IBaseItem } from "./baseItem";

export interface ICountry extends IBaseItem {
    code: string;
    language: string;
}

export class Country extends BaseItem<ICountryService> implements ICountry {
    public code;
    public language;

    constructor(i: ICountry, s: ICountryService) {
        super(i, s);
        this.code = i.code;
        this.language = i.language;
    }
}

export default Country;