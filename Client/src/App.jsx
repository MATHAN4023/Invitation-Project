import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Pages/context/AuthContext';
import ProtectedRoute from './Pages/context/ProtectedRoute'; // Adjust path as necessary
import LoginScreen from './Pages/Login/LoginScreen';
import HomeScreen from './Pages/Home/HomeScreen';
import Signup from './Pages/Signup/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
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
