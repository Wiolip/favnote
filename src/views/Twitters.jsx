import React from 'react';
import GridTemplate from '@/template/GridTemplate';
import Card from '@/components/molecules/Card/Card';

const twitters = [
  {
    id: 1,
    title: 'React_app',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '1 day',
    twitterName: 'jordwalke',
  },
  {
    id: 2,
    title: 'Redux guy',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '1 day',
    twitterName: 'reactjs',
  },
  {
    id: 3,
    title: 'React router stuff',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '5 days',
    twitterName: 'dan_abramov',
  },
  {
    id: 4,
    title: 'react world',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '10 days',
    twitterName: 'leeeroob',
  },
];

const Twitters = () => (
  <GridTemplate pageType='twitters'>
    {twitters.map(({ title, content, twitterName, created, id }) => (
      <Card
        id={id}
        cardType='twitters'
        title={title}
        content={content}
        twitterName={twitterName}
        created={created}
        key={id}
      />
    ))}
  </GridTemplate>
);

export default Twitters;
