// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import Company from '../pages/company';
import Lookups from '../pages/lookup';
import Category from '../pages/Category';
import Products from '../pages/Product';
import RootLayout from '../pages/layouts';
import CreateUser from '../pages/createUser';
import ChangePassword from '../pages/ChangePassword';
import Messages from '../pages/Messages';
import Dashboard from '../pages/Dashboard';

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
        <Route path="/Lookup" element={<Lookups />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Product" element={<Products />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/" element={<Navigate to="/company" replace />} />
        
        
      </Route>

      {/* Catch-all route */}
      {/* <Route path="*" element={<Navigate to={isAuthenticated ? "/company" : "/login"} replace />} /> */}
    </Routes>
  );
};

export default AppRoutes;