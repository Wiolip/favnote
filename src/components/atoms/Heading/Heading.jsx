import styled from 'styled-components';

const Heading = styled.h1`
  font-size: ${({ theme, $big }) =>
    $big ? theme.fontSize.xl : theme.fontSize.l};
  font-weight: ${({ theme }) => theme.bold};

  &::first-letter {
    text-transform: uppercase;
  }
`;

export default Heading;
