import { Permissions } from "./permissions";
import { UserModel } from "./userModel";

export abstract class ITag extends UserModel {
    public songIds!: string[];
    public permissions!: Permissions;
}

export class Tag extends ITag {
    constructor(i: ITag) {
        super(i);
    }
}