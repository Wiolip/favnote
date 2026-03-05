import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/common/Card/Card';
import { fetchArticles } from '@/store/articlesReducer';

const Articles = () => {
  const [search, setSearch] = useState('');
  const { items: articles, status } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const filteredArticles = articles.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <GridTemplate
      pageType="articles"
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
      itemsCount={filteredArticles.length}
    >
      {/* Opcjonalnie: Loading Spinner */}
      {status === 'loading' && <p>Loading...</p>}

      {/* Sprawdzamy czy articles istnieje i czy jest tablicą przed mapowaniem */}
      {filteredArticles &&
        filteredArticles.map(
          ({ title, content, articleUrl, created, _id, id }) => (
            <Card
              id={_id || id}
              cardType="articles"
              title={title}
              content={content}
              articleUrl={articleUrl}
              created={created}
              key={_id || id}
            />
          ),
        )}
      {status === 'succeeded' && filteredArticles.length === 0 && (
        <p>No articles found.</p>
      )}
    </GridTemplate>
  );
};

export default Articles;
