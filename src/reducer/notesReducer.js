import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

// Akcja do pobierania
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get('http://localhost:9000/api/notes');
  return response.data;
});

// Akcja do dodawania
export const addNoteAction = createAsyncThunk('notes/addNote', async (itemContent) => {
  const response = await axios.post('http://localhost:9000/api/notes', itemContent);
  return response.data;
});

export const removeNoteAction = createAsyncThunk('notes/removeNote', async (id) => {
  console.log('1. Redux START: ID to', id);

  try {
    // Wysyłamy żądanie bez przypisywania do zmiennej
    await axios.delete(`http://127.0.0.1:9000/api/notes/${id}`);

    console.log('2. Redux SUKCES: Serwer odpowiedział');
    return id;
  } catch (err) {
    console.error('3. Redux BŁĄD:', err.response?.status, err.message);
    throw err;
  }
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