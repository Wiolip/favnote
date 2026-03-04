import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '@/theme/mainTheme';
import GlobalStyle from '@/theme/GlobalStyle';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import NewItemBar from '@/components/layout/NewItemBar/NewItemBar';
import ButtonIcon from '@/components/ui/ButtonIcon/ButtonIcon';
import plusIcon from '@/assets/icons/plus.svg';
import { routes } from '@/routes/routes';

const StyledMain = styled.main`
  padding-left: ${({ $isAuthPage }) => ($isAuthPage ? '0' : '150px')};
  transition: padding-left 0.3s ease-in-out;
`;

const StyledPlusButton = styled(ButtonIcon)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 10000;
  background-color: ${({ theme, $activeColor }) =>
    theme[$activeColor] || theme.notes};
  background-size: 35%;
  border-radius: 50%;
  cursor: pointer;
`;

const MainTemplate = ({ children }) => {
  const { pathname } = useLocation();
  const [isBarVisible, setBarVisible] = useState(false);

  const isAuthPage = pathname === routes.login || pathname === routes.register;


  const pageType = pathname.includes('twitters')
    ? 'twitters'
    : pathname.includes('articles')
      ? 'articles'
      : 'notes';

  const toggleBar = () => setBarVisible(!isBarVisible);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>
          {!isAuthPage && (
            <>
              <Sidebar pageType={pageType} />
              <NewItemBar
                isVisible={isBarVisible}
                handleClose={() => setBarVisible(false)}
              />
              <StyledPlusButton
                icon={plusIcon}
                $activeColor={pageType}
                onClick={toggleBar}
              />
            </>
          )}
          <StyledMain $isAuthPage={isAuthPage}>{children}</StyledMain>
        </>
      </ThemeProvider>
    </>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired, // node jest lepsze niż element dla children
};

export default MainTemplate;
