import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    currentUser,
    login: (email, password) => {
      console.log('Login attempt:', email);
      // Mock successful login for now
      setCurrentUser({ email });
      return Promise.resolve();
    },
    logout: () => {
      setCurrentUser(null);
      return Promise.resolve();
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}