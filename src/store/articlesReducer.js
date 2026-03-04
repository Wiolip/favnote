import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null
};

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
            userID,
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
            // POBIERANIE
            .addCase(fetchArticles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; // Teraz poprawnie przypisujemy do items
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // DODAWANIE
            .addCase(addArticleAction.fulfilled, (state, action) => {
                state.items.push(action.payload); // pushujemy do state.items, a nie do state!
            })

            // USUWANIE
            .addCase(removeArticleAction.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => (item._id || item.id) !== action.payload
                );
            });
    },
});

export default articlesSlice.reducer;