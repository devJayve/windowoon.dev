import InstagramSVG from '@/../public/svg/instagram.svg';
import { SVGIconProps } from '@/shared/types/icon';

const IconInstagram = ({ className, width = 40, height = 28 }: SVGIconProps) => {
  return <InstagramSVG className={className} width={width} height={height} />;
};

export default IconInstagram;
