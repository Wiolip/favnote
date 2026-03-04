import React, { useEffect } from 'react'; // Dodajemy useEffect
import { useSelector, useDispatch } from 'react-redux'; // Dodajemy useDispatch
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/molecules/Card/Card';
import { fetchTwitters } from '@/reducer/twittersReducer'; // Importujemy akcję

const Twitters = () => {
  const twitters = useSelector((state) => state.twitters);
  const dispatch = useDispatch();

  // Pobieramy dane przy zamontowaniu komponentu
  useEffect(() => {
    dispatch(fetchTwitters());
  }, [dispatch]);

  return (
    <GridTemplate pageType="twitters">
      {twitters.map(({ title, content, twitterName, created, _id, id }) => (
        <Card
          id={_id || id} // MongoDB używa _id
          cardType="twitters"
          title={title}
          content={content}
          twitterName={twitterName}
          created={created}
          key={_id || id}
        />
      ))}
    </GridTemplate>
  );
};

export default Twitters;
