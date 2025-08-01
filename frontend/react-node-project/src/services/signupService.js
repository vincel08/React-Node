import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const signUp = (user, password) =>
  axios.post(`${API}/signup`, {
    username: user,
    password,
  });
