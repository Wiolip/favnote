import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ButtonIcon from '@/components/ui/ButtonIcon/ButtonIcon';
import { logoutAction } from '@/store/authReducer';

import bulbIcon from '@/assets/icons/bulb.svg';
import logoutIcon from '@/assets/icons/logout.svg';
import penIcon from '@/assets/icons/pen.svg';
import twitterIcon from '@/assets/icons/twitter.svg';
import logoIcon from '@/assets/icons/logo.svg?url';

const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 150px;
  height: 100vh;
  /* Dynamicznie pobieramy kolor z motywu na podstawie aktywnej ścieżki */
  background-color: ${({ theme, $pageType }) =>
    theme[$pageType] || theme.notes};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
`;

const StyledLogoLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67px;
  height: 67px;
  margin-bottom: 10vh;
  border: none;

  img {
    width: 100%;
    height: auto;
  }
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Sidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Logika rozpoznawania typu strony bezpośrednio z adresu URL
  // /notes -> notes, /twitters -> twitters itd.
  const getPageType = () => {
    if (pathname.includes('notes')) return 'notes';
    if (pathname.includes('twitters')) return 'twitters';
    if (pathname.includes('articles')) return 'articles';
    return 'notes';
  };

  const pageType = getPageType();

  return (
    <StyledWrapper $pageType={pageType}>
      <StyledLogoLink to="/">
        <img src={logoIcon} alt="FavNote Logo" />
      </StyledLogoLink>

      <StyledLinksList>
        <li>
          <ButtonIcon
            as={NavLink}
            to="/notes"
            icon={penIcon}
            activeclass="active"
          />
        </li>
        <li>
          <ButtonIcon
            as={NavLink}
            to="/twitters"
            icon={twitterIcon}
            activeclass="active"
          />
        </li>
        <li>
          <ButtonIcon
            as={NavLink}
            to="/articles"
            icon={bulbIcon}
            activeclass="active"
          />
        </li>
      </StyledLinksList>

      <ButtonIcon
        as={NavLink}
        to="/login"
        icon={logoutIcon}
        style={{ marginTop: 'auto' }}
        onClick={() => dispatch(logoutAction())}
      />
    </StyledWrapper>
  );
};

export default Sidebar;
