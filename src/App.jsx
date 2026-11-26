import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./login-page";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

function PrivateRoute({ children }) {
  return localStorage.getItem("access")
    ? children
    : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;