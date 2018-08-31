import * as React from 'react';
import { PulseLoader } from 'react-spinners';
import styled from 'styled-components';

interface Props extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
}

export function Button({ loading, children, ...rest }: Props) {
  return (
    <button {...rest}>
      <PulseLoader
        loading={loading}
        color="#fff"
        size={8}
      />
      {!loading && children}
    </button>
  );
}

const StyledButton = styled(Button)`
  border: none;
  margin: 12px 0;
  padding: 12px;
  background-color: #333;
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #444;
  }

  &:focus, &:active {
    outline: none;
  }
`;

export default StyledButton;
