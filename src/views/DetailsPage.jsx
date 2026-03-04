import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DetailsTemplate from '@/template/DetailsTemplate';
import UserPageTemplate from '@/template/UserPageTemplate';
import Heading from '@/components/ui/Heading/Heading';

import { fetchNotes } from '@/store/notesReducer';
import { fetchArticles } from '@/store/articlesReducer';
import { fetchTwitters } from '@/store/twittersReducer';

const DetailsPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Sprawdzamy adres URL: jeśli zawiera "twitters", context to "twitters" itd.
  const pageContext = pathname.includes('twitters')
    ? 'twitters'
    : pathname.includes('articles')
      ? 'articles'
      : 'notes';

  const items = useSelector((state) => state[pageContext] || []);

  // Szukamy konkretnego elementu z dodatkowym sprawdzeniem
  const activeItem = items.find((item) => {
    const itemIdentifier = item?._id || item?.id;
    return String(itemIdentifier) === String(id);
  });

  useEffect(() => {
    console.log('Obecny kontekst:', pageContext, 'ID:', id);
    if (items.length === 0) {
      if (pageContext === 'notes') dispatch(fetchNotes());
      if (pageContext === 'articles') dispatch(fetchArticles());
      if (pageContext === 'twitters') dispatch(fetchTwitters());
    }
  }, [dispatch, items.length, pageContext, id]);

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
      _id={activeItem._id || activeItem.id}
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
