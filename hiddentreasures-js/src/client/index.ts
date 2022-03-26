import { IUser, User } from "../models/users/user";
import { PatchOptions } from "../models/patchOptions";
import { ISettings, Settings } from "../models";
import BaseClient from "./baseClient";

export class Client extends BaseClient {
    private _settings: Settings | null = null;

    public async getSettings(): Promise<Settings> {
        return this._settings ??= new Settings(await this.get<ISettings>('api/Session/Settings'));
    }

    public async setSettings(options: PatchOptions<ISettings>) {
        await this.patch('Session/Settings', options);
        if (this._settings) {
            options.patch(this._settings);
        }
    }

    private _user: User | null = null;

    public async getUser(): Promise<User> {
        return this._user ??= new User(await this.get<IUser>('api/Session/User'));
    }

    public async updateUser(user: IUser) {
        console.log(user.id);
    }
}
