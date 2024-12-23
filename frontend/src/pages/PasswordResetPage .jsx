import ResetPasswordForm from "../components/ResetPasswordForm";

const PasswordResetPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
