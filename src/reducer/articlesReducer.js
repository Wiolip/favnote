import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
    const response = await axios.get('http://localhost:9000/api/articles');
    return response.data;
});

export const addArticleAction = createAsyncThunk('articles/addArticle', async (itemContent) => {
    const response = await axios.post('http://localhost:9000/api/articles', itemContent);
    return response.data;
});

export const removeArticleAction = createAsyncThunk('articles/removeArticle', async (id) => {
    console.log('Redux Article START: ID to', id);
    try {
        await axios.delete(`http://localhost:9000/api/articles/${id}`);
        console.log('Redux Article SUKCES');
        return id;
    } catch (err) {
        console.error('Redux Article BŁĄD:', err.response?.status, err.message);
        throw err;
    }
});

const articles = createSlice({
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

export default articles.reducer;