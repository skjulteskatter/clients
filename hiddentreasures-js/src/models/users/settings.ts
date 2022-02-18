import BaseObject from "../baseObject";

export abstract class ISettings extends BaseObject {
    public languages!: string[];
    public defaultLanguage!: string;
    public defaultTransposition!: string;    
    public defaultTheme!: "light" | "dark";

    constructor(i: ISettings) {
        super(i);
    }
}

export class Settings extends ISettings {

}
