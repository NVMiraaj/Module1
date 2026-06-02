
import {configureStore,createSlice} from '@reduxjs/toolkit';
const auth=createSlice({name:'auth',initialState:{isAuthenticated:true},reducers:{}});
export const store=configureStore({reducer:{auth:auth.reducer}});
