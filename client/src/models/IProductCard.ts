export interface IProductCard {
    id: string,
    product: {name: string,
    default_price: string,
    images: string},
    unit_amount: number,
    currency: string
}
