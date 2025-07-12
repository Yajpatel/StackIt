import "./App.css";
import AuthPage from "../src/pages/AuthPage.jsx";
import { AuthProvider } from "../src/context/AuthContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="App">
          <AuthPage />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
