import { configureStore } from '@reduxjs/toolkit';
import projectDesignationReducer from '../features/admin/store/projectDesignationSlice';
import roleReducer from '../features/admin/store/roleSlice';
import authReducer from '../features/auth/authSlice';
import employeeReducer from '../features/employees/store/employeeSlice';
import projectReducer from '../features/projects/store/projectSlice';
import skillReducer from '../features/skills/skillSlice';

export const store = configureStore({
  reducer: {
    projectDesignations: projectDesignationReducer,
    roles: roleReducer,
    auth: authReducer,
    employees: employeeReducer,
    projects: projectReducer,
    skills: skillReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
