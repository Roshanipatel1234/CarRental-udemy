import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import 'antd/dist/reset.css';  // ✅ Correct for Ant Design v5
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';


// Protected Route Component
function ProtectedRoute({ element }) {
  return localStorage.getItem("user") ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
  <Route path="/" element={<ProtectedRoute element={<Home />} />} />
  <Route path="/booking/:carid" element={<ProtectedRoute element={<BookingCar />} />} />
  <Route path="/userbookings" element={<ProtectedRoute element={<UserBookings />} />} />
  <Route path="/addcar" element={<ProtectedRoute element={<AddCar />} />} />
  <Route path="/editcar/:carid" element={<ProtectedRoute element={<EditCar />} />} />
  <Route path="/admin" element={<ProtectedRoute element={<AdminHome />} />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
