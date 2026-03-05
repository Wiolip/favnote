import React, { useSelector } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '@/routes/routes';
import { Provider } from 'react-redux';
import store from '@/store/index';

import MainTemplate from '@/template/MainTemplate';
import DetailsPage from './DetailsPage';
import Notes from '@/views/Notes';
import Articles from '@/views/Articles';
import Twitters from '@/views/Twitters';
import Button from '@/components/ui/Button/Button';
import RegisterPage from '@/views/RegisterPage';
import LoginPage from './LoginPage';

const ProtectedRoute = ({ children }) => {
  const userID = useSelector((state) => state.auth.userID);

  if (!userID) {
    return <Navigate to={routes.login} replace />;
  }

  return children;
};

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Routes>
          <Route
            path={routes.home}
            element={
              <ProtectedRoute>
                <Navigate to={routes.notes} replace />
              </ProtectedRoute>
            }
          />

          {/* Strony autoryzacji */}
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.register} element={<RegisterPage />} />

          {/* Pozostałe widoki */}
          <Route path={routes.notes} element={<Notes />} />
          <Route path={routes.note} element={<DetailsPage />} />

          
          <Route
            path={routes.notes}
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.articles}
            element={
              <ProtectedRoute>
                <Articles />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.twitters}
            element={
              <ProtectedRoute>
                <Twitters />
              </ProtectedRoute>
            }
          />


          <Route
            path={routes.note}
            element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.article}
            element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.twitter}
            element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            }
          />

          <Route path="/:pageType/new" element={<div></div>} />
        </Routes>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
