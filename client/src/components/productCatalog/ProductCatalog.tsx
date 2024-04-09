import { useEffect, useState } from "react"

import { IProduct } from "../../models/IProduct"
import { ProductCard } from "../productCard/ProductCard"
import { IPrice } from "../../models/IPrice";



export const ProductCatalog = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                const data: IPrice[] = await response.json(); 
                const productData = data.map(item => ({
                    ...item.product,
                    currency: item.currency,
                    unit_amount: item.unit_amount,
                }));
                console.log('Processed products:', productData);
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};