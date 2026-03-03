import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { theme } from "@/theme/mainTheme";
import GlobalStyle from "@/theme/GlobalStyle";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";


const MainTemplate= ({ children }) => {

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

MainTemplate.propTypes = {
    children: PropTypes.element.isRequired,
}

export default MainTemplate;
