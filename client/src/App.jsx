import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import ProtectedDashboard from "./components/ProtectedDashboard";
import ProtectedAdmin from "./components/ProtectedAdmin";
import { useEffect, useState } from "react";
import API from "./services/api";
function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);
  {
  }
  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedDashboard user={user}>
              <Dashboard user={user} />
            </ProtectedDashboard>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedAdmin user={user}>
              <Admin user={user} />
            </ProtectedAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
