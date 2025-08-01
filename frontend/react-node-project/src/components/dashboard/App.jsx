import { useState, useEffect } from "react";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../../services/todoService";
import { LogoutButton } from "..";

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState(null);

  /**
   * get data
   */
  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  /**
   * handle submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addTodo(task);
      setTodos((prev) => [...prev, res.data]);
      setTask("");
    } catch (err) {
      console.log("Error adding task:", err);
    }
  };

  /**
   * delete data
   */
  const handleDelete = async (id) => {
    try {
      const res = await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  /**
   * toggle status
   */
  const toggleComplete = async (task) => {
    try {
      const updated = { ...task, completed: !task.completed };
      await updateTodo(task.id, updated);
      setTodos((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.log("Update failed:", err);
    }
  };

  /**
   * edit task
   */
  const handleUpdateTask = async (id) => {
    try {
      const updated = { task: editText, completed: false };
      await updateTodo(id, updated);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, task: editText } : t))
      );
      setEditId(null);
      setEditText("");
    } catch (err) {
      console.log("Edit failed:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <LogoutButton />
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Todo List
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 mb-6"
          >
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task"
              className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </form>

          {Array.isArray(todos) && todos.length === 0 ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : (
            <ul className="space-y-3">
              {todos.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 border rounded-lg p-3"
                >
                  {editId === item.id ? (
                    <>
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-grow px-2 py-1 border rounded-md mr-2"
                      />
                      <button
                        onClick={() => handleUpdateTask(item.id)}
                        className="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md mr-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="text-sm text-white bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded-md"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span
                        className={`flex-grow ${
                          item.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {item.task}
                      </span>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => toggleComplete(item)}
                          className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md"
                        >
                          {item.completed ? "Undo" : "Done"}
                        </button>
                        <button
                          onClick={() => {
                            setEditId(item.id);
                            setEditText(item.task);
                          }}
                          className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
