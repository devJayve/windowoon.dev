import Image from 'next/image';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type MDXImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 450;

export const MDXImage = ({
  src,
  alt = '',
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  className,
  ...props
}: MDXImageProps) => {
  if (!src) return null;
  const imageWidth = typeof width === 'string' ? parseInt(width, 10) : width;
  const imageHeight = typeof height === 'string' ? parseInt(height, 10) : height;

  // 외부 이미지 URL인 경우
  if (src.startsWith('http')) {
    return (
      <Image
        src={src}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        className={className}
        loading="lazy"
        {...props}
      />
    );
  }
  // 로컬 이미지인 경우 (public 디렉토리 기준)
  return (
    <Image
      src={`/images/${src}`}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};
