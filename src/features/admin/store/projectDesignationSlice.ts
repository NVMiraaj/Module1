import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { projectDesignationData } from '../mock/projectDesignationData';
import type {
  ProjectDesignation,
  ProjectDesignationFormValues,
} from '../types/projectDesignation';

interface ProjectDesignationFilters {
  search: string;
}

interface ProjectDesignationState {
  filters: ProjectDesignationFilters;
  projectDesignations: ProjectDesignation[];
}

const initialState: ProjectDesignationState = {
  filters: {
    search: '',
  },
  projectDesignations: projectDesignationData,
};

const projectDesignationSlice = createSlice({
  initialState,
  name: 'projectDesignations',
  reducers: {
    createProjectDesignation: (state, action: PayloadAction<ProjectDesignationFormValues>) => {
      const nextId = Math.max(0, ...state.projectDesignations.map((item) => item.id)) + 1;
      state.projectDesignations.unshift({ id: nextId, ...action.payload });
    },
    deleteProjectDesignation: (state, action: PayloadAction<number>) => {
      state.projectDesignations = state.projectDesignations.filter((item) => item.id !== action.payload);
    },
    setProjectDesignationSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    updateProjectDesignation: (state, action: PayloadAction<ProjectDesignation>) => {
      state.projectDesignations = state.projectDesignations.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
  },
});

export const {
  createProjectDesignation,
  deleteProjectDesignation,
  setProjectDesignationSearch,
  updateProjectDesignation,
} = projectDesignationSlice.actions;
export default projectDesignationSlice.reducer;
