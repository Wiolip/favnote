import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];
const BASE_URL = 'http://localhost:9000/api/notes';

// 1. Pobieranie - dodajemy parametry, żeby pobierać tylko notatki zalogowanego usera
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (_, { getState }) => {
  const { userID } = getState().auth;
  const response = await axios.get(BASE_URL, { params: { userID } });
  return response.data;
});

// 2. Dodawanie - TUTAJ BYŁ BŁĄD. Dodajemy { getState } jako drugi argument
export const addNoteAction = createAsyncThunk(
  'notes/addNote',
  async (itemContent, { getState }) => {
    // Wyciągamy userID z drugiego reducera (auth)
    const { userID } = getState().auth;

    console.log("WYSYŁAM DANE:", { ...itemContent, userID });

    // Wysyłamy do bazy KOMPLET danych: treść + ID użytkownika
    const response = await axios.post(BASE_URL, {
      ...itemContent,
      userID,
    });
    return response.data;
  }
);

// 3. Usuwanie - ujednolicony adres URL
export const removeNoteAction = createAsyncThunk('notes/removeNote', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

const notes = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addNoteAction.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeNoteAction.fulfilled, (state, action) => {
        return state.filter((item) => (item._id || item.id) !== action.payload);
      });
  },
});

export default notes.reducer;