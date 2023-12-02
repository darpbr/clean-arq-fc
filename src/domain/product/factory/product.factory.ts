import { v4 as uuid } from "uuid";
import Product from "../entity/product";

export default class ProductFactory {
    public static create(name: string, price: number): Product {
        const product = new Product(uuid(), name, price);
        return product;
    }
}