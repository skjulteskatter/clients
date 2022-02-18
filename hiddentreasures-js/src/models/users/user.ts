import BaseObject from "../baseObject";

export abstract class IUser extends BaseObject {
    id!: string;
    inheritsFromId?: string;
    image?: string;
    displayName!: string;
    email!: string;
    phoneNumber?: string;
    privacyPolicyAccepted!: boolean;
    termsAndConditionsAccepted!: boolean;
    registered!: boolean;

    constructor(i: IUser) {
        super(i);
    }
}

export class User extends IUser {
    
}