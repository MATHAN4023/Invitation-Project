import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from "./Pages/login/Login";
import Signup from './Pages/Signup/Signup';
import HomeScreen from './Pages/Home/HomeScreen';
import { AuthProvider } from './Pages/context/AuthContext';
import ProtectedRoute from './Pages/context/ProtectedRoute'; // Adjust the path as necessary

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
