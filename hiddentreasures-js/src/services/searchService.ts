import { Client } from "../client";
import { ISearchQuery, SearchQuery } from "../models/searchQuery";
import { SearchResultGroup } from "../models/searchResultGroup";



export interface ISearchService {
    search(query: ISearchQuery): Promise<SearchResultGroup>;
}

export class SearchService implements ISearchService {
    protected client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public search(query: ISearchQuery) {
        const q = new SearchQuery(query);
        return this.client.post<SearchResultGroup>("api/Search", q);
    }
}