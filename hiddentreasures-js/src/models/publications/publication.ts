import { IPublicationService } from "../../services/publications/publicationService";
import BaseDocument from "../baseDocument";
import { ILocaleDictionary, LocaleDictionary } from "../localeDictionary";

export abstract class IPublication extends BaseDocument<IPublicationService> {
    public collectionId!: string;
    public datePublished!: string;
    public title!: string;
    public key!: ILocaleDictionary;
    public description!: string;
    public icon?: string;
    public image?: string;
}

export class Publication extends IPublication {
    public override key: LocaleDictionary

    constructor(i: IPublication, s: IPublicationService) {
        super(i, s);
        this.key = new LocaleDictionary(i.key);
    }
}