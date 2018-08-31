import * as React from 'react';
import { Container, LazyImage, LinearLayout, Overlay } from '@app/ui';
import { CloseButton } from '@app/feed/ui';

interface Props {
  id: string;
  goBack(): void;
}

export const Detail: React.SFC<Props> = ({ id, goBack }) => {
  return (
    <Overlay onClick={() => goBack()}>
      <Container size="large">
        <LinearLayout fill direction="column">
          <LinearLayout direction="row">
            <CloseButton>❌</CloseButton>
            <LazyImage src={id} size="large" />
          </LinearLayout>
        </LinearLayout>
      </Container>
    </Overlay>
  );
};

export default Detail;
