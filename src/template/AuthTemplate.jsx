import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from '@/components/ui/Heading/Heading';
import logoImg from '@/assets/icons/logo.svg?url';


const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.notes};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.mq.mobile} {
    padding-bottom: 50px;
  }
`;

const StyledLogo = styled.img`
  width: 200px;
  height: auto;
  margin: 30px 0 20px;

  ${({ theme }) => theme.mq.mobile} {
    width: 150px;
  }
`;

const StyledHeading = styled(Heading)`
  margin: 0 0 40px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.m};

  ${({ theme }) => theme.mq.mobile} {
    width: 100%;
    max-width: 350px;
    padding: 30px 20px;
    min-height: auto;
  }
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

  ${({ theme }) => theme.mq.mobile} {
    width: 100%;
    max-width: 350px;
    padding: 30px  20px ;
    min-height: auto;
  }
`;

const AuthTemplate = ({ children }) => (
  <StyledWrapper>
    <StyledLogo src={logoImg} alt="FavNote logo" />
    <StyledHeading>Your new favorite online notes experience</StyledHeading>
    <StyledAuthCard>{children}</StyledAuthCard>
  </StyledWrapper>
);

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthTemplate;
