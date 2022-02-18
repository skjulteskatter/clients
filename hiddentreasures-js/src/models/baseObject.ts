export default abstract class BaseObject {
    [key: string]: any;
    constructor(i: any) {
        for (const [key, value] of Object.entries(i)) {
            this[key] = value;
        }
    }
}