// DetailsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DetailsTemplate from '@/template/DetailsTemplate';
import WithContext from '@/hoc/WithContext';

const DetailsPage = ({ pageContext }) => {
  const { id } = useParams();

  // Pobieramy dane z Reduxa z obsługą błędów (optional chaining)
  const activeItem = useSelector((state) => {
    // Sprawdzamy co mamy w stanie dla danego kontekstu
    const items = state[pageContext] ? state[pageContext][pageContext] : [];

    // Szukamy elementu, upewniając się, że porównujemy stringi (id z URL to zawsze string)
    return items.find((item) => String(item.id) === String(id));
  });

  // Zabezpieczenie przed błędem, jeśli itemu jeszcze nie ma
  if (!activeItem) {
    return (
      <UserPageTemplate pageType={pageContext}>
        <Heading>Loading or item not found...</Heading>
      </UserPageTemplate>
    );
  }

  return (
    <DetailsTemplate
      id={activeItem.id} // Przekazujemy ID do usuwania!
      pageType={pageContext}
      title={activeItem.title}
      created={activeItem.created}
      content={activeItem.content}
      articleUrl={activeItem.articleUrl}
      twitterName={activeItem.twitterName}
    />
  );
};
const Detailed = WithContext(DetailsPage);

export default Detailed;
