import { PatchOptions } from "../models/patchOptions";
import { ISession, ISettings, Session, Settings, IUser, User } from "../models";
import BaseClient from "./baseClient";

export class Client extends BaseClient {
    private _session: Session | null = null;
    public async getSession(): Promise<Session> {
        return this._session ??= new Session(await this.get<ISession>('api/Session'));
    }

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
        throw new Error("Cannot update user yet");
    }
}
