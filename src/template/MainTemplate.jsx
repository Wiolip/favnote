import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '@/theme/mainTheme';
import GlobalStyle from '@/theme/GlobalStyle';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import { routes } from '@/routes/routes';

const StyledMain = styled.main`
  padding-left: ${({ $isAuthPage }) => ($isAuthPage ? '0' : '150px')};
  transition: padding-left 0.3s ease-in-out;
`;

const MainTemplate = ({ children }) => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === routes.login || pathname === routes.register;

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>
          {!isAuthPage && <Sidebar />}
          <StyledMain $isAuthPage={isAuthPage}>{children}</StyledMain>
        </>
      </ThemeProvider>
    </>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
