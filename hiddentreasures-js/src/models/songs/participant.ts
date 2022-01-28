export type ParticipantType = "composer" | "author" | "arranger" | "artist";

export interface IParticipant {
    contributorId: string;
    type: ParticipantType;
}

export class Participant implements IParticipant {
    public contributorId;
    public type;

    constructor(i: IParticipant) {
        this.contributorId = i.contributorId;
        this.type = i.type;
    }
}

export default Participant;