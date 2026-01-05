import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route goes to Login */}
        <Route path="/login" element={<Login />} />
        
        {/* We will build Dashboard next, for now redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Placeholder for Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;