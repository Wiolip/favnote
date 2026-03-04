import styled from 'styled-components';

const StyledButton = styled.button`
  width: 67px;
  height: 67px;
  border-radius: 20px;
  border: none;
  background-color: ${({ $active }) => ($active ? 'white' : 'transparent')};
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background-color: white;
  }

  &:not(.active):hover {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  img {
    width: 50%;
    height: 50%;
  }
`;

const ButtonIcon = ({ icon, $active = false, ...props }) => (
  <StyledButton $active={$active} {...props}>
    <img src={icon} alt="icon" />
  </StyledButton>
);

export default ButtonIcon;
