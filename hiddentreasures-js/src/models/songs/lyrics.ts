import { ILyricsService } from "../..";
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

export class Lyrics extends BaseDocument<ILyricsService> implements ILyrics {
    public songId!: string;
    public language!: string;
    public format!: LyricsFormat;
    public originalKey!: string;
    public transposition!: number | null;
    public notes!: string | null;
    public content!: LyricsContent | LyricsChordContent[] | string;
    public hasChords!: boolean;
    public hasNewMelody!: boolean;

    constructor(i: ILyrics, s: ILyricsService) {
        super(i, s);
    }
}
