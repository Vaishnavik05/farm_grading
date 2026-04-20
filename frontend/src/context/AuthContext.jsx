import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const storageKey = "farm-auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) {
        return;
      }

      const parsed = JSON.parse(saved);
      if (parsed?.token) {
        setUser(parsed.user || { token: parsed.token });
        localStorage.setItem("token", parsed.token);
      }
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, []);

  const login = (token, userData = null) => {
    localStorage.setItem("token", token);
    localStorage.setItem(storageKey, JSON.stringify({ token, user: userData }));
    setUser(userData || { token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(storageKey);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};