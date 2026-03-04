import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from '@/components/atoms/Heading/Heading';
import logoImg from '@/assets/icons/logo.svg?url';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.notes};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 10px;
`;

const StyledHeading = styled(Heading)`
  margin: 0 0 40px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledAuthCard = styled.div`
  width: 400px;
  min-height: 400px;
  padding: 40px;     
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthTemplate = ({ children }) => (
  <StyledWrapper>
    <StyledLogo src={logoImg} alt="FavNote logo" />
    <StyledHeading>Your new favorite online notes experience</StyledHeading>
    <StyledAuthCard>
      {children}
    </StyledAuthCard>
  </StyledWrapper>
);

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthTemplate;