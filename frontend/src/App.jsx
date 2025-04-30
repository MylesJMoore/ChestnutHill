import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Saved from "./pages/Saved";
import Layout from "./components/Layout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = () => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Navigate to="/" />} /> {/* Redirect from /login if already logged in */}
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;