const assignProperties = (target: any, source: any) => {
    for (const [key, value] of Object.entries(source)) {
        if (typeof(target[key]) === "undefined") {
            target[key] = value;
        } else if (typeof(target[key]) === "object" && typeof(value) === "object") {
            if (Array.isArray(target[key])) {
                continue;
            }
            assignProperties(target[key], value);
        }
    }
}

export default abstract class BaseObject {
    constructor(i: any) {
        assignProperties(this, i);
    }
}