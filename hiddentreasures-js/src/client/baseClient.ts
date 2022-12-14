import "isomorphic-fetch";

export default class BaseClient {
    private _basePath: string;
    private _apiVersion: string;
    private _debug;

    protected onError?: (error: any) => void;
    protected getToken: () => Promise<string>;

    constructor(options: {
        getToken: () => Promise<string>;
        basePath?: string;
        apiVersion?: "4.0";
        debug?: boolean;
        onError?: (error: any) => void;
    }) {
        this._basePath = options.basePath ?? "https://api.songtreasures.app/";
        this._apiVersion = options.apiVersion ?? "4.0";
        this._debug = options.debug ?? false;
        this.onError = options.onError;
        this.getToken = options.getToken;
    }

    public validateResponse(response: Response): Promise<Response> {
        return new Promise((resolve, reject) => {
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            } else if (response.status === 401) {
                reject({status: response.status, value: "Unauthorized"});
            } else {
                response.text().then(t =>  {
                    reject({status: response.status, value: t});
                });
            }
        });
    }

    public async parseJson(response: Response, json = true) {
        if (json) {
            const result = await response.text();
            if (this._debug) {
                console.log("Response code: " + response.status + " " + response.statusText);
            }
            try {
                return JSON.parse(result);
            }
            catch {
                return result;
            }
        }
        return await response.arrayBuffer();
    }

    public async get<T>(path: string, params?: {
        [param: string]: string | number | null;
    }): Promise<T> {
        if (params) {
            path += "?" + Object.entries(params).filter(i => i[1] !== null).map(i => `${i[0]}=${i[1]}`).join("&");
        }

        const result = await this.apifetch(
            path,
            {
                method: "GET",
            }, 
        );

        return result as T;
    }

    public async post<T, Y = unknown>(
        path: string,
        content?: Y,
        params?: {
            [param: string]: string | number | null;
        },
        options?: object,
    ): Promise<T> {
        if (params) {
            path += "?" + Object.entries(params).filter(i => i[1] !== null).map(i => `${i[0]}=${i[1]}`).join("&");
        }

        const result = await this.apifetch(
            path,
            Object.assign(
                {
                    method: "POST",
                    body: content ? JSON.stringify(content) : undefined,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
                options || {},
            ),
        );
        return result as T;
    }

    public async patch<T>(
        path: string,
        content: unknown,
    ): Promise<T> {
        const result = await this.apifetch(
            path,
            {
                method: "PATCH",
                body: JSON.stringify(content),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return result as T;
    }

    public async ["delete"]<T>(
        path: string,
        content?: unknown,
        options?: object,
    ): Promise<T> {
        const result = await this.apifetch(
            path,
            Object.assign(
                {
                    method: "DELETE",
                    body: content ? JSON.stringify(content) : undefined,
                    headers: content ? {
                        "Content-Type": "application/json",
                    } : undefined,
                },
                options || {},
            ),
        );

        return result as T;
    }

    public async put<T, Y = T>(
        path: string,
        content: Y,
    ): Promise<T> {
        const result = await this.apifetch(
            path,
            Object.assign(
                {
                    method: "PUT",
                    body: JSON.stringify(content),
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            ),
        );
        return result as T;
    }

    private _token: string | null = null;

    public setToken(value: string) {
        this._token = value;
    }

    public async apifetch(path: string, options: RequestInit, bypassAuth = false, json = true) {
        if (this._debug) console.log((options.method ?? "REQ") + " | " + path);

        path = `${this._basePath}${path}`;
        const token = this._token ?? await this.getToken();
        if (!token && !bypassAuth) throw new Error("No Authorization token available " + path);

        const headers = Object.assign({
            "Authorization": `Bearer ${token}`,
            "X-Api-Version": this._apiVersion,
        }, options.headers);

        const o = Object.assign(
            options, {headers});
        try {
            return await fetch(path, o)
                .then(this.validateResponse)
                .then((r) => this.parseJson(r, json));
        }
        catch (e) {
            const error = e as any;
            this.onError?.(error);
        }
    }
}
