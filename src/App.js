import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import ProtectedRoute from "./GlobalComponent/ProtectedRoute";
import Inventory from './Pages/AdminPages/Inventory'
import AdminUpdatepage from "./Pages/AdminPages/AdminUpdatepage";
import Transaction from "./Pages/AdminPages/Transaction";
import Order from "./Pages/Order";
import Bucket from "./Pages/AdminPages/Bucket";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Home} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Cart" element={<ProtectedRoute Component={Cart} />} />
        <Route path="/product/:id" element={<ProtectedRoute Component={Product} />} />
        <Route path="/Inventory" element={<ProtectedRoute Component={Inventory} />} />
        <Route path="/adminproduct/:id" element={<ProtectedRoute Component={AdminUpdatepage} />} />
        <Route path="/Transaction" element={<ProtectedRoute Component={Transaction} />} />
        <Route path="/checkOrder" element={<ProtectedRoute Component={Order} />} />
        <Route path="/Bucket" element={<ProtectedRoute Component={Bucket} />} />


      </Routes>
    </>
  );
}

export default App;
