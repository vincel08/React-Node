import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      return null;
    }
  });

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

  return { user, login, logout };
};
