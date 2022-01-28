import { BaseItem, IBaseItem } from "./baseItem";

export interface ICountry extends IBaseItem {
    code: string;
    language: string;
}

export class Country extends BaseItem implements ICountry {
    public code;
    public language;

    constructor(i: ICountry) {
        super(i);
        this.code = i.code;
        this.language = i.language;
    }
}

export default Country;