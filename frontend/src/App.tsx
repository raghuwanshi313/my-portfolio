import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

// import './App.css'

function App() {
  return (
    <Routes>
      {/* Portfolio Route */}
      <Route path="/" element={<PortfolioPage />} />
      
      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
