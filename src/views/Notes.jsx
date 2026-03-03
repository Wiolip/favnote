import React from 'react';
import { useSelector } from 'react-redux';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/molecules/Card/Card';

const Notes = () => {

  const notes = useSelector((state) => state.notes);

  return (
    <GridTemplate pageType='notes'>
    {notes.map(({ title, content, created, id }) => (
      <Card
        id={id}
        cardType='notes'
        title={title}
        content={content}
        created={created}
        key={id}
      />
    ))}
  </GridTemplate>
  )
}

export default Notes;