import BaseDocument from "../baseDocument";
import Participant, { IParticipant } from "./participant";

export type SongType = "lyrics" | "track" | "sheetmusic";

export type SongReference = {
    referenceId: string;
    type: "text" | "melody" | null;
    description: string | null;
}

export abstract class ISong extends BaseDocument {
    public collections!: {
        collectionId: string,
        number: number | null,
    }[];
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
    public verses!: number | null;
    public image!: string | null;
    public themeIds!: string[];
    public categoryIds!: string[];
    public genreIds!: string[];
    public origins!: SongReference[];
    public copyrights!: SongReference[];
    public newMelodies!: string[];
    public participants!: IParticipant[];
}

export class Song extends ISong {
    public override participants;

    constructor(i: ISong) {
        super(i);
        this.participants = i.participants.map(i => new Participant(i));
    }
}

export default Song;