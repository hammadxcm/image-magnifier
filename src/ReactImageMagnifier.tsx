'use client';
import 'styles/globals.css';
import React from 'react';
import { useState, MouseEvent } from 'react';

interface ReactImageMagnifierProps {
  imageSrc: string;
  magnifierSize?: number;
  zoomLevel?: number;
  imageClassName?: string;
  imageAlt?: string;
  imageSizes?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
}

const ReactImageMagnifier: React.FC<ReactImageMagnifierProps> = ({
  imageSrc,
  magnifierSize = 300,
  zoomLevel = 2.5,
  imageClassName = 'object-cover z-10',
  imageAlt,
  imageSizes = '(max-width: 700px) 100vw, (max-width: 300px) 100vw, 700px',
  imageWidth = 500,
  imageHeight = 500,
  className = 'flex justify-center items-center',
}) => {
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
    const { width, height } = element.getBoundingClientRect();
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
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setPosition({
      x: -x * zoomLevel + magnifierSize / 2,
      y: -y * zoomLevel + magnifierSize / 2,
      mouseX: x - magnifierSize / 2,
      mouseY: y - magnifierSize / 2,
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
          className={imageClassName}
          alt={imageAlt || `magnifier-${fileName(imageSrc)}`}
          src={imageSrc}
          sizes={imageSizes}
          style={{
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
          }}
          width={imageWidth}
          height={imageHeight}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        className='relative overflow-hidden'
      >
        <img
          key={`magnifier-${fileName(imageSrc)}`}
          className={imageClassName}
          alt={imageAlt || `${fileName(imageSrc)}`}
          src={imageSrc}
          sizes={imageSizes}
          style={{
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
          }}
          width={imageWidth}
          height={imageHeight}
        />
        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${imageSize.width * zoomLevel}px ${imageSize.height * zoomLevel}px`,
            backgroundRepeat: 'no-repeat',
            display: zoomable ? 'block' : 'none',
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
          }}
          className='z-50 border-4 rounded-full pointer-events-none absolute border-gray-500'
        />
      </div>
    </div>
  );
};

export default ReactImageMagnifier;
