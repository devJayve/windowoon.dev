import WindowSVG from '@/../public/svg/windows.svg';
import { SVGIconProps } from '@/shared/types/icon';

const IconWindow = ({ className, width = 40, height = 28 }: SVGIconProps) => {
  return <WindowSVG className={className} width={width} height={height} viewBox="0 0 80 48" />;
};

export default IconWindow;
