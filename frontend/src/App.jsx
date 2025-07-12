import {BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AskQuestion from "./pages/AskQuestion.jsx";
import AnswerPage from "./pages/AnswerPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import React from "react";
import Editor from "./components/Editor/Editor.jsx"

function App() {
  return (
    // <Editor content={""}></Editor>
    <BrowserRouter>
    <AuthProvider>
      <div className="App">
        <Routes>
         <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
          <Route path="/AskQuestion" element={<AskQuestion />} />
          <Route path="/answer/:id" element={<AnswerPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
