export interface IProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price: {
    currency: string;
    unit_amount: number;
  };
}
