import { useEffect, useState } from "react"

import { IProduct } from "../../models/IProduct"
import { ProductCard } from "../productCard/ProductCard"




export const ProductCatalog = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                const data: IProduct[] = await response.json(); 
                
                console.log('Raw data:', data);
                setProducts(data);
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