import logo from "./logo.svg";
import "./App.css";
//import MedicineForm from './comp/form.js'
//import HomePage from './comp/homepage.js'
import HomePage from "./pages/HomePage.js";
import AddPillPage from "./pages/AddPillPage.js";
import SettingsPage from "./pages/SettingsPage.js";
import Header from "./comp/Header.js";
import { Route, Router, Routes } from "react-router-dom";
import BottomNav from "./comp/BottomNav.js";
import { Button } from "@mui/material";
import PageA from "./pages/PageA.jsx";
import PageB from "./pages/PageB.jsx";
import RefillPage from "./pages/RefillPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./comp/privateRoute.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
function App() {
  return (
    <div
      style={{
        marginBottom: "100px",
      }}
    >
      <Routes>
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>}></Route>
        <Route path="/add" element={<PrivateRoute><AddPillPage /></PrivateRoute>}></Route>
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>}></Route>
        <Route path="/pagea" element={<PageA />}></Route>
        <Route path="/pageb" element={<PageB />}></Route>
        <Route path="/refill" element={<PrivateRoute><RefillPage /></PrivateRoute>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/logout" element={<LogoutPage />}></Route>
      </Routes>
      <BottomNav></BottomNav>
    </div>
  );
}

export default App;
