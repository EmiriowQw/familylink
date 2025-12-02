import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MockDataProvider, useMockData } from './context/MockDataContext';
import { Login } from './pages/Login';
import { FamilySetup } from './pages/FamilySetup';
import { MoodBoard } from './pages/MoodBoard';
import { CheckIn } from './pages/CheckIn';
import { Recommendations } from './pages/Recommendations';
import { History } from './pages/History';
import { Profile } from './pages/Profile';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { currentUser } = useMockData();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <MockDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/family-setup" element={<FamilySetup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MoodBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkin"
            element={
              <ProtectedRoute>
                <CheckIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <Recommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MockDataProvider>
  );
}

export default App;
