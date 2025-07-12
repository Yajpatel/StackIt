import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AskQuestion from "./pages/AskQuestion.jsx";
import AnswerPage from "./pages/AnswerPage.jsx";
// import { AuthProvider } from "./context/AuthContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import React from "react";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/AskQuestion" element={<AskQuestion />} />
          <Route path="/answer/:id" element={<AnswerPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
