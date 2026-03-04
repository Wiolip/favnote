import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/common/Card/Card';
import { fetchNotes } from '@/store/notesReducer'; // Upewnij się, że ścieżka jest poprawna

const Notes = () => {
  // 1. Zmieniamy wyciąganie danych - musimy wejść w .items
  const { items: notes, status } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  // 2. Pobieramy notatki przy montowaniu komponentu
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <GridTemplate pageType="notes">
      {/* Opcjonalny wskaźnik ładowania */}
      {status === 'loading' && <p>Wczytywanie notatek...</p>}

      {/* 3. Mapujemy po notes (czyli po state.notes.items) */}
      {notes &&
        notes.map(({ title, content, created, _id, id }) => (
          <Card
            id={_id || id}
            key={_id || id}
            cardType="notes"
            title={title}
            content={content}
            created={created}
          />
        ))}

      {/* Informacja, gdy nie ma żadnych notatek */}
      {status === 'succeeded' && notes.length === 0 && (
        <p>Brak notatek. Dodaj pierwszą!</p>
      )}
    </GridTemplate>
  );
};

export default Notes;
