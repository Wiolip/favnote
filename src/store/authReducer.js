import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';
const BASE_URL = `${API_URL}/api`;

// 1. Definiujemy stan początkowy, który od razu sprawdza pamięć przeglądarki
const initialState = {
    userID: localStorage.getItem('userID') || null,
    isLoading: false,
};

// --- AKCJA LOGOWANIA ---
export const authenticateAction = createAsyncThunk(
    'auth/authenticate',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/login`, {
                username,
                password,
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // --- AKCJA WYLOGOWANIA ---
        logoutAction: (state) => {
            state.userID = null;
            localStorage.removeItem('userID'); // Czyścimy pamięć przy wylogowaniu
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authenticateAction.fulfilled, (state, action) => {
                state.isLoading = false;
                const id = action.payload._id || action.payload.userID || action.payload;
                state.userID = id;
                localStorage.setItem('userID', id);
            })
            .addCase(authenticateAction.rejected, (state) => {
                state.isLoading = false;
                state.userID = null;
                localStorage.removeItem('userID');
            });
    },
});

export const { logoutAction } = authSlice.actions;
export default authSlice.reducer;