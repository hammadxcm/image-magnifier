import React from 'react';
import Image from 'next/image';
import { useImageMagnifierEvents } from './useImageMagnifierEvents';
import { MAGNIFIER_SIZE, ZOOM_LEVEL } from './useImageMagnifierEvents';

interface ReactImageMagnifierProps {
  imageSrc: string;
}

const ReactImageMagnifier: React.FC<ReactImageMagnifierProps> = ({ imageSrc }) => {
  const {
    zoomable,
    imageSize,
    position,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
  } = useImageMagnifierEvents();

  const fileName = (imageSrc: string) => {
    return imageSrc?.split('/')?.pop();
  }

  return (
    <div className='flex justify-center items-center'>
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        className='w-80 h-96 relative overflow-hidden'>
        <Image
          key={`magnifier-${fileName(imageSrc)}`}
          className='object-cover border z-10'
          alt={`magnifier-${fileName(imageSrc)}`}
          src={imageSrc}
          fill
        />
        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${imageSize.height * ZOOM_LEVEL}px`,
            backgroundRepeat: 'no-repeat',
            display: zoomable ? 'block' : 'none',
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${MAGNIFIER_SIZE}px`,
            height: `${MAGNIFIER_SIZE}px`,
          }}
          className={`z-50 border-4 rounded-full pointer-events-none absolute border-gray-500`}
        />
      </div>
    </div>
  );
};

export default ReactImageMagnifier;
