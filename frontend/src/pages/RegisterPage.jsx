import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { register } from "../lib/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const { mutate: createAccount, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/email/verification-sent", {
        replace: true,
        state: { email: formData.email },
      });
    },
    onError: (error) => {
      if (error.status === 409) {
        setErrors({
          ...errors,
          email: "This email is already registered",
        });
      } else if (error.status === 422 && error.errors) {
        const newErrors = {
          email: "",
          password: "",
          confirmPassword: "",
          general: "",
        };

        error.errors.forEach((err) => {
          const field = err.path[0];
          if (field && field in newErrors) {
            if (err.code === "invalid_string" && err.validation === "email") {
              newErrors[field] = "Please enter a valid email address";
            } else if (
              err.code === "invalid_type" &&
              err.message === "Required"
            ) {
              newErrors[field] = `${
                field.charAt(0).toUpperCase() + field.slice(1)
              } is required`;
            } else {
              newErrors[field] = err.message;
            }
          } else {
            newErrors.general = "Please check your input and try again";
          }
        });

        setErrors(newErrors);
      } else {
        setErrors({
          ...errors,
          general: error.message || "Registration failed. Please try again.",
        });
      }
    },
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", confirmPassword: "", general: "" });

    if (validateForm()) {
      const { ...registrationData } = formData;
      createAccount(registrationData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

          {errors.general && (
            <div className="p-3 text-sm text-red-200 bg-red-900/50 rounded-md">
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="form-control w-full">
              <label className="label justify-start" htmlFor="email">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                autoFocus
                placeholder="email@example.com"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <label className="label justify-start">
                  <span className="label-text-alt text-error">
                    {errors.email}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label justify-start" htmlFor="password">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className={`input input-bordered w-full pr-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 opacity-50" />
                  ) : (
                    <EyeIcon className="h-5 w-5 opacity-50" />
                  )}
                </button>
              </div>
              {errors.password && (
                <label className="label justify-start">
                  <span className="label-text-alt text-error">
                    {errors.password}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label justify-start" htmlFor="confirmPassword">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                className={`input input-bordered w-full ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <label className="label justify-start">
                  <span className="label-text-alt text-error">
                    {errors.confirmPassword}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary text-white w-full"
                disabled={isPending}
              >
                {isPending ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="divider"></div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
