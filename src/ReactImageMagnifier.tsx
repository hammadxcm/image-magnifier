'use client';
import React from 'react';
import { useState, MouseEvent } from 'react';

interface ReactImageMagnifierProps {
  imageSrc: string;
}

const ReactImageMagnifier: React.FC<ReactImageMagnifierProps> = ({ imageSrc }) => {
  const MAGNIFIER_SIZE = 300;
  const ZOOM_LEVEL = 2.5;


  const [zoomable, setZoomable] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  });

  const handleMouseEnter = (e: MouseEvent) => {
    const element = e.currentTarget;
    const { width, height } = element?.getBoundingClientRect();
    setImageSize({ width, height });
    setZoomable(true);
    updatePosition(e);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    setZoomable(false);
    updatePosition(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    updatePosition(e);
  };

  const updatePosition = (e: MouseEvent) => {
    const { left, top } = e?.currentTarget?.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    });
  };

  const fileName = (imageSrc: string) => {
    return imageSrc?.split('/')?.pop();
  };

  if (typeof window === 'undefined') {
    // Render a static version or placeholder for SSR
    return (
      <div className='relative overflow-hidden'>
        <img
          key={`magnifier-${fileName(imageSrc)}`}
          className="object-cover z-10"
          alt={`magnifier-${fileName(imageSrc)}`}
          src={imageSrc}
          sizes="(max-width: 700px) 100vw, (max-width: 300px) 100vw, 700px"
          style={{
            width: '500px',
            height: '500px',
          }}
          width="500"
          height="500"
        />
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center'>
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        className='relative overflow-hidden'
      >
        <img
          key={`magnifier-${fileName(imageSrc)}`}
          className='object-cover z-10'
          alt={`${fileName(imageSrc)}`}
          src={imageSrc}
          sizes='(max-width: 700px) 100vw, (max-width: 300px) 100vw, 700px'
          style={{
            width: '500px',
            height: '500px',
          }}
          width={500}
          height={500}
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
          className='z-50 border-4 rounded-full pointer-events-none absolute border-gray-500'
        />
      </div>
    </div>
  );
};

export default ReactImageMagnifier;
