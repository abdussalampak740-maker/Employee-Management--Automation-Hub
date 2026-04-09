/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Processes from './pages/Processes';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Employees from './pages/Employees';
import Performance from './pages/Performance';
import Attendance from './pages/Attendance';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastProvider } from './components/Toast';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children, requireManager = false }: { children: React.ReactNode, requireManager?: boolean }) {
  const { isAuthenticated, isManager } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireManager && !isManager) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="performance" element={<Performance />} />
              <Route path="processes" element={<Processes />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="tasks/:id" element={<TaskDetail />} />
              <Route path="analytics" element={
                <ProtectedRoute requireManager>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}
