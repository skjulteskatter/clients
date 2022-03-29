import BaseObject from "../baseObject";

export abstract class UserModel extends BaseObject {
    public id!: string;
    public updatedAt!: string;
    public userId!: string;
    public sharedWithIds!: string[];
    public name!: string;
    public color!: string | null;
}