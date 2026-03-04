import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const fetchTwitters = createAsyncThunk('twitters/fetchTwitters', async () => {
    const response = await axios.get('http://localhost:9000/api/twitters');
    return response.data;
});

export const addTwitterAction = createAsyncThunk('twitters/addTwitter', async (itemContent) => {
    const response = await axios.post('http://localhost:9000/api/twitters', itemContent);
    return response.data;
});

export const removeTwitterAction = createAsyncThunk('twitters/removeTwitter', async (id) => {
    console.log('Redux Twitter START: ID to', id);
    try {
        await axios.delete(`http://localhost:9000/api/twitters/${id}`);
        console.log('Redux Twitter SUKCES');
        return id;
    } catch (err) {
        console.error('Redux Twitter BŁĄD:', err.response?.status, err.message);
        throw err;
    }
});

const twitters = createSlice({
    name: 'twitters',
    initialState,
    reducers: {}, // Usunięto nieużywane removeItem
    extraReducers: (builder) => {
        builder
            .addCase(fetchTwitters.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addTwitterAction.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(removeTwitterAction.fulfilled, (state, action) => {
                // Filtrowanie stanu po udanym usunięciu z bazy
                return state.filter((item) => (item._id || item.id) !== action.payload);
            });
    },
});

export default twitters.reducer;