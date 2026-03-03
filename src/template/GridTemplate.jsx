import React, { useState } from 'react'; // Dodany useState
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContext from '@/context/PageContext';
import UserPageTemplate from './UserPageTemplate';
import Input from '@/components/atoms/Input/Input';
import Heading from '@/components/atoms/Heading/Heading';
import Paragraph from '@/components/atoms/Paragraph/Paragraph';
import ButtonIcon from '@/components/atoms/ButtonIcon/ButtonIcon';
import NewItemBar from '@/components/organisms/NewItemBar/NewItemBar'; // Dodany import
import plusIcon from '@/assets/icons/plus.svg?url';

const StyledWrapper = styled.div`
  padding: 25px 150px 25px 70px;
  position: relative;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 85px;

  @media (max-width: 1500px) {
    grid-gap: 45px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledButtonIcon = styled(ButtonIcon)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: ${({ activecolor, theme }) => theme[activecolor]};
  background-size: 35%;
  border-radius: 50px;
  z-index: 100;
  cursor: pointer;
`;

const GridTemplate = ({ children, pageType }) => {

  const [isNewItemBarVisible, setIsNewItemBarVisible] = useState(false);

  const toggleNewItemBar = () => {
    setIsNewItemBarVisible(!isNewItemBarVisible);
  };

  return (
    <PageContext.Provider value={pageType}>
      <UserPageTemplate pageType={pageType}>
        <StyledWrapper>
          <StyledPageHeader>
            <Input $search placeholder="Search" />
            <StyledHeading $big as="h1">
              {pageType}
            </StyledHeading>
            <StyledParagraph>6 {pageType}</StyledParagraph>
          </StyledPageHeader>
          <StyledGrid>{children}</StyledGrid>

          <StyledButtonIcon
            onClick={toggleNewItemBar}
            icon={plusIcon}
            activecolor={pageType}
          />
          <NewItemBar
            handleClose={toggleNewItemBar}
            isVisible={isNewItemBarVisible}
          />
        </StyledWrapper>
      </UserPageTemplate>
    </PageContext.Provider>
  );
};

GridTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']),
};

GridTemplate.defaultProps = {
  pageType: 'notes',
};

export default GridTemplate;
