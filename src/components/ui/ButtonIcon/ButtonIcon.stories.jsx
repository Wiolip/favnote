import { useState } from 'react';
import ButtonIcon from './ButtonIcon';
import bulbIcon from '../../../assets/icons/bulb.svg?url';
import logoutIcon from '../../../assets/icons/logout.svg?url';
import penIcon from '../../../assets/icons/pen.svg?url';
import plusIcon from '../../../assets/icons/plus.svg?url';
import twitterIcon from '../../../assets/icons/twitter.svg?url';


export default {
  title: 'Atoms/ButtonIcon',
  component: ButtonIcon,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '200px',
          height: '200px',
          background: '#ffd82b',
        }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    $active: { control: 'boolean' },
  },
};

// Funkcja do interaktywnego toggla aktywności
const InteractiveButton = ({ icon }) => {
  const [active, setActive] = useState(false);
  return (
    <ButtonIcon
      icon={icon}
      $active={active}
      onClick={() => setActive(!active)}
    />
  );
};

// Każda historia teraz używa interaktywnego przycisku
export const Bulb = {
  render: () => <InteractiveButton icon={bulbIcon} />,
};

export const Logout = {
  render: () => <InteractiveButton icon={logoutIcon} />,
};

export const Pen = {
  render: () => <InteractiveButton icon={penIcon} />,
};

export const Plus = {
  render: () => <InteractiveButton icon={plusIcon} />,
};

export const Twitter = {
  render: () => <InteractiveButton icon={twitterIcon} />,
};