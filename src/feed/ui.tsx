import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

interface Props extends LinkProps {
  to: string;
  active?: boolean;
}

function Category({ to, ...rest }: Props) {
  return (
    <Link
      {...rest}
      to={{
        search: `?category=${to}`,
      }}
    />
  );
}

const StyledCategory = styled(Category)`
  color: ${(props) => props.active ? '#333' : '#aaa'};
  font-weight: ${(props) => props.active ? 'bold' : 'normal'};
  text-decoration: none;
  margin: 12px;

  &:hover {
    color: '#333';
    font-weight: ${(props) => props.active ? 'bold' : 'normal'};
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 18px;
  color: transparent;
  text-shadow: 0 0 0 white;
  cursor: pointer;
`;

export { StyledCategory as Category, CloseButton };
