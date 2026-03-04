import React, { useEffect } from 'react'; // Dodajemy useEffect
import { useSelector, useDispatch } from 'react-redux'; // Dodajemy useDispatch
import { fetchNotes } from '@/reducer/notesReducer'; // Importujemy akcję

import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/molecules/Card/Card';


const Notes = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  // Pobieramy dane przy zamontowaniu komponentu
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <GridTemplate pageType="notes">
      {notes.map(({ title, content, created, _id, id }) => (
        <Card
          _id={_id || id}
          cardType="notes"
          title={title}
          content={content}
          created={created}
          key={_id || id}
        />
      ))}
    </GridTemplate>
  );
};

export default Notes;
