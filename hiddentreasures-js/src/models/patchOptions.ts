export type IPatchOptions<T> = {
    set?: Partial<T>;
    unset?: string[];
}

export class PatchOptions<T> implements PatchOptions<T> {
    public set;
    public unset;

    constructor(i: IPatchOptions<T>) {
        this.set = i.set;
        this.unset = i.unset;
    }

    public patch(item: any) {
        if (this.set) {
            for (const [key, value] of Object.keys(item)) {
                try {
                    if (value) {
                        item[key] = value;
                    }
                }
                catch {
                    // ignore errors
                }
            }
        }
        if (this.unset) {
            for (const key of this.unset) {
                try {
                    item[key] = undefined;
                }
                catch {
                    // ignore errors
                }
            }
        }
    }
}