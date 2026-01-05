import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route goes to Login */}
        <Route path="/login" element={<Login />} />
        
        {/* We will build Dashboard next, for now redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Placeholder for Dashboard */}
        <Route path="/dashboard" element={<div className="p-10 text-2xl">Dashboard (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;