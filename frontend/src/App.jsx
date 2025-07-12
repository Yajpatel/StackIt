import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<h1 className="text-center mt-10">Welcome to StackIt!</h1>}
        />
      </Routes>
    </div>
  );
}
