import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Ujednolicamy strukturę do obiektu (tak jak w Articles i Notes)
const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

const BASE_URL = 'http://localhost:9000/api/twitters';

// 1. Pobieranie - przefiltrowane przez userID
export const fetchTwitters = createAsyncThunk('twitters/fetchTwitters', async (_, { getState }) => {
    const { userID } = getState().auth;
    const response = await axios.get(BASE_URL, { params: { userID } });
    return response.data;
});

// 2. Dodawanie
export const addTwitterAction = createAsyncThunk(
    'twitters/addTwitter',
    async (itemContent, { getState }) => {
        const { userID } = getState().auth;
        const response = await axios.post(BASE_URL, {
            ...itemContent,
            userID,
        });
        return response.data;
    }
);

// 3. Usuwanie
export const removeTwitterAction = createAsyncThunk('twitters/removeTwitter', async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
});

const twittersSlice = createSlice({
    name: 'twitters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // POBIERANIE
            .addCase(fetchTwitters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTwitters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; // Zapisujemy do .items
            })
            // DODAWANIE
            .addCase(addTwitterAction.fulfilled, (state, action) => {
                state.items.push(action.payload); // Pushujemy do tablicy wewnątrz obiektu
            })
            // USUWANIE
            .addCase(removeTwitterAction.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => (item._id || item.id) !== action.payload
                );
            });
    },
});

export default twittersSlice.reducer;