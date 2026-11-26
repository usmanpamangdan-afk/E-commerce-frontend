import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import api from "./api";
import loginBg from "./assets/LOGIN-PAGE BG.jpg";

function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/login/", {
        email: email,
        password: password,
      });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="w-[900px] min-h-[550px] flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl">

        {/* LEFT SIDE */}
        <div className="w-full md:w-[45%] bg-slate-950/75 text-white p-12 flex flex-col justify-center">

          {/* LOTTIE ANIMATION */}
          <div className="w-full h-[250px] flex items-center justify-center">
            <DotLottieReact
              src="/Login.lottie"
              autoplay
              loop
              style={{
                width: "250px",
                height: "250px",
              }}
            />
          </div>

          <h1 className="text-[42px] font-bold mb-4">
            Welcome Back
          </h1>

          <p className="text-[17px] leading-relaxed opacity-90">
            Login to continue shopping with us.
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-[55%] bg-white p-14 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-2">
            Login
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your details to continue
          </p>

          {/* EMAIL */}
          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 border border-gray-300 rounded-lg text-[15px] outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* PASSWORD */}
          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 pr-12 border border-gray-300 rounded-lg text-[15px] outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>

          {/* OPTIONS */}
          <div className="flex justify-between items-center mb-6 text-sm">

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <a
              href="#"
              className="text-blue-600 no-underline"
            >
              Forgot Password?
            </a>

          </div>

          {/* LOGIN BUTTON */}
          <button
            className="w-full py-3.5 border-0 rounded-lg bg-blue-600 text-white text-base font-semibold cursor-pointer hover:bg-blue-700"
            onClick={handleLogin}
          >
            Login
          </button>

          {/* SIGN UP */}
          <div className="text-center mt-6 text-sm text-gray-500">

            Don't have an account?{" "}

            <a
              href="#"
              className="text-blue-600 font-semibold no-underline"
            >
              Create Account
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}

export default LoginPage;