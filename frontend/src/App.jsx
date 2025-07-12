import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/UniversalComponent/Navbar";
import Footer from "./components/UniversalComponent/Footer";
import HomePage from "./pages/HomePage";
import AskQuestion from "./pages/AskQuestion";
import AuthPage from "./pages/AuthPage";
import QuestionDetail from "./pages/QuestionDetail";
import "./App.css";

function App() {
  return (
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
=======
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
>>>>>>> 1093951f4b0633c233adf45edd51a822823a8111
    </AuthProvider>
  );
}

export default App;
