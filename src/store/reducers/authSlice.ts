import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginCredentials, loginWithFirebase } from '@/services/api';
import * as storage from '@/services/storage';
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase';

export interface AuthState {
    uid: string | null,
    status: 'idle' | 'authenticated',
    isLoading: boolean;
    isLoadingFromStorage: boolean;
    error: string | null
}

const initialState: AuthState = {
    status: 'idle',
    uid: null,
    error: null,
    isLoading: false,
    isLoadingFromStorage: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
                state = {
                    ...state,
                    uid: action.payload,
                    isLoading: false,
                    error: null,
                    status: 'authenticated'
                };
                return state;
            })
            .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload || 'Falha no login';
            })

            .addCase(loadUserFromStorage.pending, (state) => {
                state.isLoadingFromStorage = true;
            })
            .addCase(loadUserFromStorage.fulfilled, (state, action: PayloadAction<string | null>) => {
                state = {
                    ...state,
                    uid: action.payload,
                    isLoadingFromStorage: false,
                    error: null,
                    status: 'authenticated'
                }
                return state;
            })
            .addCase(loadUserFromStorage.rejected, (state) => {
                state.isLoadingFromStorage = false;
            })

            .addCase(logout.fulfilled, (state) => {
                state = initialState;
                return state;
            });
    }
});

export const login = createAsyncThunk<string, LoginCredentials, { rejectValue: string }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const uid = await loginWithFirebase(credentials);
            await storage.saveUid(uid);
            return uid;
        } catch (e: any) {
            return rejectWithValue(e.message || "Erro desconhecido")
        }
    }
)

export const loadUserFromStorage = createAsyncThunk<string | null, void>(
    'auth/loadUserFromStorage',
    async () => {
        const uid = await storage.getUid();
        return uid;
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await signOut(auth)
        await storage.removeUid();
    }
);



export const { clearError } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer;