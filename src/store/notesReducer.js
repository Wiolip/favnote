import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Zmieniamy na obiekt, żeby pasowało do standardu, który wprowadziliśmy w Articles
const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';
const BASE_URL = `${API_URL}/api/notes`;

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get(BASE_URL);
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

export const updateNoteAction = createAsyncThunk(
  'notes/update',
  async ({ _id, title, content }) => {
    const response = await axios.put(`${BASE_URL}/${_id}`, {
      title,
      content,
    });
    return response.data;
  }
);

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
      })
      //EDYTUJ
      .addCase(updateNoteAction.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {

          state.items[index] = action.payload;
        }
      });
  },
});



export default notesSlice.reducer;