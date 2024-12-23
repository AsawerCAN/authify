import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { verifyEmail } from "../lib/api";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const VerifyEmailPage = () => {
  const { code } = useParams();

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Email Verification</h2>

          <div className="py-8 flex flex-col items-center justify-center space-y-4">
            {isPending && (
              <>
                <ArrowPathIcon className="h-12 w-12 text-primary animate-spin" />
                <p className="text-center">Verifying your email address...</p>
              </>
            )}

            {isSuccess && (
              <>
                <CheckCircleIcon className="h-12 w-12 text-success" />
                <div className="text-center space-y-2">
                  <p className="font-medium text-success">
                    Email verified successfully!
                  </p>
                  <p>
                    Your email has been verified and your account is now active.
                  </p>
                </div>
                <Link to="/login" className="btn btn-primary text-white mt-4">
                  Sign In
                </Link>
              </>
            )}

            {isError && (
              <>
                <XCircleIcon className="h-12 w-12 text-error" />
                <div className="text-center space-y-2">
                  <p className="font-medium text-error">Verification Failed</p>
                  <p>The verification link is invalid or has expired.</p>
                </div>
                <Link to="/password/forgot" className="btn btn-outline mt-4">
                  Forgot Password?
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
