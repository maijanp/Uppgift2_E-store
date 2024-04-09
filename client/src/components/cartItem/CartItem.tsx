
import { IProductCard } from "../../models/IProduct"


interface CartItemProps {
    item: IProductCard,
}

export const CartItem = ({item} : CartItemProps) => {
    if (!item || !item.product || !Array.isArray(item.product.images) || item.product.images.length === 0) {
        console.error('Invalid item or image data', item);

        
        return <div>Product information is missing or incomplete.</div>; // Ger en fallback och undviker krasch
      }
    const imageUrl = item.product.images[0];
    return <>
    <div>
        <div className="imgContainer"><img src={imageUrl} alt={item.product.name} /></div>
    <h4>{item.product.name}</h4>
    <p>{item.unit_amount}</p>    
    </div>
    </>
}