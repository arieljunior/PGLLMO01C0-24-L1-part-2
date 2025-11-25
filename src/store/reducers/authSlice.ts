import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginCredentials, simulateLogin } from '@/services/api';
import * as storage from '@/services/storage';

export interface AuthState {
    token: string | null,
    status: 'idle' | 'authenticated',
    isLoading: boolean;
    isLoadingFromStorage: boolean;
    error: string | null
}

const initialState: AuthState = {
    status: 'idle',
    token: null,
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
                    token: action.payload,
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
                    token: action.payload,
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
            const token = await simulateLogin(credentials);
            await storage.saveToken(token);
            return token;
        } catch (e: any) {
            return rejectWithValue(e.message || "Erro desconhecido")
        }
    }
)

export const loadUserFromStorage = createAsyncThunk<string | null, void>(
    'auth/loadUserFromStorage',
    async () => {
        const token = await storage.getToken();
        return token;
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await storage.removeToken();
    }
);



export const { clearError } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer;