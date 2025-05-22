import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Register from "./pages/routes/Register";
import Login from "./pages/routes/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
