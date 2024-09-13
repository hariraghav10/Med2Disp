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
function App() {
  return (
    <div
      style={{
        marginBottom: "100px",
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/add" element={<AddPillPage />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="/pagea" element={<PageA />}></Route>
        <Route path="/pageb" element={<PageB />}></Route>
        <Route path="/refill" element={<RefillPage />}></Route>
      </Routes>
      <BottomNav></BottomNav>
    </div>
  );
}

export default App;
