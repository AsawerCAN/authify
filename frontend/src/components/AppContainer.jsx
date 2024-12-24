import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import UserMenu from "./UserMenu";

const AppContainer = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-[90vh] w-screen items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          redirectUrl: window.location.pathname,
        }}
      />
    );
  }

  return (
    <div className="min-h-screen p-4">
      <UserMenu />
      <Outlet />
    </div>
  );
};

export default AppContainer;
