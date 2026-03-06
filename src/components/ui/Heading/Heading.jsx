import styled from 'styled-components';

const Heading = styled.h1`
  font-size: ${({ theme, $big }) =>
    $big ? theme.fontSize.xl : theme.fontSize.l};
  font-weight: ${({ theme }) => theme.bold};

  &::first-letter {
    text-transform: uppercase;
  }

  ${({ theme }) => theme.mq.tablet} {
    font-size: ${({ theme, $big }) =>
      $big ? theme.fontSize.l : theme.fontSize.m};

  }

  ${({ theme }) => theme.mq.phone} {
    font-size: ${({ theme, $big }) =>
      $big ? theme.fontSize.m : theme.fontSize.s};
    
  }
`;

export default Heading;
