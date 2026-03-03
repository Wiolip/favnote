import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '@/routes';
import MainTemplate from '@/template/MainTemplate';
import Notes from '@/views/Notes';
import Articles from '@/views/Articles';
import Twitters from '@/views/Twitters';
import Button from '@/components/atoms/Button/Button';
import DetailsPage from './DetailsPage';

const Root = () => (
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
);

export default Root;
