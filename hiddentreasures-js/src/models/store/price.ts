import BaseObject from "../baseObject";

export type PriceType = "year" | "month";

export abstract class IPrice extends BaseObject {
    public id!: string;
    public value!: number | null;
    public currency!: string;
    public name!: string;
    public type!: PriceType;
}

export class Price extends IPrice {
    constructor(i: IPrice) {
        super(i);
    }
}