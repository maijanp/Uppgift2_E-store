import { useEffect, useState } from "react";
import { IProduct } from "../../models/IProduct";
import { ProductCard } from "../productCard/ProductCard";
import styles from "./ProductCatalog.module.css";
import { useCart } from "../../contexts/CartContext";
import { Toast, ToastContainer } from "react-bootstrap";

export const ProductCatalog = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const { addToCart } = useCart();
  
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data: IProduct[] = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: IProduct) => {
    const wasAdded = addToCart(product)
    if (wasAdded) {
      setAlertMsg(`${product.name} tillagd i varukorgen! ✅`)
    } else {setAlertMsg("Ej tillagd - Du kan bara köpa 1 av denna varan❌")}
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className={styles.productsContainer}>
        {showAlert &&  <ToastContainer className="p-3" position="top-end">
        <Toast style={{position: "fixed", right: "1rem", top: "5rem", opacity: "100%", backgroundColor: "white"}} onClose={() => setShowAlert(false)} show={showAlert} delay={3000} autohide>
            
            <Toast.Body>{alertMsg}</Toast.Body>
        </Toast>
    </ToastContainer>}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};
