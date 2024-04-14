import { IProduct } from "../../models/IProduct";
import { ListGroup, Card } from "react-bootstrap";
import styles from './ProductCard.module.css'

interface IProductCardProps {
  product: IProduct;
  onAddToCart: (product: IProduct) => void
}

export const ProductCard = ({ product, onAddToCart }: IProductCardProps) => {
  const { name, images, default_price } = product;
  const { currency, unit_amount } = default_price;
  const formattedPrice = `${(unit_amount / 100).toFixed(
    2
  )} ${currency.toUpperCase()}`;
  const productImage = images[0];
  return (
    <Card style={{ width: "30%", textAlign: "center" }}>
      <Card.Img style={{ width: "100%" }} variant="top" src={productImage} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
       <ListGroup className="list-group-flush">
        <ListGroup.Item>{formattedPrice}</ListGroup.Item>
       </ListGroup>
     <Card.Body>
     <button id={styles.btn} onClick={() => onAddToCart(product)}>Lägg i varukorg</button>
     </Card.Body>
      </Card.Body>
    </Card>
  );
};
