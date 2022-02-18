import BaseObject from "../baseObject";

export abstract class IUser extends BaseObject {
    public id!: string;
    public inheritsFromId?: string;
    public image?: string;
    public displayName!: string;
    public email!: string;
    public phoneNumber?: string;
    public privacyPolicyAccepted!: boolean;
    public termsAndConditionsAccepted!: boolean;
    public registered!: boolean;
    
    constructor(i: IUser) {
        super(i);
    }
}

export class User extends IUser {
    
}