import { ICollectionService } from "..";
import BaseDocument from "./baseDocument";
import { ISongCollectionOptions, SongCollectionOptions } from "./songs";

export abstract class ICollection extends BaseDocument<ICollectionService> {
    public priority!: number;
    public type!: "song" | "scripture" | "publication";
    public title!: string;
    public description!: string;
    public key!: string;
    public keys!: {
        [key: string]: string;
    };
    public icon!: string | null;
    public image!: string | null;
    public songOptions!: ISongCollectionOptions | null;
    public owned!: boolean;
}

export class Collection extends ICollection {
    public override songOptions;

    constructor(i: ICollection, s: ICollectionService) {
        super(i, s);
        this.songOptions = i.songOptions ? new SongCollectionOptions(i.songOptions) : null;
    }
}