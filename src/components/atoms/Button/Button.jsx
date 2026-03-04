import styled, { css } from "styled-components";

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$') && prop !== 'activeColor',
})`
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
    theme[$activeColor] || theme.note};

  ${({ $secondary }) =>
    $secondary &&
    css`
      background-color: ${({ theme }) => theme.grey200};
      width: 105px;
      height: 30px;
      font-size: 10px;
    `}

  ${({ $subtle }) =>
    $subtle &&
    css`
      background: none;
      border: none;
      color: ${({ theme }) => theme.grey300};
      text-decoration: underline;
      width: auto;
      height: auto;
      padding: 0;
      font-size: 12px;
      text-transform: lowercase;

      &:hover {
        background: none;
        color: ${({ theme }) => theme.black};
      }
    `}
`;

export default Button;
