export interface IProductCard {
  id: string;
  currency: string;
  unit_amount: number;
  product: { 
    id: string; 
    name: string; 
    active: boolean;
    default_price: string; 
    images: string[] };
}
