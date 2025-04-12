import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import { useState ,useEffect} from 'react';

export default function App() {
  const [theme, setTheme] = useState("light");

  // Toggle function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  // Update the HTML element's class so Tailwind dark mode works
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
   },[theme]);
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login toggleTheme={toggleTheme} theme={theme}/>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}