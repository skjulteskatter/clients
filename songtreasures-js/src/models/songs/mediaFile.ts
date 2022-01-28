import BaseDocument, { IBaseDocument } from "../baseDocument";
import Participant, { IParticipant } from "./participant";

export type MediaType = "audio" | "video" | "sheetmusic" | "sheetmusic-pdf";

export interface IMediaFile extends IBaseDocument {
    songId: string;
    type: MediaType;
    name: string;
    category: string | null;
    information: string | null;
    language: string | null;
    transposition: string | null;
    directUrl: string;
    instrumentId: string | null;
    participants: IParticipant[];
}

export class MediaFile extends BaseDocument implements IMediaFile {
    public songId;
    public type;
    public name;
    public category;
    public information;
    public language;
    public transposition;
    public directUrl;
    public instrumentId;
    public participants;

    constructor(i: IMediaFile) {
        super(i);
        this.songId = i.songId;
        this.type = i.type;
        this.name = i.name;
        this.category = i.category ?? null;
        this.information = i.information ?? null;
        this.language = i.language ?? null;
        this.transposition = i.transposition ?? null;
        this.directUrl = i.directUrl ?? null;
        this.instrumentId = i.instrumentId ?? null;
        this.participants = i.participants.map(i => new Participant(i));
    }
}