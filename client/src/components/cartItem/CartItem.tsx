
import { IProduct } from "../../models/IProduct"


interface CartItemProps {
    item: IProduct,
}

export const CartItem = ({item} : CartItemProps) => {
    if (!item || !item || !Array.isArray(item.images) || item.images.length === 0) {
        console.error('Invalid item or image data', item);

        
        return <div>Product information is missing or incomplete.</div>; // Ger en fallback och undviker krasch
      }
    const imageUrl = item.images[0];
    return <>
    <div>
        <div className="imgContainer"><img src={imageUrl} alt={item.name} /></div>
    <h4>{item.name}</h4>
    <p>{item.default_price.unit_amount}</p>    
    </div>
    </>
}