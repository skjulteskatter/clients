import { Client } from "client";

export type FetchSheetOptions = {

}

export interface ISheetService {

}

export class SheetService implements ISheetService {
    protected client;

    constructor(client: Client) {
        this.client = client;
    }
}