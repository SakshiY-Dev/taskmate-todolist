import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Check, X, Edit2, LogOut, Trash2 } from "lucide-react";
import { useTodoStore } from "../store/todoStore";
import { useAuthStore } from "../store/authStore";

export function TodoList() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
  } = useTodoStore();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  const startEditing = (id, title) => {
    setEditingId(id);
    setEditText(title);
  };

  const handleEdit = (id) => {
    if (editText.trim()) {
      editTodo(id, editText.trim());
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 to-pink-300 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-pink-800 text-pink-300 p-2 rounded-md hover:bg-pink-400 transition duration-200"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </form>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${
                filter === "all"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-md ${
                filter === "active"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-md ${
                filter === "completed"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Completed
            </button>
          </div>

          <ul className="space-y-3">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
                    todo.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {todo.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                {editingId === todo.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => handleEdit(todo.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      className={`flex-1 ${
                        todo.completed ? "text-gray-500 line-through" : ""
                      }`}
                    >
                      {todo.title}
                    </span>
                    <button
                      onClick={() => startEditing(todo.id, todo.title)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
