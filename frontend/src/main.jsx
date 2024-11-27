import { createRoot } from 'react-dom/client';
import Login from './pages/Login.jsx';
import Dashboard from './Dashboard.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './components/NotificationContext.jsx';
import Notify from './components/Notify.jsx';
import { AuthorizationProvider } from './components/AuthorizationContext.jsx'
import { ConfirmPromptProvider } from './components/ConfirmPromptContext.jsx';
import ConfirmPrompt from './components/ConfirmPrompt.jsx';

function MainApp() {
  return (
    <BrowserRouter>
      <AuthorizationProvider>
        <ConfirmPromptProvider>
          <NotificationProvider>
            <ConfirmPrompt />
            <Notify />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <Dashboard />
              }
              />
            </Routes>
          </NotificationProvider>
        </ConfirmPromptProvider>
      </AuthorizationProvider>

    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <MainApp />
);
