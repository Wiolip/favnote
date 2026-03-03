import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailsTemplate from '@/template/DetailsTemplate';

const DetailsPage = () => {
  const { pathname } = useLocation();
  let pageType = 'notes';


  if (pathname.includes('twitters')) {
    pageType = 'twitters';
  } else if (pathname.includes('articles')) {
    pageType = 'articles';
  } else {
    pageType = 'notes';
  }

  const dummyArticle = {
    id: 1,
    title: 'Wake me up when Vue ends',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    twitterName: 'React_dev',
    articleUrl: 'https://x.com/reactjs',
    created: '1 day',
  };

  return (
    <DetailsTemplate
      pageType={pageType}
      title={dummyArticle.title}
      created={dummyArticle.created}
      content={dummyArticle.content}
      articleUrl={dummyArticle.articleUrl}
      twitterName={dummyArticle.twitterName}
    />
  );
};

export default DetailsPage;
