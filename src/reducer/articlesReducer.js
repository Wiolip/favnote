import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];
const BASE_URL = 'http://localhost:9000/api/articles';

// 1. Pobieranie - dodajemy params, żeby widzieć tylko swoje artykuły
export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (_, { getState }) => {
    const { userID } = getState().auth;
    const response = await axios.get(BASE_URL, { params: { userID } });
    return response.data;
});

// 2. Dodawanie - TUTAJ KLUCZOWA ZMIANA
export const addArticleAction = createAsyncThunk(
    'articles/addArticle',
    async (itemContent, { getState }) => {
        // Wyciągamy userID ze stanu Redux (z authReducer)
        const { userID } = getState().auth;

        const response = await axios.post(BASE_URL, {
            ...itemContent,
            userID, // <--- To naprawia błąd 400!
        });
        return response.data;
    }
);

// 3. Usuwanie
export const removeArticleAction = createAsyncThunk('articles/removeArticle', async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
});

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addArticleAction.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(removeArticleAction.fulfilled, (state, action) => {
                return state.filter((item) => (item._id || item.id) !== action.payload);
            });
    },
});

export default articlesSlice.reducer;