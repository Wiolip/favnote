import styled from 'styled-components';
import magnifierIcon from '../../../assets/icons/magnifier.svg?url';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledInput = styled.input`
  padding: 15px 30px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  border-radius: 50px;
  width: 200px;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey300};
  }

  ${({ $search }) =>
    $search &&
    `
    padding-left: 40px;
  `}
`;

const Icon = styled.img`
  position: absolute;
  top: 50%;
  left: 15px;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Input = ({ $search, ...props }) => (
  <Wrapper>
    {$search && <Icon src={magnifierIcon} alt='search' />}
    <StyledInput $search={$search} {...props} />
  </Wrapper>
);

export default Input;
