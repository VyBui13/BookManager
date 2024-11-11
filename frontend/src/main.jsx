import { createRoot } from 'react-dom/client';
import Login from './pages/Login.jsx';
import Dashboard from './Dashboard.jsx';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './components/NotificationContext.jsx';
import Notify from './components/Notify.jsx';
// import { useAuthentications, AuthenticationProvider } from './components/AuthenticationContext.jsx';
import { AuthorizationProvider } from './components/AuthorizationContext.jsx'

function MainApp() {
  // Function to handle login
  return (
    <BrowserRouter>
      <AuthorizationProvider>

        <NotificationProvider>
          <Notify />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <Dashboard />
            }
            />
          </Routes>
        </NotificationProvider>
      </AuthorizationProvider>

    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <MainApp />
);
