import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '@/routes';
import { Provider } from 'react-redux';
import store from '@/store/store';

import MainTemplate from '@/template/MainTemplate';
import DetailsPage from './DetailsPage';
import Notes from '@/views/Notes';
import Articles from '@/views/Articles';
import Twitters from '@/views/Twitters';
import Button from '@/components/atoms/Button/Button';


const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Routes>
          <Route
            path={routes.home}
            element={<Navigate to={routes.notes} replace />}
          />

          <Route path={routes.notes} element={<Notes />} />
          <Route path={routes.note} element={<DetailsPage />} />

          <Route path={routes.articles} element={<Articles />} />
          <Route path={routes.article} element={<DetailsPage />} />

          <Route path={routes.twitters} element={<Twitters />} />
          <Route path={routes.twitter} element={<DetailsPage />} />

          <Route
            path="/:pageType/new"
            element={<div>Tu będzie formularz dodawania</div>}
          />

          <Route path={routes.login} element={<div>Strona logowania</div>} />
        </Routes>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
