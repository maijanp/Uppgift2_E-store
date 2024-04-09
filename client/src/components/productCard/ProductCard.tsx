import React from 'react';
import Card from "react-bootstrap/Card";
import { IProduct } from "../../models/IProduct";
import { useCart } from "../../contexts/CartContext";

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: IProductCardProps) => {
  const { addToCart } = useCart();
  const { name, images, currency, unit_amount } = product;
  const formattedPrice = `${(unit_amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
  const productImage = images[0] || "path-to-default-image.jpg";  // Provide a fallback for missing images

  return (
    <Card style={{ width: "33%" }}>
      <Card.Img style={{ width: "100%" }} variant="top" src={productImage} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{formattedPrice}</Card.Text>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </Card.Body>
    </Card>
  );
};