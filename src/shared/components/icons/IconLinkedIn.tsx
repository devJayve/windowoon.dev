import LinkedInSVG from '@/../public/svg/linkedin.svg';
import { SVGIconProps } from '@/shared/types/icon';

const IconLinkedIn = ({ className, width = 40, height = 28 }: SVGIconProps) => {
  return <LinkedInSVG className={className} width={width} height={height} />;
};

export default IconLinkedIn;
