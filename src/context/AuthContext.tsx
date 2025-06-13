// src/context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../api/apiService';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('email') == "" ? false : true);

  const navigate = useNavigate();
  const login = async (email: string, password: string) => {
    try {
      // Replace with actual API call
      const response = await mockLoginApi(email, password);
      if (response.success) {
        localStorage.setItem('authToken', response.token ?? '');
        setIsAuthenticated(true);
        navigate('/company');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      throw error; // Rethrow to handle in component
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock API function - replace with real API call
const mockLoginApi = (email: string, password: string) => {
  return new Promise<{ success: boolean; token?: string; message?: string }>(async (resolve) => {
    var user={
        email: email,
        password: password
     }
    await apiService.create("auth/login", user).then(Response=>{
       console.log(Response?.data)
       if(Response?.data.success==true)
       {
        localStorage.setItem("email",email)
        resolve({ success: true, token: 'dummy-token' });
       }
       else{
        resolve({ success: false, message: 'Invalid credentials' });
       }
    }); // ⬅️ use `createForm` (custom)
     
   
  
    
    // setTimeout(() => {
    //   if (email === 'g1@gmail.com' && password === '123456') {
    //     resolve({ success: true, token: 'dummy-token' });
    //   } else {
    //     resolve({ success: false, message: 'Invalid credentials' });
    //   }
    // }, 1000);
  });
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};