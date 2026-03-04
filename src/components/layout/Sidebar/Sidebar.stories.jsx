// Sidebar.stories.js
import React from 'react';
import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  argTypes: {
    pageType: {
      control: { type: 'radio' },
      options: ['note', 'twitter', 'article'],
    },
  },
};

const Template = (args, { initialEntries }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Sidebar {...args} />
  </MemoryRouter>
);

// Strona główna / notes
export const Normal = Template.bind({});
Normal.args = { pageType: 'note' };
Normal.parameters = { initialEntries: ['/'] };

// Twitter
export const TwittersPage = Template.bind({});
TwittersPage.args = { pageType: 'twitter' };
TwittersPage.parameters = { initialEntries: ['/twitters'] };

// Articles
export const ArticlesPage = Template.bind({});
ArticlesPage.args = { pageType: 'article' };
ArticlesPage.parameters = { initialEntries: ['/articles'] };
