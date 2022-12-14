import BaseDocument from "./baseDocument";
import { ISongCollectionOptions, SongCollectionOptions } from "./songs";

export abstract class ICollection extends BaseDocument {
    public priority!: number;
    public type!: "song" | "scripture" | "publication";
    public title!: string;
    public description!: string;
    public header!: string | null;
    public key!: string;
    public keys!: {
        [key: string]: string;
    };
    public icon!: string | null;
    public image!: string | null;
    public songOptions!: ISongCollectionOptions | null;
    public owned!: boolean;
    public enabled!: boolean;
}

export class Collection extends ICollection {
    public override songOptions;

    constructor(i: ICollection) {
        super(i);
        this.songOptions = i.songOptions ? new SongCollectionOptions(i.songOptions) : null;
    }

    public containsKey(key: string) {
        return this.id === key || this.key === key || Object.values(this.keys).includes(key);
    }
}