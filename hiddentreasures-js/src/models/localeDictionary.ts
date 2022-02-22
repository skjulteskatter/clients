import BaseObject from "./baseObject";

export abstract class ILocaleDictionary extends BaseObject {
    [key: string]: any;

    public get(language: string): string {
        return this[language] ?? Object.entries(this).find((e) => typeof(e[1]) === "string")?.[1] ?? "";
    }
}

export class LocaleDictionary extends ILocaleDictionary {
    constructor(i: {[key: string]: string}) {
        super(i);
    }
}