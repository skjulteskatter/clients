import BaseObject from "../baseObject";

export type CustomCollectionEntryType = "song";

export abstract class ICustomCollectionEntry extends BaseObject {
    public id!: string;
    public updatedAt!: string;
    public updatedById!: string;
    public createdAt!: string;
    public createdById!: string;
    public type!: CustomCollectionEntryType;
    public itemId!: string;
    public sort!: number | null;
    public transposition!: number | null;
}

export class CustomCollectionEntry extends ICustomCollectionEntry {
    constructor(i: ICustomCollectionEntry) {
        super(i);
    }
}