import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { sendPasswordReset } from "../lib/api";

const PasswordForgotPage = () => {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    mutate: sendResetLink,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordReset,
    onSuccess: () => {
      setShowSuccess(true);
      setEmail("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      sendResetLink({ email: email.trim() });
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-base-300">
        <div className="card w-full max-w-md shadow-xl bg-base-100">
          <div className="card-body">
            <div className="flex flex-col items-center justify-center space-y-4">
              <CheckCircleIcon className="h-12 w-12 text-success" />
              <h2 className="text-2xl font-bold text-center">
                Check Your Email
              </h2>
              <p className="text-center">
                If an account exists for {email}, you will receive a password
                reset link shortly.
              </p>
              <Link to="/login" className="btn btn-primary text-white">
                Return to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>

          {isError && (
            <div className="p-3 text-sm text-red-200 bg-red-900/50 rounded-md flex items-center gap-2">
              <ExclamationCircleIcon className="h-5 w-5" />
              <span>
                {error?.message ||
                  "Failed to send reset link. Please try again."}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="form-control w-full">
              <label className="label justify-start" htmlFor="email">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="email@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
              />
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary text-white w-full"
                disabled={isPending || !email.trim()}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending Reset Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>

          <div className="divider"></div>

          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordForgotPage;
