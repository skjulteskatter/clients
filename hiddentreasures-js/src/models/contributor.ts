import { IContributorService } from "..";
import BaseDocument, { IBaseDocument } from "./baseDocument";

export interface IContributor extends IBaseDocument {
    id: string;
    name: string;
    birthYear: number | null;
    subtitle: string | null;
    country: string | null;
    image: string | null;
    biography: string | null;
}

export class Contributor extends BaseDocument<IContributorService> implements IContributor {
    public name;
    public birthYear;
    public subtitle;
    public country;
    public image;
    public biography;

    constructor(i: IContributor, s: IContributorService) {
        super(i, s);
        this.name = i.name;
        this.birthYear = i.birthYear ?? null;
        this.subtitle = i.subtitle ?? null;
        this.country = i.country ?? null;
        this.image = i.image ?? null;
        this.biography = i.biography ?? null;
    }
}

export default Contributor;