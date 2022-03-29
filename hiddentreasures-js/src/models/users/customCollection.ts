import { CustomCollectionEntry, ICustomCollectionEntry } from "./customCollectionEntry";
import { Permissions } from "./permissions";
import { UserModel } from "./userModel";

export abstract class ICustomCollection extends UserModel {
    public editorIds!: string[];
    public shareKey!: string;
    public entries!: ICustomCollectionEntry[] | null;
    public permissions!: Permissions;
}

export class CustomCollection extends ICustomCollection {
    public override entries;

    constructor(i: ICustomCollection) {
        super(i);
        this.entries = i.entries ? i.entries.map(i => new CustomCollectionEntry(i)) : null;
    }
}