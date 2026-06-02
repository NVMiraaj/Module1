import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import PageContainer from '../components/common/PageContainer';
import MainLayout from '../layouts/MainLayout';
import EmployeeList from '../features/employees/pages/EmployeeList';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';

const modulePages = {
  employees: 'Employee Management',
  projects: 'Project Management',
  skills: 'Skills Management',
  allocations: 'Resource Allocation',
  reports: 'Reports',
  settings: 'Settings',
} as const;

function ModulePlaceholder({ title }: { title: string }) {
  return (
    <PageContainer title={title}>
      Module foundation is ready. Feature implementation will be added in the next delivery phase.
    </PageContainer>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/projects" element={<ModulePlaceholder title={modulePages.projects} />} />
          <Route path="/skills" element={<ModulePlaceholder title={modulePages.skills} />} />
          <Route path="/allocations" element={<ModulePlaceholder title={modulePages.allocations} />} />
          <Route path="/reports" element={<ModulePlaceholder title={modulePages.reports} />} />
          <Route path="/settings" element={<ModulePlaceholder title={modulePages.settings} />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
