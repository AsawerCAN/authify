import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/verifyEmailPage";
import PasswordForgotPage from "./pages/PasswordForgotPage";
import PasswordResetPage from "./pages/PasswordResetPage ";
import AppContainer from "./components/AppContainer";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { setNavigate } from "./lib/navigation";

const App = () => {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/email/verify/:code" element={<VerifyEmailPage />} />
        <Route path="/password/forgot" element={<PasswordForgotPage />} />
        <Route path="/password/reset" element={<PasswordResetPage />} />
      </Routes>
    </>
  );
};
export default App;
