import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getTodos = () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addTodo = (task) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API}/todos`,
    { task, completed: false },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteTodo = (id) => {
  const token = localStorage.getItem("token");

  return axios.delete(`${API}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTodo = (id, updated) => {
  const token = localStorage.getItem("token");

  return axios.put(`${API}/todos/${id}`, updated, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
