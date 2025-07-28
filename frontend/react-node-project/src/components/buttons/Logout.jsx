import { useAuth } from "../../hooks/useAuth";

export const LogoutButton = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  rreturn(
    <div className="flex items-center gap-4 p-4">
      <h1 className="text-xl font-semibold">Welcome, {user.username}</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};
