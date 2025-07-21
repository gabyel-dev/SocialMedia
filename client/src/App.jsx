import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/routes/Register";
import Login from "./pages/routes/Login";
import ForgotPassword from "./pages/routes/ForgotPassword";
import Home from "./pages/Dashboard/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/forgot_password" element={<ForgotPassword />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* 404 fallback (optional) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
