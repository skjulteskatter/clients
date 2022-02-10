import cache from "cache";
import { ISettings, Settings } from "models";
import BaseClient from "./baseClient";

export class SongTreasures extends BaseClient {
    private _settings: Settings | null = null;

    public async getSettings(): Promise<Settings> {
        if (!this._settings) {
            let settings: ISettings | null = await cache.config.get('settings');
            if (!settings) {
                settings = await this.get<ISettings>('Session/Settings');
                await cache.config.add(settings, 'settings');
            }
            this._settings = new Settings(settings);
        }
        return this._settings;
    }
}
