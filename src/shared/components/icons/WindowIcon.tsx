import WindowSVG from '@/../public/svg/windows.svg';

type WindowsIconProps = {
  className?: string;
  width?: number;
  height?: number;
};

export const WindowsIcon = ({ className, width = 40, height = 28 }: WindowsIconProps) => {
  return <WindowSVG className={className} width={width} height={height} viewBox="0 0 80 48" />;
};
