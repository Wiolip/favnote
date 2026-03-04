import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import AuthTemplate from '@/template/AuthTemplate';
import Heading from '@/components/atoms/Heading/Heading';
import Input from '@/components/atoms/Input/Input';
import Button from '@/components/atoms/Button/Button';
import { routes } from '@/routes/routes';
import axios from 'axios';

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

const RegisterPage = () => (
  <AuthTemplate>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={({ username, password }) => {
        // Prosta rejestracja bez Reduxa na start
        axios
          .post('http://localhost:9000/api/user/register', {
            username,
            password,
          })
          .then(() => alert('Account created! You can log in now.'))
          .catch((err) => alert('Error: ' + err.response.data.error));
      }}
    >
      {({ handleChange, handleBlur, values }) => (
        <>
          <Heading>Create account</Heading>
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
              register
            </Button>
          </StyledForm>
          <StyledLink to={routes.login}>I already have an account</StyledLink>
        </>
      )}
    </Formik>
  </AuthTemplate>
);

export default RegisterPage;
