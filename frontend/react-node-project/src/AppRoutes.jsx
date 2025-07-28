import { Routes, Route } from "react-router-dom";
import { SignIn } from "./pages";
import { App } from "./components";
import { PrivateRoute } from "./PrivateRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route
        path="/todos"
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
