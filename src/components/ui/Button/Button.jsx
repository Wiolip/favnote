import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: 0;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  width: 220px;
  height: 47px;
  font-size: 16px;
  color: ${({ theme }) => theme.black};

  background-color: ${({ theme, $activeColor }) =>
    theme[$activeColor] || theme.notes};

  /* Wariant Secondary (np. przycisk REMOVE w Gridzie) */
  ${({ $secondary }) =>
    $secondary &&
    css`
      background-color: ${({ theme }) => theme.grey200};
      width: 105px;
      height: 30px;
      font-size: 10px;
    `}

  /* Wariant Subtle (np. przycisk REMOVE w DetailsPage) */
  ${({ $subtle }) =>
    $subtle &&
    css`
      background: none;
      color: ${({ theme }) => theme.grey300};
      text-decoration: underline;
      width: auto;
      height: auto;
      font-size: 12px;
      text-transform: lowercase;

      &:hover {
        background: none;
        color: ${({ theme }) => theme.black};
      }
    `}
`;

export default Button;
