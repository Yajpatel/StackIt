import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/UniversalComponent/Navbar";
import Footer from "./components/UniversalComponent/Footer";
import HomePage from "./pages/HomePage";
import AskQuestion from "./pages/AskQuestion";
import AuthPage from "./pages/AuthPage";
import QuestionDetail from "./pages/QuestionDetail";
import Editor from "./components/Editor/Editor.jsx"
import "./App.css";

function App() {
  return (
  // <Editor content={""}></Editor>
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/AskQuestion" element={<AskQuestion />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/question/:id" element={<QuestionDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
