export interface ISearchQuery {
    query: string;
    limit?: number;
    skip?: number;
}

export class SearchQuery implements ISearchQuery {
    public query: string;
    public limit: number;
    public skip: number;

    constructor(i: ISearchQuery) {
        this.query = i.query;
        this.limit = i.limit ?? 20;
        this.skip = i.skip ?? 0;
    }
}