import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '@/store/notesReducer';
import articlesReducer from '@/store/articlesReducer';
import twittersReducer from '@/store/twittersReducer';
import authReducer from '@/store/authReducer';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    articles: articlesReducer,
    twitters: twittersReducer,
    auth: authReducer,
  },
});

export default store;
