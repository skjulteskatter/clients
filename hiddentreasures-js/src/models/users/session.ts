import BaseObject from "../baseObject";
import { IRole, Role } from "./role";
import { ISettings, Settings } from "./settings";

export abstract class ISession extends BaseObject {
    public userId!: string;
    public settings!: ISettings;
    public roles!: IRole[];
    public privacyPolicyAccepted!: boolean;
}

export class Session extends ISession {
    public override roles;
    public override settings;

    constructor(i: ISession) {
        super(i);
        this.roles = i.roles.map(r => new Role(r));
        this.settings = new Settings(i.settings);
    }
}