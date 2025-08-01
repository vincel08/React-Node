import { useNavigate } from "react-router-dom";

export const SignupButton = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-gray-700">No account yet?</h1>
      <h1
        onClick={handleSignUp}
        className="cursor-pointer text-red-600 font-semibold hover:underline hover:text-red-700 transition duration-200"
      >
        Sign up
      </h1>
    </div>
  );
};
