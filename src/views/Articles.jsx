import React, { useEffect } from 'react'; // 1. Dodajemy useEffect
import { useSelector, useDispatch } from 'react-redux';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/molecules/Card/Card';
import { fetchArticles } from '@/reducer/articlesReducer'; // 2. Importujemy nową akcję async

const Articles = () => {
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  // 3. Gdy komponent się montuje, prosimy backend o dane
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <GridTemplate pageType="articles">
      {articles.map(({ title, content, articleUrl, created, _id, id }) => (
        <Card
          // MongoDB używa _id, więc warto to uwzględnić
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
