// import './App.css';
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import {Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { state } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route exact path="/" element={state.user?<Home />:<Login />} />
        <Route path="/signup" element={state.user?<Navigate to="/" />:<SignUp />} />
        <Route path="/login" element={state.user?<Navigate to="/" />:<Login />} />
        <Route path="/verify/:id" element={state.user?<Navigate to="/" />:<VerifyEmail />} />
        <Route path="/forget-password" element={state.user?<Navigate to="/" />:<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
