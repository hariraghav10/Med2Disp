import logo from './logo.svg';
import './App.css';
//import MedicineForm from './comp/form.js'
//import HomePage from './comp/homepage.js'
import HomePage from './pages/HomePage.js'
import AddPillPage from './pages/AddPillPage.js'
import SettingsPage from './pages/SettingsPage.js'
import Header from './comp/Header.js'
import { Route, Router, Routes } from 'react-router-dom';
import BottomNav from './comp/BottomNav.js';
import { Button } from '@mui/material';
function App() {
  return (
    <div style={{
      marginBottom:"100px",
    }}>
     
     <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/add' element={<AddPillPage/>}></Route>
      <Route path='/settings' element={<SettingsPage/>}></Route>
     </Routes>
     <BottomNav></BottomNav>

    </div>
  );
}

export default App;
