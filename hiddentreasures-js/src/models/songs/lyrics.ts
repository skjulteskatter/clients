import BaseDocument, { IBaseDocument } from "../baseDocument";

export type LyricsFormat = "json" | "performance";

export type LyricsContent = {
    [key: string]: {
        name: string;
        content: string[];
        // bibleReferences: BibleReference[];
    };
}

export type LyricsChordContent = {
    key: string;
    name: string;
    content: {
        chords: string[];
        parts: string[];
    }[];
};

export interface ILyrics extends IBaseDocument {
    songId: string;
    language: string;
    content: LyricsContent | LyricsChordContent[] | string;
    format: LyricsFormat;
    hasChords: boolean;
    originalKey: string;
    transposedToKey: string | null;
    secondaryChords: boolean;
    notes: string | null;
    transpositions: {
        [key: string]: number;
    };
}

export class Lyrics extends BaseDocument implements ILyrics {
    public songId;
    public language;
    public format;
    public hasChords;
    public originalKey;
    public transposedToKey;
    public secondaryChords;
    public notes;
    public transpositions;
    public content;

    constructor(i: ILyrics) {
        super(i);
        this.songId = i.songId;
        this.language = i.language;
        this.format = i.format;
        this.hasChords = i.hasChords;
        this.originalKey = i.originalKey;
        this.transposedToKey = i.transposedToKey ?? null;
        this.secondaryChords = i.secondaryChords;
        this.notes = i.notes ?? null;
        this.transpositions = i.transpositions;
        this.content = i.content;
    }
}
