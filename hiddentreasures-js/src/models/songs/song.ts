import { ISongService } from "../..";
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

export class Song extends BaseDocument<ISongService> implements ISong {
    public collections: {
        [id: string]: number;
    } = {};
    public type!: SongType;
    public available!: boolean;
    public title!: string;
    public description!: string | null;
    public originalKey!: string | null;
    public hasLyrics!: boolean;
    public hasChords!: boolean | null;
    public yearWritten!: number | null;
    public yearComposed!: number | null;
    public defaultTempo!: number | null;
    public image!: string | null;
    public themeIds!: string[];
    public categoryIds!: string[];
    public genreIds!: string[];
    public origins!: SongReference[];
    public copyrights!: SongReference[];
    public newMelodies!: string[];
    public participants;

    constructor(i: ISong, s: ISongService) {
        super(i, s);
        this.participants = i.participants.map(i => new Participant(i));
    }
}

export default Song;