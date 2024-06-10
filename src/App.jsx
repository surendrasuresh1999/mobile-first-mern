import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ProtectedRoute from "./Pages/ProtectedRoute";
import ForgotPassword from "./Authentication/ForgotPassword";
import SignupPage from "./Authentication/Signup";
import SigninPage from "./Authentication/Signin";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="login" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="" element={<Homepage />} />
      {/* </Route> */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
