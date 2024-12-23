// import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/verifyEmailPage";
import PasswordForgotPage from "./pages/PasswordForgotPage";
import PasswordResetPage from "./pages/PasswordResetPage ";

const Home = () => {
  return <h1 className="text-3xl text-red-500">Home</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/email/verify/:code" element={<VerifyEmailPage />} />
      <Route path="/password/forgot" element={<PasswordForgotPage />} />
      <Route path="/password/reset" element={<PasswordResetPage />} />
    </Routes>
  );
};
export default App;
