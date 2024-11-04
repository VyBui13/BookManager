import { createRoot } from 'react-dom/client';
import Notify from './components/Notify.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './Dashboard.jsx';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login
  return (
    <BrowserRouter>
      <Notify />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <>
                <Dashboard />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<MainApp />);
