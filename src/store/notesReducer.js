import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Zmieniamy na obiekt, żeby pasowało do standardu, który wprowadziliśmy w Articles
const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const BASE_URL = 'http://localhost:9000/api/notes';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (_, { getState }) => {
  const { userID } = getState().auth;
  const response = await axios.get(BASE_URL, { params: { userID } });
  return response.data;
});

export const addNoteAction = createAsyncThunk(
  'notes/addNote',
  async (itemContent, { getState }) => {
    const { userID } = getState().auth;
    const response = await axios.post(BASE_URL, {
      ...itemContent,
      userID,
    });
    return response.data;
  }
);

export const removeNoteAction = createAsyncThunk('notes/removeNote', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // POBIERANIE
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Zapisujemy do .items
      })
      // DODAWANIE
      .addCase(addNoteAction.fulfilled, (state, action) => {
        state.items.push(action.payload); // Pushujemy do tablicy wewnątrz obiektu
      })
      // USUWANIE
      .addCase(removeNoteAction.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => (item._id || item.id) !== action.payload
        );
      });
  },
});

export default notesSlice.reducer;