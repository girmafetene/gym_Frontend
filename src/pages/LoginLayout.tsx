// pages/LoginLayout.tsx
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
      <Outlet /> {/* This will render the LoginPage component */}
    </div>
  );
};

export default LoginLayout;