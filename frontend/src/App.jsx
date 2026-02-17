import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
// import { Auth } from './pages/Auth';
// import { DashboardLayout } from './layouts/DashBoardLayout';
// import { Overview } from './pages/Overview';
// import { Projects } from './pages/Projects';
import { Overview } from './pages/Overview';
import { Projects } from './pages/Projects';
import { Auth } from './pages/Auth';
import { DashboardLayout } from './layouts/DashBoardLayout';
import { ProjectBoard } from './pages/ProjectBoard';


// The "Guard": Redirects to Login if no token is found
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// The "Reverse Guard": Redirects to Dashboard if user is ALREADY logged in
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      {/* Global Toast Notifications */}
      <Toaster position="top-right" theme="dark" richColors />
      
      <Routes>
        {/* Landing / Login / Register */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } 
        />

        {/* Protected Dashboard Routes */}
        <Route 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        > 
           <Route path="/dashboard" element={<Overview />} />
          
          <Route path="/projects" element={<Projects />} /> 
          <Route path="/projects/:id" element={<ProjectBoard />} /> 
        // </Route>

        {/* 404 Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;