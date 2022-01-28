import { Http } from "../http/http";
import { IBaseDocument } from "../models/baseDocument";

export abstract class BaseService<T extends TInterface, TInterface extends IBaseDocument> {
    private _endpoint;
    private _listEverything;
    private _http;

    constructor(http: Http, endpoint: string, listEverything = false) {
        this._endpoint = endpoint;
        this._listEverything = listEverything;
        this._http = http;
    }

    protected abstract toModel(item: TInterface): T;

    protected models: T[] | null = null;
    protected modelsByParent: {
        [parent: string]: string[];
    } = {};

    public async list() {
        if (!this.models) {
            this.models = (await this._http.get<TInterface[]>(`api/${this._endpoint}`)).map(i => this.toModel(i));
        }
    }
}