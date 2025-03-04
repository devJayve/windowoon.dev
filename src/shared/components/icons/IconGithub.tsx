import GithubSVG from '@/../public/svg/github.svg';
import { SVGIconProps } from '@/shared/types/icon';

const IconGithub = ({ className, width = 40, height = 28 }: SVGIconProps) => {
  return <GithubSVG className={className} width={width} height={height} />;
};

export default IconGithub;
