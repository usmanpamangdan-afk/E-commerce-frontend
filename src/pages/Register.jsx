import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import loginBg from "../assets/LOGIN-PAGE BG.jpg";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (form.password !== form.confirm_password) {
      setErrors({
        confirm_password: ["Passwords do not match."],
      });
      return;
    }

    setLoading(true);

    try {
      await api.post("/register/", form);
      navigate("/login");
    } catch (err) {
      setErrors(
        err.response?.data || {
          detail: ["Registration failed."],
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (name) =>
    errors[name] && (
      <p className="text-red-500 text-sm mt-1">
        {Array.isArray(errors[name])
          ? errors[name].join(" ")
          : errors[name]}
      </p>
    );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="w-full max-w-[900px] min-h-[550px] flex overflow-hidden rounded-2xl shadow-2xl">

        {/* LEFT SIDE */}
        <div className="w-[45%] bg-slate-950/75 text-white p-12 flex flex-col justify-center">
          <h1 className="text-[42px] font-bold mb-4">
            Join Us
          </h1>

          <p className="text-[17px] leading-relaxed opacity-90">
            Create your account and start shopping with us.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[55%] bg-white p-14 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your details to create your account
          </p>

          <form onSubmit={handleSubmit}>

            {/* USERNAME */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Username
              </label>

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              {fieldError("username")}
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              {fieldError("email")}
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {fieldError("password")}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {fieldError("confirm_password")}
            </div>

            {/* GENERAL ERROR */}
            {fieldError("detail")}

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 border-0 rounded-lg bg-blue-600 text-white text-base font-semibold cursor-pointer hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Register"}
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold no-underline"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}