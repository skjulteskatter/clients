import BaseObject from "./baseObject";

export type SearchResult = {
    id: string;
    context: {
        [key: string]: string;
    };
};

export abstract class ISearchResultGroup extends BaseObject {
    public contributors!: SearchResult[];
    public songs!: SearchResult[];
    public articles!: SearchResult[];
}

export class SearchResultGroup extends ISearchResultGroup {
    constructor(i: ISearchResultGroup) {
        super(i);
    }
}