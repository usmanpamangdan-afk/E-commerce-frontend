import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "./ProductDetails.css";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://0fxbpgxl-8000.inc1.devtunnels.ms";

const imageUrl = (path) =>
  path.startsWith("http") ? path : `${BASE_URL}${path}`;

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const [productResponse, imageResponse] = await Promise.all([
          api.get(`/products/${id}/`),
          api.get("/product-images/"),
        ]);

        setProduct(productResponse.data);

        const images =
          imageResponse.data.results ?? imageResponse.data;

        const productImage = images.find(
          (item) => item.product === Number(id)
        );

        setImage(productImage);
      } catch (error) {
        console.log("Error:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-loading">
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-loading">
        <h2>Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = async () => {
  try {
    await api.post("/cart-items/", {
      cart: 4,
      variant: 3,
      quantity: quantity,
    });

    alert("Product added to cart!");
  } catch (error) {
  console.log("Cart Error:", error.response?.data);
  alert(JSON.stringify(error.response?.data));
}
};

  return (
    <div className="product-details-page">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="back-button"
      >
        ← Back to Products
      </button>

      {/* PRODUCT CONTAINER */}
      <div className="product-details-card">

        {/* PRODUCT IMAGE */}
        <div className="product-image-section">
          {image ? (
            <img
              src={imageUrl(image.image)}
              alt={product.name}
              className="product-details-image"
            />
          ) : (
            <div className="no-product-image">
              No Image Available
            </div>
          )}
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="product-info-section">

          <h1 className="product-details-name">
            {product.name}
          </h1>

          <p className="product-details-price">
            ₹{product.price}
          </p>

          <div className="product-description">
            <h3>Description</h3>

            <p>
              {product.description || "No description available."}
            </p>
          </div>

          <div className="quantity-section">
            <label>Quantity</label>

            
             <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
/>
          </div>

          <button className="add-cart-button "
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}