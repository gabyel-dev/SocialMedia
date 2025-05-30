import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Register from "./pages/routes/Register";
import Login from "./pages/routes/Login";
import ForgotPassword from "./pages/routes/ForgotPassword";
import Home from "./pages/Dashboard/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        
        {/* protected */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
