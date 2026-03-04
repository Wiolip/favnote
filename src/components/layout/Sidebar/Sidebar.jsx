import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonIcon from '@/components/ui/ButtonIcon/ButtonIcon';
import { logoutAction } from '@/store/authReducer';

import bulbIcon from '@/assets/icons/bulb.svg';
import logoutIcon from '../../../assets/icons/logout.svg?url';
import penIcon from '@/assets/icons/pen.svg';
import twitterIcon from '@/assets/icons/twitter.svg';
import logoIcon from '../../../assets/icons/logo.svg?url';

const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 150px;
  height: 100vh;
  background-color: ${({ $activeColor, theme }) =>
    $activeColor ? theme[$activeColor] : theme.note};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 67px;
  height: 67px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 10vh;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Sidebar = ({ pageType }) => {
  const location = useLocation();
  const dispatch = useDispatch(); // Inicjalizacja dispatcha

  const links = [
    { to: '/notes', icon: penIcon },
    { to: '/twitters', icon: twitterIcon },
    { to: '/articles', icon: bulbIcon },
  ];

  return (
    <StyledWrapper $activeColor={pageType}>
      <StyledLogoLink to="/">
        <img src={logoIcon} alt="Logo" />
      </StyledLogoLink>

      <StyledLinksList>
        {links.map(({ to, icon }) => (
          <li key={to}>
            <ButtonIcon
              as={NavLink}
              to={to}
              icon={icon}
              $active={location.pathname === to}
            />
          </li>
        ))}
      </StyledLinksList>

      <ButtonIcon
        as={NavLink}
        to="/login"
        icon={logoutIcon}
        style={{ marginTop: 'auto' }}
        onClick={() => dispatch(logoutAction())} // Odpalamy nową akcję
      />
    </StyledWrapper>
  );
};

Sidebar.propTypes = {
  pageType: PropTypes.oneOf(['note', 'twitter', 'article']).isRequired,
};

export default Sidebar;
