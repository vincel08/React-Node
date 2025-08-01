import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const signIn = (user, password) =>
  axios.post(`${API}/login`, {
    username: user,
    password,
  });
