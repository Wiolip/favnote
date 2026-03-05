import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/common/Card/Card';
import { fetchNotes } from '@/store/notesReducer';

const Notes = () => {
  const [search, setSearch] = useState('');
  console.log('Aktualna fraza:', search);
  const { items: notes, status } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  // 2. Pobieramy notatki przy montowaniu komponentu
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  // FUNKCJA FILTRUJĄCA
  const filteredNotes = notes.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <GridTemplate
      pageType="notes"
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
      itemsCount={filteredNotes.length}
    >
      {status === 'loading' && <p>Loading...</p>}

      {/* 3. Mapujemy po notes (czyli po state.notes.items) */}
      {filteredNotes &&
        filteredNotes.map(({ title, content, created, _id, id }) => (
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
      {status === 'succeeded' && filteredNotes.length === 0 && (
        <p>No notes found.</p>
      )}
    </GridTemplate>
  );
};;

export default Notes;
