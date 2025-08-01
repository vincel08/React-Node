import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-gray-700">
        {user ? `Welcome, ${user.username}` : "Welcome"}
      </h1>
      <h1
        onClick={handleLogout}
        className="cursor-pointer text-red-600 font-semibold hover:underline hover:text-red-700 transition duration-200"
      >
        Logout
      </h1>
    </div>
  );
};
