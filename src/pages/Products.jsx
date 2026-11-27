import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import api from "../api";
import "./Products.css";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://0fxbpgxl-8000.inc1.devtunnels.ms";

const imageUrl = (path) =>
  path.startsWith("http") ? path : `${BASE_URL}${path}`;

export default function Products() {
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();

  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productRes, imageRes] = await Promise.all([
          api.get("/products/"),
          api.get("/product-images/"),
        ]);

        setProducts(productRes.data.results ?? productRes.data);
        setProductImages(imageRes.data.results ?? imageRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          navigate("/login");
        } else {
          setMessage("Could not load products.");
        }
      }
    };

    loadData();
  }, [navigate]);

  const addToCart = async (product) => {
    try {
      await api.post("/cart-items/", {
        cart: 3,
        variant: 3,
        quantity: 1,
      });

      setMessage(`${product.name} added to cart`);
    } catch (err) {
      console.log(err.response?.data);
      setMessage("Could not add to cart.");
    }
  };

  return (
    <div>

      {/* HEADER */}
      <header className="store-header">

        <div className="store-logo">
          🛒 My Store
        </div>

        <div className="search-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search products..."
          />
        </div>

        <div className="header-actions">

          <button className="wishlist-button">
            ♡ Wishlist
          </button>

          <button className="cart-button">
            🛒 Cart
          </button>

          <button className="account-button">
            👤 Account
          </button>

        </div>

      </header>

      {/* THEME BUTTON */}
      <button className="theme" onClick={toggleTheme}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* PAGE TITLE */}
      <div className="products-page">

        <h1>E-Commerce Store</h1>

        <h2>Products</h2>

      </div>

      {/* PRODUCTS */}
      <div className="product-grid">

        {products.map((product) => {

          const image = productImages.find(
            (item) => item.product === product.id
          );

          return (
            <div
              className="product-card"
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
            >

              {image ? (
                <img
                  src={imageUrl(image.image)}
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <div className="product-image">
                  No Image
                </div>
              )}

              <h3>{product.name}</h3>

              <p className="price">
                ₹{product.price}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
}