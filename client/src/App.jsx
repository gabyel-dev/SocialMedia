import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Register from "./pages/routes/Register";
import Login from "./pages/routes/Login";
import ForgotPassword from "./pages/routes/ForgotPassword";
import Home from "../src/pages/Dashboard/Home"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        {/* <Route path="/home" element={<Protected Component={Home} />} /> */}
        {/* protected */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
