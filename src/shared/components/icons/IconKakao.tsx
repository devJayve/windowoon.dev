import KakaoSVG from '@/../public/svg/kakaotalk.svg';
import { SVGIconProps } from '@/shared/types/icon';

const IconKakao = ({ className, width = 40, height = 28 }: SVGIconProps) => {
  return <KakaoSVG className={className} width={width} height={height} />;
};

export default IconKakao;
