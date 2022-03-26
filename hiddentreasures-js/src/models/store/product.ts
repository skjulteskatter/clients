import BaseDocument from "../baseDocument";
import { IPrice, Price } from "./price";

export abstract class IProduct extends BaseDocument {
    public collectionIds!: string[];
    public prices!: IPrice[];
}

export class Product extends IProduct {
    public override prices;

    constructor(i: IProduct) {
        super(i);
        this.prices = i.prices.map(p => new Price(p));
    }
}
