import styled from 'styled-components';

const sizes = {
  small: '300px',
  medium: '600px',
  large: '880px',
};

interface Props {
  size: keyof typeof sizes;
}

export const Container = styled.div<Props>`
  max-width: ${(props) => sizes[props.size]};
  margin: 0 auto;
  height: 100%;
`;

export default Container;
