export default abstract class BaseObject {
    private assignProperties(target: any, source: any) {
        for (const [key, value] of Object.entries(source)) {
            if (typeof(target[key]) === "undefined") {
                target[key] = value;
            } else if (typeof(target[key]) === "object" && typeof(value) === "object") {
                if (Array.isArray(target[key])) {
                    continue;
                }
                this.assignProperties(target[key], value);
            }
        }
    }

    constructor(i: any) {
        this.assignProperties(this, i);
    }
}