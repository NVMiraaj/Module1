import type { LoginCredentials, LoginResponse } from './authTypes';

const mockAdminUser = {
  id: 'admin-001',
  name: 'Admin',
  email: 'admin@company.com',
  role: 'HR Administrator',
};

export async function authenticate(credentials: LoginCredentials): Promise<LoginResponse> {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 300);
  });

  return {
    user: {
      ...mockAdminUser,
      email: credentials.email,
    },
    token: credentials.rememberMe ? 'mock-persistent-token' : 'mock-session-token',
  };
}
