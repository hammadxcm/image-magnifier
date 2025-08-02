'use client';
import React from 'react';
import { useImageMagnifier } from './hooks/useImageMagnifier';

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
  
  borderColor?: string;
  borderWidth?: number;
  smooth?: boolean;
  disabled?: boolean;
  magnifierShape?: 'circle' | 'square';
  
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
  
  borderColor = 'rgba(255, 255, 255, 0.8)',
  borderWidth = 3,
  smooth = true,
  disabled = false,
  magnifierShape = 'circle',
  
}) => {
  const {
    isVisible,
    imageSize,
    position,
    isImageLoaded,
    imageRef,
    containerRef,
    showMagnifier,
    hideMagnifier,
    updatePosition,
    handleImageLoad,
    handleImageError,
    isLoading,
    hasError,
  } = useImageMagnifier({ 
    magnifierSize,
    zoomLevel,
    disabled,
    smoothAnimations: smooth,
    performanceMode: false,
  });

  

  

  if (!imageSrc) {
    return null;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center w-full h-full text-gray-500">Loading image...</div>;
  }

  if (hasError) {
    return <div className="flex justify-center items-center w-full h-full text-red-500">Error loading image.</div>;
  }

  return (
    <div className={className}>
      <div
        ref={containerRef}
        onMouseEnter={showMagnifier}
        onMouseLeave={hideMagnifier}
        onMouseMove={updatePosition}
        className={`relative overflow-hidden ${!disabled ? 'cursor-crosshair' : 'cursor-default'}`}
        tabIndex={disabled ? -1 : 0}
        role="img"
        aria-label={imageAlt || `Magnifiable image: ${imageSrc.split('/').pop() || 'image'}`}
      >
        <img
          ref={imageRef}
          key={`magnifier-${imageSrc.split('/').pop() || 'image'}`}
          className={imageClassName}
          alt={imageAlt || imageSrc.split('/').pop() || 'image'}
          src={imageSrc}
          sizes={imageSizes}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            display: 'block',
          }}
          width={imageWidth}
          height={imageHeight}
          draggable={false}
        />
        
        {/* Magnifier Lens */}
        {!disabled && (
          <div
            className={`absolute rounded-full pointer-events-none z-50 shadow-lg backdrop-blur-sm ${className}`}
            style={{
              display: isVisible && isImageLoaded ? 'block' : 'none',
              top: `${position.mouseY}px`,
              left: `${position.mouseX}px`,
              width: `${magnifierSize}px`,
              height: `${magnifierSize}px`,
              border: `${borderWidth}px solid ${borderColor}`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.8)',
              transition: smooth ? 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out' : 'none',
            }}
            aria-hidden="true"
          >
            <div 
              className={`w-full h-full bg-no-repeat ${magnifierShape === 'circle' ? 'rounded-full' : 'rounded-none'}`}
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: `${imageSize.width * zoomLevel}px ${imageSize.height * zoomLevel}px`,
                backgroundPosition: `${position.x}px ${position.y}px`,
              }}
            />
            
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactImageMagnifier;
