import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DetailsTemplate from '@/template/DetailsTemplate';
import UserPageTemplate from '@/template/UserPageTemplate';

// Importy akcji (upewnij się, że ścieżki są poprawne!)
import { fetchNotes, removeNoteAction } from '@/store/notesReducer';
import { fetchArticles, removeArticleAction } from '@/store/articlesReducer';
import { fetchTwitters, removeTwitterAction } from '@/store/twittersReducer';

const DetailsPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. USTALAMY KONTEKST
  const pageContext = pathname.includes('twitters')
    ? 'twitters'
    : pathname.includes('articles')
      ? 'articles'
      : 'notes';

  // 2. POBIERAMY LISTĘ Z REDUXA
  const items = useSelector((state) => state[pageContext]?.items || []);

  // 3. SZUKAMY AKTYWNEGO ELEMENTU (To musi być TUTAJ, na samej górze!)
  const activeItem = items.find(
    (item) => String(item._id || item.id) === String(id),
  );

  // 4. FUNKCJA USUWANIA (używa zdefiniowanego wyżej activeItem)
  const handleRemoveItem = () => {
    if (activeItem) {
      const itemId = activeItem._id || activeItem.id;
      navigate(`/${pageContext}`); // Najpierw uciekamy z widoku detali

      if (pageContext === 'notes') dispatch(removeNoteAction(itemId));
      if (pageContext === 'twitters') dispatch(removeTwitterAction(itemId));
      if (pageContext === 'articles') dispatch(removeArticleAction(itemId));
    }
  };

  // 5. AUTO-FETCH (jeśli odświeżymy stronę)
  useEffect(() => {
    if (items.length === 0) {
      if (pageContext === 'notes') dispatch(fetchNotes());
      if (pageContext === 'articles') dispatch(fetchArticles());
      if (pageContext === 'twitters') dispatch(fetchTwitters());
    }
  }, [dispatch, items.length, pageContext]);

  // 6. ZABEZPIECZENIE (jeśli dane się ładują)
  if (!activeItem) {
    return (
      <UserPageTemplate pageType={pageContext}>
        <p>Loading...</p>
      </UserPageTemplate>
    );
  }

  // 7. RENDEROWANIE (przekazujemy wszystko do Template)
  return (
    <DetailsTemplate
      _id={activeItem._id || activeItem.id}
      pageType={pageContext}
      title={activeItem.title}
      // Rozwiązanie problemu z datą:
      created={activeItem.created || activeItem.createdAt || 'No date'}
      content={activeItem.content}
      articleUrl={activeItem.articleUrl}
      twitterName={activeItem.twitterName}
      handleRemove={handleRemoveItem}
    />
  );
};

export default DetailsPage;
