import styled from 'styled-components';

interface Props {
  direction: 'column' | 'row';
  wrap?: boolean;
  fill?: boolean;
}

export const LinearLayout = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  flex-wrap: ${(props) => props.wrap ? 'wrap' : 'nowrap'};
  height: ${(props) => props.fill ? '100%' : 'auto'};
`;

export default LinearLayout;
