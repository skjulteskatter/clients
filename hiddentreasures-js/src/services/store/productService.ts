import { getCache } from "../../cache";
import { Client } from "../../client";
import { IProduct, Product } from "../../models";
import { BaseService, IBaseService } from "../baseService";

export interface IProductService extends IBaseService<IProduct> {}

export class ProductService extends BaseService<Product, IProduct> implements IProductService {
    constructor(client: Client) {
        super(client, "Products", getCache("products"))
    }

    protected toModel(item: IProduct): Product {
        return new Product(item);
    }
}