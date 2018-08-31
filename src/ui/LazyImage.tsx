import * as React from 'react';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

const sizes: { [key: string ]: number} = {
  small: 100,
  medium: 270,
  large: 600,
};

interface ContainerProps { size: string; cover?: boolean; }
export const Container = styled.div<ContainerProps>`
  width: ${(props) => sizes[props.size]}px;
  height: ${(props) => sizes[props.size]}px;
  margin: 8px;
  background-color: ${(props) => props.cover ? '#ddd' : 'transparent'};
`;

type ImageProps = { cover?: boolean } & React.ImgHTMLAttributes<HTMLImageElement>;
export const Image = styled.img<ImageProps>`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => props.cover ? 'cover' : 'contain'};
  cursor: ${(props) => props.onClick ? 'pointer' : 'default'};

  &:hover {
    filter: ${(props) => props.onClick ? 'brightness(60%)' : 'none'};
  }
`;

type Props = React.ImgHTMLAttributes<HTMLImageElement> & ContainerProps & ImageProps;

export const LazyImage: React.SFC<Props> = (props) => {
  return (
    <Container size={props.size} cover={props.cover}>
      <LazyLoad height={sizes[props.size]}>
        <Image {...props} />
      </LazyLoad>
    </Container>
  );
};

LazyImage.displayName = 'LazyImage';

export default LazyImage;
