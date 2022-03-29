import { getCache } from "../../cache";
import { Client } from "../../client";
import { CustomCollection, CustomCollectionEntry, ICustomCollection, ICustomCollectionEntry } from "../../models";
import { IUserModelService, ModelCreateOptions, ModelUpdateOptions, UserModelService } from "../userModelService";

export type CustomCollectionCreateOptions = ModelCreateOptions & {
    initialEntries: {
        itemId: string;
        type: string;
        sort: number | null;
        transposition: number | null;
    }[];
}

export type CustomCollectionUpdateOptions = ModelUpdateOptions & {

};

export type CustomCollectionEntryUpdateOptions = {
    add: {
        itemId: string;
        type: string;
        sort: number | null;
        transposition: number | null;
    }[] | null;
    remove: string[] | null;
    update: {
        [key: string]: {
            sort: number | null;
            transposition: number | null;
        }
    };
}

export interface ICustomCollectionService extends IUserModelService<ICustomCollection, CustomCollectionCreateOptions, CustomCollectionUpdateOptions> {
    getEntries(id: string): Promise<ICustomCollectionEntry[]>;
    updateEntries(id: string, options: CustomCollectionEntryUpdateOptions): Promise<ICustomCollectionEntry[]>
    updateMultipleEntries(options: {
        [key: string]: CustomCollectionEntryUpdateOptions;
    }): Promise<{
        [key: string]: ICustomCollectionEntry[];
    }>;
}

export class CustomCollectionService extends UserModelService<CustomCollection, ICustomCollection, CustomCollectionCreateOptions, CustomCollectionUpdateOptions> implements ICustomCollectionService {
    constructor(client: Client) {
        super(client, "CustomCollections", getCache("customCollections"));
    }
    
    protected toModel(item: ICustomCollection): CustomCollection {
        return new CustomCollection(item);
    }

    private _entryCache: {
        [key: string]: CustomCollectionEntry[];
    } = {};

    public async getEntries(collectionId: string) {
        if (!this._entryCache[collectionId]){
            this._entryCache[collectionId] = (await this.httpGet<ICustomCollectionEntry[]>(`${collectionId}/Entries`)).map(i => new CustomCollectionEntry(i));
            setTimeout(() => {
                delete this._entryCache[collectionId];
            }, 30000);
        }
        return this._entryCache[collectionId];
    }

    public async updateEntries(collectionId: string, options: CustomCollectionEntryUpdateOptions): Promise<CustomCollectionEntry[]> {
        const items = (await this.httpPatch<ICustomCollectionEntry[]>(`${collectionId}/Entries`, options)).map(i => new CustomCollectionEntry(i));

        delete this._entryCache[collectionId];

        return items;
    }

    public async updateMultipleEntries(options: { [key: string]: CustomCollectionEntryUpdateOptions; }): Promise<{ [key: string]: CustomCollectionEntry[]; }> {
        return Object.entries((await this.httpPatch<{
            [key: string]: ICustomCollectionEntry[];
        }>("Entries", options))).reduce((a, b) => {
            a[b[0]] = b[1].map(i => new CustomCollectionEntry(i));
            delete this._entryCache[b[0]];
            return a;
        }, {
        } as {
            [key: string]: CustomCollectionEntry[];
        })
    }
}
