import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  // Add cart persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <AuthContext.Provider value={{ token, login, logout, cart, setCart }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}