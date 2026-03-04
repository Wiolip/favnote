import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/molecules/Card/Card';
import { fetchArticles } from '@/reducer/articlesReducer';


const Articles = () => {
  // Wyciągamy tablicę items i opcjonalnie status dla UX
  const { items: articles, status } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <GridTemplate pageType="articles">
      {/* Opcjonalnie: Loading Spinner */}
      {status === 'loading' && <p>Loading...</p>}

      {/* Sprawdzamy czy articles istnieje i czy jest tablicą przed mapowaniem */}
      {articles &&
        articles.map(({ title, content, articleUrl, created, _id, id }) => (
          <Card
            id={_id || id}
            cardType="articles"
            title={title}
            content={content}
            articleUrl={articleUrl}
            created={created}
            key={_id || id}
          />
        ))}
    </GridTemplate>
  );
};

export default Articles;