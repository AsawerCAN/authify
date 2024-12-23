import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { resetPassword } from "../lib/api";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp > now;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    general: "",
  });

  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: ({ password }) =>
      resetPassword({ password, verificationCode: code }),
    onSuccess: () => {
      navigate("/login", {
        replace: true,
        state: {
          message:
            "Password reset successful. Please sign in with your new password.",
        },
      });
    },
    onError: (error) => {
      if (error.status === 404) {
        setErrors((prev) => ({
          ...prev,
          general: "Invalid or expired reset link. Please request a new one.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general:
            error.message || "Failed to reset password. Please try again.",
        }));
      }
    },
  });

  const validateForm = () => {
    const newErrors = {
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

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
    setErrors({ password: "", confirmPassword: "", general: "" });

    if (validateForm()) {
      updatePassword({ password: formData.password });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    }
  };

  if (!linkIsValid) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-error">Reset Link Expired</h3>
        <p className="text-sm">
          This password reset link has expired. Please request a new one.
        </p>
        <Link to="/forgot-password" className="btn btn-primary">
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4" noValidate>
      {errors.general && (
        <div className="p-3 text-sm text-red-200 bg-red-900/50 rounded-md">
          <span>{errors.general}</span>
        </div>
      )}

      <div className="form-control w-full">
        <label className="label justify-start" htmlFor="password">
          <span className="label-text font-medium">New Password</span>
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
            <span className="label-text-alt text-error">{errors.password}</span>
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
          {isPending ? (
            <>
              <span className="loading loading-spinner"></span>
              Resetting Password...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </div>

      <div className="divider"></div>

      <p className="text-center text-sm">
        Remember your password?{" "}
        <Link to="/login" className="link link-primary">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default ResetPasswordForm;
