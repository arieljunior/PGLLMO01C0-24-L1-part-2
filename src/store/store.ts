import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        auth: authSlice
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDisptach = typeof store.dispatch

export const useAppDispatch = ()=> useDispatch<AppDisptach>()