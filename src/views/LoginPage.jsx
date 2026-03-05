import React,  { useSelector} from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthTemplate from '@/template/AuthTemplate';
import Heading from '@/components/ui/Heading/Heading';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { routes } from '@/routes/routes';
import { authenticateAction } from '@/store/authReducer';

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

const LoginPage = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.auth.userID);

  const handleLogin = async (username, password) => {
    try {
      await dispatch(authenticateAction({ username, password })).unwrap();
      console.log('Zalogowano pomyślnie!');
    } catch (err) {
      console.error('Błąd logowania:', err);
      alert('Błędny login lub hasło!');
    }
  };


  if (userID) {
    return <Navigate to={routes.notes} />;
  }
  return (
    <AuthTemplate>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={({ username, password }) => handleLogin(username, password)}>

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

export default LoginPage;
