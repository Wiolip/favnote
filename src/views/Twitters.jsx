import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/common/Card/Card';
import { fetchTwitters } from '@/store/twittersReducer';

const Twitters = () => {
  // 1. Wyciągamy tablicę items z obiektu twitters
  const { items: twitters, status } = useSelector((state) => state.twitters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTwitters());
  }, [dispatch]);

  return (
    <GridTemplate pageType="twitters">
      {/* 2. Opcjonalny wskaźnik ładowania dla lepszego UX */}
      {status === 'loading' && <p>Loading Twitters...</p>}

      {/* 3. Sprawdzamy czy twitters istnieje i mapujemy */}
      {twitters &&
        twitters.map(({ title, content, twitterName, created, _id, id }) => (
          <Card
            id={_id || id}
            cardType="twitters"
            title={title}
            content={content}
            twitterName={twitterName}
            created={created}
            key={_id || id}
          />
        ))}
    </GridTemplate>
  );
};

export default Twitters;
