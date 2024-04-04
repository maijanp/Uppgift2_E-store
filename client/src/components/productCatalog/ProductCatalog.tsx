import { useEffect, useState } from "react"

import { IProductCard } from "../../models/IProductCard"
import { ProductCard } from "../productCard/ProductCard"



export const ProductCatalog = () => {
const [products, setProducts] = useState<IProductCard[]>([])

useEffect(()=> {
    const fetchProducts = async () => {
        const response = await fetch('http://localhost:3000/api/products')
        const data = await response.json()
        setProducts(data)
    }
    fetchProducts()
}, [])

console.log(products)
    return <>
    <div>
    <h1>Products</h1>
    {products.map((product)=> (
        <ProductCard key={product.id} product={product}></ProductCard>
    ))}
    </div>
    </>
}