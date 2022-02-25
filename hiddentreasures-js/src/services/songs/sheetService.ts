import { SongTreasures } from "../../client";
import { ISheet, Sheet } from "../../models";
import { IService } from "../baseService";

export type FetchSheetOptions = {
    id: string;
    clef?: "treble" | "bass" | "alto";
    transposition?: number;
    format?: "portrait" | "landscape" | "endless";
    size?: "sm" | "md" | "lg" | "xl";
    instruments?: string[];
}

export interface ISheetService extends IService {
    get(id: string): Promise<Sheet>;
    render(options: FetchSheetOptions): Promise<string[]>;
}

export class SheetService implements ISheetService {
    protected client;

    constructor(client: SongTreasures) {
        this.client = client;
    }

    private _cache: {
        [key: string]: Sheet;
    } = {};

    public async get(id: string) {
        return this._cache[id] ??= new Sheet(await this.client.get<ISheet>('api/Sheets/' + id));
    }

    public async render(options: FetchSheetOptions) {
        return await this.client.post<string[]>('api/Sheets', options);
    }
}