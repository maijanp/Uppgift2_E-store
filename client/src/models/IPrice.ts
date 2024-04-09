import { IProduct } from "./IProduct";

export interface IPrice {
    id: string;
    object: string;
    active: boolean;
    currency: string;
    unit_amount: number;
    product: IProduct;
  }