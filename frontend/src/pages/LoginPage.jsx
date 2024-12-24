import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { login } from "../lib/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const redirectUrl = location.state?.redirectUrl || "/";

  const { mutate: SignIn, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      navigate(redirectUrl, {
        replace: true,
      });
    },
    onError: (error) => {
      if (error.status === 401) {
        setErrors({
          ...errors,
          general: "Invalid email or password",
        });
      } else if (error.status === 422 && error.errors) {
        setErrors({
          email: error.errors.email?.[0] || "",
          password: error.errors.password?.[0] || "",
          general: "",
        });
      } else if (error.status === 0) {
        // Network error
        setErrors({
          ...errors,
          general: error.message,
        });
      } else {
        setErrors({
          ...errors,
          general: error.message || "An unexpected error occurred",
        });
      }
    },
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", general: "" });

    if (validateForm()) {
      SignIn({ email, password });
    }
  };

  return (
    // <div className="w-full h-screen flex items-center justify-center p-4 ">
    <div className="min-h-screen w-full flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 ">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center ">Welcome Back</h2>

          {errors.general && (
            <div className="p-3 text-sm text-red-200 bg-red-900/50 rounded-md">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* <div className="space-y-2"> */}
            <div className="form-control w-full">
              <label className="label justify-start pt-6" htmlFor="email">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                id="email"
                autoFocus
                placeholder="email@example.com"
                className={`w-full p-3 text-white bg-slate-700 rounded-md border focus:ring-1 focus:ring-blue-500 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-600 focus:border-blue-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="label justify-start" htmlFor="password">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className={`w-full p-3 text-white bg-slate-700 rounded-md border focus:ring-1 focus:ring-blue-500 pr-10 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-600 focus:border-blue-500"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/password/forgot"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              // className="w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              className="btn btn-primary text-white w-full"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="divider"></div>

          <p className="text-center text-sm  text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
