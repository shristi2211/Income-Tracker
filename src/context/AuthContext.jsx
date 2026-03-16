import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email) => {
    const rawEmail = email || 'srishti@demo.com';
    // Extract part before @
    let namePart = rawEmail.split('@')[0];
    // Remove all numbers
    namePart = namePart.replace(/[0-9]/g, '');
    // Replace dots/underscores with spaces and Title Case it
    const formattedName = namePart
      .split(/[._]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();

    setUser({
      name: formattedName || 'User', // Fallback if name was only numbers
      email: rawEmail,
      avatar: formattedName ? formattedName.charAt(0).toUpperCase() : 'U',
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
