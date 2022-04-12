export type RoleType = "administrator" | "extended" | "technician" | "editor";

export abstract class IRole extends String {

}

export class Role extends String {
    constructor(r: IRole) {
        super(r);
    }

    private static roles: RoleType[] = [
        "technician",
        "editor",
        "extended",
        "administrator",
    ];

    public get value() {
        return this.valueOf() as RoleType;
    }

    public fulfills(role: RoleType) {
        return Role.roles.indexOf(this.valueOf() as RoleType) > Role.roles.indexOf(role);
    }
}