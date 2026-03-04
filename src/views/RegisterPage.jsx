import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { routes } from '@/routes/routes';
import AuthTemplate from '@/template/AuthTemplate';
import Heading from '@/components/ui/Heading/Heading';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import  authenticate from '@/store/authActions';
import styled from 'styled-components';

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
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <AuthTemplate>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={({ username, password }) => {

          dispatch(authenticate(username, password, 'register'))
            .then(() => {
              navigate(routes.login);
              alert('Account created! Now log in.');
            })
            .catch(() => alert('Registration failed. Try again.'));
        }}
      >
        {({ handleChange, handleBlur, values }) => (
          <>
            <Heading>Create account</Heading>
            <StyledForm>
              <StyledInput
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
            <StyledLink to={routes.login} > go to login page</StyledLink>
          </>
        )}
      </Formik>
    </AuthTemplate>
  );
};

export default RegisterPage;
