import { ICollectionService } from "..";
import BaseDocument, { IBaseDocument } from "./baseDocument";

export interface ICollection extends IBaseDocument {
    priority: number;
    type: "song" | "scripture" | "publication";
    defaultType: "song" | "track" | "sheetmusic" | null;
    defaultSort: string;
    title: string;
    keys: {
        [key: string]: string;
    };
    description: string;
    icon: string;
    image: string;
    owned: boolean;
}

export class Collection extends BaseDocument<ICollectionService> implements ICollection {
    public priority;
    public type;
    public defaultType;
    public defaultSort;
    public title;
    public keys;
    public description;
    public icon;
    public image;
    public owned;

    constructor(i: ICollection, service: ICollectionService) {
        super(i, service);
        this.priority = i.priority;
        this.type = i.type;
        this.defaultType = i.defaultType ?? null;
        this.defaultSort = i.defaultSort ?? null;
        this.title = i.title;
        this.keys = i.keys;
        this.description = i.description;
        this.icon = i.icon;
        this.image = i.image;
        this.owned = i.owned ?? false;
    }
}