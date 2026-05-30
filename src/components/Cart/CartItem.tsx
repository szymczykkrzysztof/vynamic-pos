import type {Product} from "../../constants/products.ts";

export interface CartItem extends Product {
    quantity: number;
}