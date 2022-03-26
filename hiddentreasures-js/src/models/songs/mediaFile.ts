import BaseDocument from "../baseDocument";
import Participant, { IParticipant } from "./participant";

export type MediaType = "audio" | "video" | "sheetmusic" | "sheetmusic-pdf";

export abstract class IMediaFile extends BaseDocument {
    public songId!: string;
    public type!: MediaType;
    public name!: string;
    public category!: string | null;
    public information!: string | null;
    public language!: string | null;
    public transposition!: string | null;
    public directUrl!: string;
    public instrumentId!: string | null;
    public participants!: IParticipant[];
}

export class MediaFile extends IMediaFile {
    public override participants: Participant[];

    constructor(i: IMediaFile) {
        super(i);
        this.participants = i.participants.map(i => new Participant(i));
    }
}