import * as React from 'react';
import { Container } from '@app/ui';

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <Container size="large">
      {props.children}
    </Container>
  );
}
