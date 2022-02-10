import { ISettings, Settings } from "../models";
import BaseClient from "./baseClient";

export class SongTreasures extends BaseClient {
    private _settings: Settings | null = null;

    public async getSettings(): Promise<Settings> {
        if (!this._settings) {
            this._settings = new Settings(await this.get<ISettings>('Session/Settings'));
        }
        return this._settings;
    }

    public async setSettings(settings: ISettings) {
        await this.patch('Session/Settings', settings);
    }
}
