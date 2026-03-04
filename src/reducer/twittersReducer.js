import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];
const BASE_URL = 'http://localhost:9000/api/twitters';

// 1. Pobieranie - przefiltrowane przez userID
export const fetchTwitters = createAsyncThunk('twitters/fetchTwitters', async (_, { getState }) => {
    const { userID } = getState().auth; // Pobieramy ID zalogowanego usera
    const response = await axios.get(BASE_URL, { params: { userID } });
    return response.data;
});

// 2. Dodawanie - TUTAJ MUSI BYĆ userID
export const addTwitterAction = createAsyncThunk(
    'twitters/addTwitter',
    async (itemContent, { getState }) => {
        const { userID } = getState().auth;

        const response = await axios.post(BASE_URL, {
            ...itemContent,
            userID, // <--- Bez tego serwer zwróci 400
        });
        return response.data;
    }
);

// 3. Usuwanie
export const removeTwitterAction = createAsyncThunk('twitters/removeTwitter', async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
});

const twitters = createSlice({
    name: 'twitters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTwitters.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addTwitterAction.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(removeTwitterAction.fulfilled, (state, action) => {
                return state.filter((item) => (item._id || item.id) !== action.payload);
            });
    },
});

export default twitters.reducer;