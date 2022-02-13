export interface IUser {
    id: string;
    displayName: string;
}

export class User implements IUser {
    public id;
    public displayName;

    constructor(i: IUser) {
        this.id = i.id;
        this.displayName = i.displayName;
    }
}