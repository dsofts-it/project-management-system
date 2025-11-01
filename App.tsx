import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import TicketsPage from './pages/TicketsPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider, useAppContext } from './context/AppContext';

const AppContainer: React.FC = () => {
    const { isAuthenticated } = useAppContext();

    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-800/50 p-4 md:p-6 lg:p-8">
                        <Routes>
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/projects/:projectId" element={<ProjectPage />} />
                            <Route path="/tickets" element={<TicketsPage />} />
                            <Route path="/reports" element={<ReportsPage />} />
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}

function App() {
    return (
        <AppProvider>
            <HashRouter>
                <AppContainer />
            </HashRouter>
        </AppProvider>
    );
}

export default App;