import BaseDocument, { IBaseDocument } from "../baseDocument";
import Participant, { IParticipant } from "./participant";

export type SongType = "lyrics" | "track" | "sheetmusic";

export type SongReference = {
    referenceId: string;
    type: "text" | "melody" | null;
    description: string | null;
}

export interface ISong extends IBaseDocument {
    collections: {
        [id: string]: number;
    };
    type: SongType;
    available: boolean;
    title: string;
    description: string | null;
    originalKey: string | null;
    hasLyrics: boolean;
    hasChords: boolean | null;
    yearWritten: number | null;
    yearComposed: number | null;
    defaultTempo: number | null;
    image: string | null;
    themeIds: string[];
    categoryIds: string[];
    genreIds: string[];
    origins: SongReference[];
    copyrights: SongReference[];
    newMelodies: string[];
    participants: IParticipant[];
}

export class Song extends BaseDocument implements ISong {
    public collections;
    public type;
    public available;
    public title;
    public description;
    public originalKey;
    public hasLyrics;
    public hasChords;
    public yearWritten;
    public yearComposed;
    public defaultTempo;
    public image;
    public themeIds;
    public categoryIds;
    public genreIds;
    public origins;
    public copyrights;
    public newMelodies;
    public participants;

    constructor(i: ISong) {
        super(i);
        this.collections = i.collections;
        this.type = i.type;
        this.available = i.available;
        this.title = i.title ?? null;
        this.description = i.description ?? null;
        this.originalKey = i.originalKey ?? null;
        this.hasLyrics = i.hasLyrics;
        this.hasChords = i.hasChords ?? null;
        this.yearWritten = i.yearWritten ?? null;
        this.yearComposed = i.yearComposed ?? null;
        this.defaultTempo = i.defaultTempo ?? null;
        this.image = i.image ?? null;
        this.themeIds = i.themeIds ?? null;
        this.categoryIds = i.categoryIds;
        this.genreIds = i.genreIds;
        this.origins = i.origins;
        this.copyrights = i.copyrights;
        this.newMelodies = i.newMelodies;
        this.participants = i.participants.map(i => new Participant(i));
    }
}

export default Song;