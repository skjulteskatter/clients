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
    originalKey: string;
    transposition: number | null;
    notes: string | null;
    hasChords: boolean;
    hasNewMelody: boolean;
}

export class Lyrics extends BaseDocument implements ILyrics {
    public songId;
    public language;
    public format;
    public originalKey;
    public transposition;
    public notes;
    public content;
    public hasChords;
    public hasNewMelody;

    constructor(i: ILyrics) {
        super(i);
        this.songId = i.songId;
        this.language = i.language;
        this.format = i.format;
        this.hasChords = i.hasChords;
        this.originalKey = i.originalKey;
        this.transposition = i.transposition ?? null;
        this.hasNewMelody = i.hasNewMelody;
        this.notes = i.notes ?? null;
        this.content = i.content;
    }
}
