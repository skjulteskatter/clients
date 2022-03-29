import BaseObject from "../baseObject";
import { ISettings, Settings } from "./settings";

export abstract class ISession extends BaseObject {
    public userId!: string;
    public settings!: ISettings;
    public roles!: string[];
    public privacyPolicyAccepted!: boolean;
}

export class Session extends ISession {
    public override settings;

    constructor(i: ISession) {
        super(i);
        this.settings = new Settings(i.settings);
    }
}