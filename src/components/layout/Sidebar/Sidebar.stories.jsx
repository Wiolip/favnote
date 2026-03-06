// Sidebar.stories.js
import React from 'react';
import Sidebar from './Sidebar';

export default {
  title: 'layout/Sidebar',
  component: Sidebar,
};

const Template = (args, { initialEntries }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Sidebar {...args} />
  </MemoryRouter>
);

export const Normal = () => <Sidebar />;

export const Twitters = () => <Sidebar />;
Twitters.parameters = {
  route: '/twitters',
};


export const Articles = () => <Sidebar />;
Articles.parameters = {
  route: '/articles',
};

