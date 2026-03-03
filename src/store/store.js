import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '@/reducer/notesReducer';
import articlesReducer from '@/reducer/articlesReducer';
import twittersReducer from '@/reducer/twittersReducer';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    articles: articlesReducer,
    twitters: twittersReducer,
  },
});

export default store;
