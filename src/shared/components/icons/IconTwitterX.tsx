import TwitterXSVG from '@/../public/svg/twitter-x.svg';
import { SVGIconProps } from '@/shared/types/icon';

const IconTwitterX = ({ className, width = 40, height = 28 }: SVGIconProps) => {
  return <TwitterXSVG className={className} width={width} height={height} />;
};

export default IconTwitterX;
