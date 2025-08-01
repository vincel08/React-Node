import { createContext, useContext, useState, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    try {
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      localStorage.removeItem("user");
    }

    setIsLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useIdleTimer({
    timeout: 10 * 60 * 1000,
    onIdle: () => {
      if (user) {
        alert("You've been logged out due to inactivity.");
        logout();
      }
    },
    debounce: 500,
  });

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
