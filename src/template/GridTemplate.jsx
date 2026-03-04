import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Input from '@/components/ui/Input/Input';
import Heading from '@/components/ui/Heading/Heading';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  padding: 25px 150px 25px 200px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 85px;
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;
  text-transform: capitalize;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const GridTemplate = ({ children }) => {
  const { pathname } = useLocation(); // 2. Pobieramy aktualną ścieżkę

  // 3. Logika rozpoznawania typu strony (identyczna jak w Sidebarze)
  const getPageType = () => {
    if (pathname.includes('notes')) return 'notes';
    if (pathname.includes('twitters')) return 'twitters';
    if (pathname.includes('articles')) return 'articles';
    return 'notes';
  };

  const pageType = getPageType();

  return (
    <StyledWrapper>
      <Sidebar />
      <StyledPageHeader>
        <Input search placeholder="Search" />
        <StyledHeading as="h1" $big>
          {pageType}
        </StyledHeading>
        <StyledParagraph>6 {pageType}</StyledParagraph>
      </StyledPageHeader>
      <StyledGrid>{children}</StyledGrid>
    </StyledWrapper>
  );
};

GridTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridTemplate;
