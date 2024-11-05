import { createRoot } from 'react-dom/client';
import Login from './pages/Login.jsx';
import Dashboard from './Dashboard.jsx';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './components/NotificationContext.jsx';
import Notify from './components/Notify.jsx';
import { useAuthentications, AuthenticationProvider } from './components/AuthenticationContext.jsx';


function MainApp() {
  const { isAuthenticated } = useAuthentications();
  // Function to handle login
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Notify />
        <Routes>
          <Route path="/login" element={<Login />} />
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
      </NotificationProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <AuthenticationProvider>
    <MainApp />
  </AuthenticationProvider>
);
