
import { configureStore, createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = auth.actions;

export const store = configureStore({
  reducer: {
    auth: auth.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
