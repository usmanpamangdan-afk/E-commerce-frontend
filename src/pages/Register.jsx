import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (form.password !== form.confirm_password) {
      setErrors({ confirm_password: ["Passwords do not match."] });
      return;
    }

    setLoading(true);
    try {
      await api.post("/register/", form);
      navigate("/login");
    } catch (err) {
      setErrors(err.response?.data || { detail: ["Registration failed."] });
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (name) =>
    errors[name] && (
      <p className="auth-error">
        {Array.isArray(errors[name]) ? errors[name].join(" ") : errors[name]}
      </p>
    );

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        {fieldError("detail")}

        <label>Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        {fieldError("username")}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {fieldError("email")}

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {fieldError("password")}

        <label>Confirm password</label>
        <input
          type="password"
          name="confirm_password"
          value={form.confirm_password}
          onChange={handleChange}
          required
        />
        {fieldError("confirm_password")}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}