import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/signupService";

export const Signup = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signUp(user, password);
      if (res.status === 201) {
        alert("Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup Failed:", err);
      alert("Signup Failed");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Sign Up
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
            <div className="flex justify-between items-center">
              <h1 className="text-gray-700">Already have an account?</h1>
              <h1
                onClick={() => navigate("/login")}
                className="cursor-pointer text-red-600 font-semibold hover:underline hover:text-red-700 transition duration-200"
              >
                Log In
              </h1>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
