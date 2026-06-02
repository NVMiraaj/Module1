import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { roleData } from '../mock/roleData';
import type { Role, RoleFormValues, RoleStatus } from '../types/role';

interface RoleFilters {
  search: string;
  status: RoleStatus | 'All';
}

interface RoleState {
  roles: Role[];
  filters: RoleFilters;
}

const initialState: RoleState = {
  filters: {
    search: '',
    status: 'All',
  },
  roles: roleData,
};

const roleSlice = createSlice({
  initialState,
  name: 'roles',
  reducers: {
    createRole: (state, action: PayloadAction<RoleFormValues>) => {
      const nextId = Math.max(0, ...state.roles.map((role) => role.id)) + 1;
      state.roles.unshift({ id: nextId, ...action.payload });
    },
    deleteRole: (state, action: PayloadAction<number>) => {
      state.roles = state.roles.filter((role) => role.id !== action.payload);
    },
    setRoleSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setRoleStatusFilter: (state, action: PayloadAction<RoleFilters['status']>) => {
      state.filters.status = action.payload;
    },
    updateRole: (state, action: PayloadAction<Role>) => {
      state.roles = state.roles.map((role) => (role.id === action.payload.id ? action.payload : role));
    },
  },
});

export const { createRole, deleteRole, setRoleSearch, setRoleStatusFilter, updateRole } = roleSlice.actions;
export default roleSlice.reducer;
