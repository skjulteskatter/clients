export interface ISettings {
    languages: string[];
    defaultLanguage: string;
    defaultTransposition: string;    
    defaultTheme: "light" | "dark";
}

export class Settings implements ISettings {
    public languages;
    public defaultLanguage;
    public defaultTransposition;
    public defaultTheme;

    constructor(i: ISettings) {
        this.languages = i.languages;
        this.defaultLanguage = i.defaultLanguage;
        this.defaultTransposition = i.defaultTransposition;
        this.defaultTheme = i.defaultTheme;
    }
}
