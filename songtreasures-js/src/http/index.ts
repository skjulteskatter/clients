export class Http {
    private _basePath: string;
    private _apiVersion: string;

    protected onError?: (error: any) => void;
    protected getToken: () => Promise<string>;

    constructor(options: {
        basePath: string;
        apiVersion: "3.0" | "4.0",
        getToken: () => Promise<string>,
        onError?: (error: any) => void;
    }) {
        this._basePath = options.basePath;
        this._apiVersion = options.apiVersion;
        this.onError = options.onError;
        this.getToken = options.getToken;
    }

    public validateResponse(response: Response): Promise<Response> {
        return new Promise((resolve, reject) => {
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            } else if (response.status === 401) {
                // auth.startLogin();
                // resolve(null);
                reject({status: response.status, value: "Unauthorized"});
            } else {
                // error.response = response;
                response.text().then(t =>  {
                    reject({status: response.status, value: t});
                });
            }
        });
    }

    public async parseJson(response: Response, json = true) {
        if (json) {
            const result = await response.text();
            try {
                return JSON.parse(result);
            }
            catch {
                return result;
            }
        }
        return await response.arrayBuffer();
    }

    /**
     * API GET request
     *
     * @param  {String} path
     * @return {Promise}
     */
    public async get<T>(path: string): Promise<T> {
        const result = await this.apifetch(
            path,
            {
                method: "GET",
            }, 
        );

        return result as T;
    }

    /**
     * API POST request
     *
     * @param  {String} path
     * @param  {Object} content
     * @param  {Object} options (optional)
     * @return {Promise}
     */
    public async post<T, Y = unknown>(
        path: string,
        content?: Y,
        options?: object,
    ): Promise<T> {
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

    /**
     * API PATCH request
     *
     * @param  {String} path
     * @param  {Object} content
     * @param  {Object} options (optional)
     * @return {Promise}
     */
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

    /**
     * API DELETE request
     *
     * @param  {String} path
     * @param  {Object} query (optional)
     * @param  {Object} options (optional)
     * @return {Promise}
     */
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

    /**
     * API PUT request
     *
     * @param  {String} path
     * @param  {Object} content
     * @return {Promise}
     */
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
            const result = await fetch(path, o)
                .then(this.validateResponse)
                .then((r) => this.parseJson(r, json));
            return result;
        }
        catch (e) {
            const error = e as any;
            this.onError?.(error);
        }
    }
}
