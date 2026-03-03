import styled, { css } from "styled-components";

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$") && prop !== "activeColor",
})`
  padding: 0;
  border: none;
  border-radius: 50px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  width: 220px;
  height: 47px;
  font-size: 16px;

  background-color: ${({ theme, activeColor }) =>
    theme[activeColor] || theme.primary};

  ${({ $secondary }) =>
    $secondary &&
    css`
      background-color: ${({ theme }) => theme.grey200};
      width: 105px;
      height: 30px;
      font-size: 10px;
    `}
`;

export default Button;
