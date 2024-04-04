import { ListGroup } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { IProductCard } from "../../models/IProductCard";

interface IProductCardProps{
   product: IProductCard;
}

export const ProductCard = ({product: {
    product: {name, images},
    unit_amount,
    currency
}
}: IProductCardProps) => {
    const formattedPrice = `${(unit_amount / 100).toFixed(2)} ${currency.toLocaleUpperCase()}`
    const productImage = images[0]

    return <Card style={{width: "33%"}}>
    <Card.Img style={{width: "100%"}} variant="top"src={productImage} />
    <Card.Body>
        <Card.Title>{name}</Card.Title>
    </Card.Body>
    <ListGroup variant="flush">
        <ListGroup.Item>
          {formattedPrice}
        </ListGroup.Item>
    </ListGroup>
    <Card.Body>
    </Card.Body>
        </Card>
}