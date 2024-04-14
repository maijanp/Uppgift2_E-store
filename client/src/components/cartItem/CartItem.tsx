
import { Col, Row } from "react-bootstrap";
import { IProduct } from "../../models/IProduct"
import styles from './CartItem.module.css'

interface CartItemProps {
    item: IProduct,
}

export const CartItem = ({item} : CartItemProps) => {
    const formattedPrice = `${(item.default_price.unit_amount / 100).toFixed(
        2
      )} ${item.default_price.currency.toUpperCase()}`;
    if (!item || !item || !Array.isArray(item.images) || item.images.length === 0) {
        console.error('Invalid item or image data', item);

        
        return <div>Produktinformation saknas</div>; // Ger en fallback och undviker krasch
      }
    const imageUrl = item.images[0];
    return <Row className={styles.cartItem}>
       <Col> <div className={styles.imgContainer}><img src={imageUrl} alt={item.name} /></div></Col>
    <Col><h5>{item.name}</h5>
    <p>{formattedPrice}</p>  </Col> 
    </Row>
    
}