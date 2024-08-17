import React, { createContext, useState, useEffect, useContext } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, email: '', role: null }); // Store user ID, email, and role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    // Check local storage for user data on initial load
    const storedUserId = localStorage.getItem('userId');
    const storedUserEmail = localStorage.getItem('userEmail');
    const storedUserRole = localStorage.getItem('userRole');

    if (storedUserId && storedUserEmail && storedUserRole) {
      setUser({ id: storedUserId, email: storedUserEmail, role: storedUserRole });
      setIsLoggedIn(true); // Set logged in state to true if user data exists
    }
  }, []);

  const login = (id, email, role) => {
    setUser({ id, email, role }); // Set user details on login
    setIsLoggedIn(true); // Set logged in state to true
    localStorage.setItem('userRole', role); // Store user role in local storage
    localStorage.setItem('userId', id); // Store user ID in local storage
    localStorage.setItem('userEmail', email); // Store user email in local storage
  };

  const logout = () => {
    setUser({ id: null, email: '', role: null }); // Reset user details on logout
    setIsLoggedIn(false); // Set logged in state to false
    localStorage.removeItem('userRole'); // Remove user role from local storage
    localStorage.removeItem('userId'); // Remove user ID from local storage
    localStorage.removeItem('userEmail'); // Remove user email from local storage
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};