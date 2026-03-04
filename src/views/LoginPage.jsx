import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthTemplate from '@/template/AuthTemplate';
import Heading from '@/components/atoms/Heading/Heading';
import Input from '@/components/atoms/Input/Input';
import Button from '@/components/atoms/Button/Button';
import { routes } from '@/routes/routes';
import { authenticate as authenticateAction } from '@/acton/action';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 0 0 30px 0;
  height: 40px;
  width: 300px;
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const LoginPage = ({ userID, authenticate }) => {
  // Jeśli mamy userID w Reduksie, od razu uciekamy do strony głównej
  if (userID) {
    return <Navigate to={routes.home} />;
  }

  return (
    <AuthTemplate>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={({ username, password }) => {
          authenticate(username, password);
        }}
      >
        {({ handleChange, handleBlur, values }) => (
          <>
            <Heading>Sign in</Heading>
            <StyledForm>
              <StyledInput
                type="text"
                name="username"
                placeholder="Login"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <StyledInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <Button $activeColor="notes" type="submit">
                sign in
              </Button>
            </StyledForm>
            <StyledLink to={routes.register}>I want my account!</StyledLink>
          </>
        )}
      </Formik>
    </AuthTemplate>
  );
};

// Zmienione mapowanie, aby poprawnie wyciągać userID ze stanu
const mapStateToProps = (state) => ({
  userID: state.auth ? state.auth.userID : null,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: (username, password) =>
    dispatch(authenticateAction(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
