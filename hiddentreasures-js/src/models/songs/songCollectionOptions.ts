import BaseObject from "../baseObject";

export abstract class ISongCollectionOptions extends BaseObject {
    public defaultType!: "song" | "track" | "sheetmusic" | null;
    public defaultSort!: "number" | "title" | null;
    public useNumbers!: boolean;
}

export class SongCollectionOptions extends ISongCollectionOptions {
    constructor(i: ISongCollectionOptions) {
        super(i);
    }
}