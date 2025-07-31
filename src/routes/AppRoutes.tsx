// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import Company from '../pages/company';
import Category from '../pages/Category';
import Products from '../pages/Product';
import RootLayout from '../pages/layouts';
import CreateUser from '../pages/createUser';
import ChangePassword from '../pages/ChangePassword';
import Dashboard from '../pages/Dashboard';
import UserMember from '../pages/userMember';
import Schedules from '../pages/Schedule';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route
        element={isAuthenticated ? <RootLayout /> : <Navigate to="/login" replace />}
      >

        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/company" element={<Company />} />
        <Route path="/Schedules" element={<Schedules />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Product" element={<Products />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/UserMember" element={<UserMember />} />
        <Route path="/" element={<Navigate to="/company" replace />} />


      </Route>

      {/* Catch-all route */}
      {/* <Route path="*" element={<Navigate to={isAuthenticated ? "/company" : "/login"} replace />} /> */}
    </Routes>
  );
};

export default AppRoutes;