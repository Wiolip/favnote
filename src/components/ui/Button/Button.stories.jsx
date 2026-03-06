// Button.stories.js
import Button from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    $activeColor: {
      control: { type: 'select' },
      options: ['notes', 'twitters', 'articles'],
    },
  },
};

const Template = (args) => <Button {...args}>Hello World</Button>;

export const Note = Template.bind({});
Note.args = {
  $activeColor: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  $activeColor: 'twitters',
};
