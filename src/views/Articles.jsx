import React from 'react';
import { useSelector } from 'react-redux';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/molecules/Card/Card';


const Articles = () => {
  const articles = useSelector((state) => state.articles);

  return (
    <GridTemplate pageType="articles">
      {articles.map(({ title, content, articleUrl, created, id }) => (
        <Card
          id={id}
          cardType="articles"
          title={title}
          content={content}
          articleUrl={articleUrl}
          created={created}
          key={id}
        />
      ))}
    </GridTemplate>
  );
};

export default Articles;
