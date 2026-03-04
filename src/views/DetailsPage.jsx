import React from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Dodany useLocation
import { useSelector } from 'react-redux';
import DetailsTemplate from '@/template/DetailsTemplate';
import UserPageTemplate from '@/template/UserPageTemplate';
import Heading from '@/components/atoms/Heading/Heading';

const DetailsPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  // Sprawdzamy adres URL: jeśli zawiera "twitters", context to "twitters" itd.
  const pageContext = pathname.includes('twitters')
    ? 'twitters'
    : pathname.includes('articles')
      ? 'articles'
      : 'notes';

  const activeItem = useSelector((state) => {

    const items = state[pageContext]?.[pageContext] || state[pageContext] || [];
    return items.find((item) => String(item.id) === String(id));
  });

  if (!activeItem) {
    return (
      <UserPageTemplate pageType={pageContext}>
        <Heading>
          Item not found (ID: {id}) in {pageContext}
        </Heading>
      </UserPageTemplate>
    );
  }

  return (
    <DetailsTemplate
      id={activeItem.id}
      pageType={pageContext}
      title={activeItem.title}
      created={activeItem.created}
      content={activeItem.content}
      articleUrl={activeItem.articleUrl}
      twitterName={activeItem.twitterName}
    />
  );
};

export default DetailsPage;
