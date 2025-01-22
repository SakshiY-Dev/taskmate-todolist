import { useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 to-pink-300 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <ClipboardList className="w-24 h-24 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to TaskMate
        </h1>
        <p className="text-xl text-white mb-8">
          <b>
            <i>Simplify Your Day, One Task at a Time</i>
          </b>
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-pink-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
