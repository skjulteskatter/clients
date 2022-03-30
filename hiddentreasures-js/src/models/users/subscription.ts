import BaseObject from "../baseObject";

export abstract class ISubscription extends BaseObject {
    public id!: string;
    public productIds!: string[];
    public expireAt!: string;
    public expired!: boolean;
}

export class Subscription extends ISubscription {
    constructor(i: ISubscription) {
        super(i);
    }
}
