// .storybook/preview.jsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../src/store';
import { theme } from '../src/theme/mainTheme';
import GlobalStyle from '../src/theme/GlobalStyle';

const preview = {
  decorators: [
    (Story, context) => {

      const path = context.parameters?.route || '/';

      return (
        <Provider store={store}>
          
          <MemoryRouter initialEntries={[path]} key={path}>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Story />
            </ThemeProvider>
          </MemoryRouter>
        </Provider>
      );
    },
  ],
};

export default preview;
