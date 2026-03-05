import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/common/Card/Card';
import { fetchTwitters } from '@/store/twittersReducer';

const Twitters = () => {
  const [search, setSearch] = useState('');
  const { items: twitters, status } = useSelector((state) => state.twitters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTwitters());
  }, [dispatch]);

  const filteredTwitters = twitters.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <GridTemplate
      pageType="twitters"
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
      itemsCount={filteredTwitters.length}
    >
      {/* 2. Opcjonalny wskaźnik ładowania dla lepszego UX */}
      {status === 'loading' && <p>Loading X post..</p>}

      {/* 3. Sprawdzamy czy twitters istnieje i mapujemy */}
      {filteredTwitters &&
        filteredTwitters.map(
          ({ title, content, twitterName, created, _id, id }) => (
            <Card
              id={_id || id}
              key={_id || id}
              cardType="twitters"
              title={title}
              content={content}
              created={created}
              twitterName={twitterName}
            />
          ),
        )}
      {status === 'succeeded' && filteredTwitters.length === 0 && (
        <p>No x-post found.</p>
      )}
    </GridTemplate>
  );
};

export default Twitters;
