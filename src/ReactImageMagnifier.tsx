'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';

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
  magnifierClassName?: string;
  borderColor?: string;
  borderWidth?: number;
  smooth?: boolean;
  disabled?: boolean;
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
  magnifierClassName = '',
  borderColor = 'rgba(255, 255, 255, 0.8)',
  borderWidth = 3,
  smooth = true,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateImageSize = useCallback(() => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageSize({ width, height });
    }
  }, []);

  useEffect(() => {
    if (isImageLoaded) {
      updateImageSize();
      window.addEventListener('resize', updateImageSize);
      return () => window.removeEventListener('resize', updateImageSize);
    }
  }, [isImageLoaded, updateImageSize]);

  const updatePosition = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || disabled) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Keep magnifier within image bounds
    const halfMagnifier = magnifierSize / 2;
    const clampedX = Math.max(halfMagnifier, Math.min(x, width - halfMagnifier));
    const clampedY = Math.max(halfMagnifier, Math.min(y, height - halfMagnifier));
    
    setPosition({
      x: -x * zoomLevel + halfMagnifier,
      y: -y * zoomLevel + halfMagnifier,
      mouseX: clampedX - halfMagnifier,
      mouseY: clampedY - halfMagnifier,
    });
  }, [magnifierSize, zoomLevel, disabled]);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    if (disabled || !isImageLoaded) return;
    updateImageSize();
    setIsVisible(true);
    updatePosition(e);
  }, [disabled, isImageLoaded, updateImageSize, updatePosition]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    setIsVisible(false);
  }, [disabled]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (disabled || !isVisible) return;
    updatePosition(e);
  }, [disabled, isVisible, updatePosition]);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  const fileName = useCallback((src: string) => {
    return src?.split('/')?.pop() || 'image';
  }, []);

  const magnifierStyles = {
    display: isVisible && isImageLoaded ? 'block' : 'none',
    position: 'absolute' as const,
    top: `${position.mouseY}px`,
    left: `${position.mouseX}px`,
    width: `${magnifierSize}px`,
    height: `${magnifierSize}px`,
    borderRadius: '50%',
    border: `${borderWidth}px solid ${borderColor}`,
    pointerEvents: 'none' as const,
    zIndex: 50,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
    transition: smooth ? 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out' : 'none',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(1px)',
  };

  const lensStyles = {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: `${imageSize.width * zoomLevel}px ${imageSize.height * zoomLevel}px`,
    backgroundPosition: `${position.x}px ${position.y}px`,
    backgroundRepeat: 'no-repeat',
    borderRadius: '50%',
  };

  if (!imageSrc) {
    return null;
  }

  return (
    <div className={className}>
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden ${!disabled ? 'cursor-crosshair' : 'cursor-default'}`}
        role="img"
        aria-label={imageAlt || `Magnifiable image: ${fileName(imageSrc)}`}
      >
        <img
          ref={imageRef}
          key={`magnifier-${fileName(imageSrc)}`}
          className={imageClassName}
          alt={imageAlt || fileName(imageSrc)}
          src={imageSrc}
          sizes={imageSizes}
          onLoad={handleImageLoad}
          onError={() => setIsImageLoaded(false)}
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
            className={`magnifier-lens ${magnifierClassName}`}
            style={magnifierStyles}
            aria-hidden="true"
          >
            <div style={lensStyles} />
            
            {/* Magnifier Handle */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '40px',
                height: '8px',
                backgroundColor: 'rgba(139, 69, 19, 0.9)',
                borderRadius: '4px',
                transform: 'rotate(45deg)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(101, 67, 33, 0.8)',
              }}
            />
            
            {/* Magnifier Grip */}
            <div
              style={{
                position: 'absolute',
                bottom: '-35px',
                right: '-35px',
                width: '25px',
                height: '25px',
                backgroundColor: 'rgba(160, 82, 45, 0.9)',
                borderRadius: '50%',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
                border: '2px solid rgba(101, 67, 33, 0.8)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactImageMagnifier;
