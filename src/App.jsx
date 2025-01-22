import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import { Login } from "./pages/Login";
import { TodoList } from "./pages/TodoList";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
