import styled from 'styled-components';

export const Input = styled.input`
  border: none;
  border-bottom: 2px solid #ddd;
  width: 100%;
  padding: 12px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border: none;
    border-bottom: 2px solid #333;
  }
`;

export default Input;
