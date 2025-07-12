import "./App.css";
import AuthPage from "../src/pages/AuthPage.jsx";
import { AuthProvider } from "../src/context/AuthContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="App">
          <AuthPage />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
