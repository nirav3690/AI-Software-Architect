import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";

import Home        from "./pages/Home";
import HowItWorks  from "./pages/HowItWorks";
import Features    from "./pages/Features";
import Demo        from "./pages/Demo";
import About       from "./pages/About";
import Login       from "./pages/Login";
import Register    from "./pages/Register";
import Dashboard   from "./pages/Dashboard";
import MyPlans     from "./pages/MyPlans";

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }
  
  return children;
}

// Public Route Component (only for login/register when NOT authenticated)
function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Only accessible when NOT logged in */}
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        {/* Protected Routes - Only accessible when logged in */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/how-it-works" 
          element={
            <ProtectedRoute>
              <HowItWorks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/features" 
          element={
            <ProtectedRoute>
              <Features />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/demo" 
          element={
            <ProtectedRoute>
              <Demo />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-plans" 
          element={
            <ProtectedRoute>
              <MyPlans />
            </ProtectedRoute>
          } 
        />

        {/* Catch all - redirect to register if not authenticated */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
