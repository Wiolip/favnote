import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Input from '@/components/ui/Input/Input';
import Heading from '@/components/ui/Heading/Heading';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  padding: 25px 50px 25px 50px;


  ${({ theme }) => theme.mq.tabletLandscape} {
    padding: 25px 30px 25px 30px;
  }

  ${({ theme }) => theme.mq.mobile} {
    padding: 25px 20px 100px 20px;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 45px;

  ${({ theme }) => theme.mq.tabletLandscape} {
    grid-template-columns: repeat(2, 1fr);

  }

  ${({ theme }) => theme.mq.mobile} {
    grid-template-columns: 1fr;
    
  }
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;

  ${({ theme }) => theme.mq.mobile} {
    margin: 10px 0 30px 0;

    input {
      width: 100%;
    }
  }
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;
  text-transform: capitalize;

  ${({ theme }) => theme.mq.mobile} {
    font-size: 3rem;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const GridTemplate = ({
  children,
  searchValue,
  onSearchChange,
  itemsCount,
}) => {
  const { pathname } = useLocation();

  const getPageType = () => {
    if (pathname.includes('notes')) return 'notes';
    if (pathname.includes('twitters')) return 'twitters';
    if (pathname.includes('articles')) return 'articles';
    return 'notes';
  };

  const pageType = getPageType();
  const displayNames = {
    notes: 'notes',
    twitters: 'x-posts',
    articles: 'articles',
  };

  return (
    <StyledWrapper>
      <Sidebar />
      <StyledPageHeader>
        <Input
          $search
          placeholder="Search"
          value={searchValue}
          onChange={onSearchChange}
        />
        <StyledHeading as="h1" $big>
          {displayNames[pageType]}
        </StyledHeading>
        <StyledParagraph>
          {itemsCount} {displayNames[pageType]}
        </StyledParagraph>
      </StyledPageHeader>
      <StyledGrid>{children}</StyledGrid>
    </StyledWrapper>
  );
};

GridTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridTemplate;
