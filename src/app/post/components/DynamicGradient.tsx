import { CSSProperties } from 'react';

//TODO::블로그 배포 이후 보완
const DynamicGradient = () => {
  const baseCircleStyle: CSSProperties = {
    position: 'absolute',
    width: '15em',
    height: '15em',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 70% 50%, #FFD12B, #000)',
  };

  return (
    <div className="fixed inset-0 -z-50 h-screen w-screen overflow-hidden">
      <div style={baseCircleStyle} />
    </div>
  );
};

export default DynamicGradient;
