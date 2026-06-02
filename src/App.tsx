
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingFallback } from './components/LoadingFallback';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AppLayout } from './layouts/AppLayout';

const LoginPage = lazy(() => import('./features/auth/pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('./features/auth/pages/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('./features/dashboard/pages/DashboardPage'));
const EmployeePage = lazy(() => import('./features/employees/pages/EmployeePage'));
const ProjectPage = lazy(() => import('./features/projects/pages/ProjectPage'));
const SkillMatrixPage = lazy(() => import('./features/skill-matrix/pages/SkillMatrixPage'));
const ResourceAllocationPage = lazy(
  () => import('./features/resource-allocation/pages/ResourceAllocationPage'),
);
const ReportsPage = lazy(() => import('./features/reports/pages/ReportsPage'));
const SettingsPage = lazy(() => import('./features/settings/pages/SettingsPage'));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="employees" element={<EmployeePage />} />
              <Route path="projects" element={<ProjectPage />} />
              <Route path="skill-matrix" element={<SkillMatrixPage />} />
              <Route path="resource-allocation" element={<ResourceAllocationPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
