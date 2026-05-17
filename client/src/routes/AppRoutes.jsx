import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { LandingPage } from '../pages/LandingPage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage.jsx';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { ProjectWorkspacePage } from '../pages/ProjectWorkspacePage.jsx';
import { RepositoryAnalysisPage } from '../pages/RepositoryAnalysisPage.jsx';
import { NotFoundPage } from '../pages/NotFoundPage.jsx';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/projects/:id" element={<ProjectWorkspacePage />} />
      <Route path="/projects/:id/analysis" element={<RepositoryAnalysisPage />} />
    </Route>
    <Route path="/app" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

