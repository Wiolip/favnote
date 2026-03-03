import React from 'react';
import { useSelector } from 'react-redux';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/molecules/Card/Card';

const Twitters = () => {
  const twitters = useSelector((state) => state.twitters);

  return (
    <GridTemplate pageType="twitters">
      {twitters.map(({ title, content, twitterName, created, id }) => (
        <Card
          id={id}
          cardType="twitters"
          title={title}
          content={content}
          twitterName={twitterName}
          created={created}
          key={id}
        />
      ))}
    </GridTemplate>
  );
};

export default Twitters;
