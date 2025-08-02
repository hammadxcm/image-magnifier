'use client';
import React from 'react';
import { useCallback, useId, useMemo, useState } from 'react';
import { useMagnifierContext } from './MagnifierContext';
import { useImageMagnifier } from './hooks/useImageMagnifier';
import { useTouch } from './hooks/useTouch';

export type MagnifierPosition = 'follow' | 'fixed-top-right' | 'fixed-top-left' | 'fixed-bottom-right' | 'fixed-bottom-left';
export type CursorStyle = 'crosshair' | 'zoom-in' | 'grab' | 'pointer' | 'none';

export interface ReactImageMagnifierAdvancedProps {
  imageSrc: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSizes?: string;
  imageClassName?: string;
  className?: string;
  
  // Magnifier settings
  magnifierSize?: number;
  zoomLevel?: number;
  minZoom?: number;
  maxZoom?: number;
  
  // Positioning
  position?: MagnifierPosition;
  cursorStyle?: CursorStyle;
  
  // Styling
  theme?: string;
  customTheme?: Partial<import('./MagnifierContext').MagnifierTheme>;
  magnifierClassName?: string;
  magnifierShape?: 'circle' | 'square';
  
  // Behavior
  disabled?: boolean;
  smoothTransitions?: boolean;
  showZoomControls?: boolean;
  showMiniMap?: boolean;
  enableKeyboard?: boolean;
  enableTouch?: boolean;
  
  // Performance
  performanceMode?: boolean;
  preloadImage?: boolean;
  
  // Callbacks
  onMagnifierShow?: () => void;
  onMagnifierHide?: () => void;
  onZoomChange?: (zoom: number) => void;
  
  // Advanced features
  overlayContent?: React.ReactNode;
  watermark?: string | React.ReactNode;
}

const ReactImageMagnifierAdvanced: React.FC<ReactImageMagnifierAdvancedProps> = ({
  imageSrc,
  imageAlt,
  imageWidth = 500,
  imageHeight = 500,
  imageSizes = '(max-width: 700px) 100vw, (max-width: 300px) 100vw, 700px',
  imageClassName = 'object-cover',
  className = 'flex justify-center items-center',
  
  magnifierSize = 300,
  zoomLevel: initialZoomLevel = 2.5,
  minZoom = 1.5,
  maxZoom = 5,
  
  position = 'follow',
  cursorStyle = 'crosshair',
  
  theme,
  customTheme,
  magnifierClassName = '',
  magnifierShape = 'circle',
  
  disabled = false,
  smoothTransitions = true,
  showZoomControls = false,
  showMiniMap = false,
  enableKeyboard = true,
  enableTouch = true,
  
  performanceMode = false,
  preloadImage = true,
  
  onMagnifierShow,
  onMagnifierHide,
  onZoomChange,
  
  overlayContent,
  watermark,
}) => {
  const componentId = useId();
  const { activeMagnifierId, setActiveMagnifierId, globalSettings, getTheme } = useMagnifierContext();
  
  const [currentZoom, setCurrentZoom] = useState(initialZoomLevel);
  const isActive = activeMagnifierId === componentId;
  
  const effectiveTheme = useMemo(() => {
    const baseTheme = getTheme(theme);
    return customTheme ? { ...baseTheme, ...customTheme } : baseTheme;
  }, [getTheme, theme, customTheme]);

  const magnifierOptions = useMemo(() => ({
    magnifierSize,
    zoomLevel: currentZoom,
    disabled: disabled,
    smoothAnimations: smoothTransitions && globalSettings.smoothAnimations,
    performanceMode: performanceMode || globalSettings.performanceMode,
    onMagnifierShow: () => {
      setActiveMagnifierId(componentId);
      onMagnifierShow?.();
    },
    onMagnifierHide: () => {
      if (isActive) setActiveMagnifierId(null);
      onMagnifierHide?.();
    },
  }), [
    magnifierSize,
    currentZoom,
    disabled,
    globalSettings,
    smoothTransitions,
    performanceMode,
    componentId,
    isActive,
    setActiveMagnifierId,
    onMagnifierShow,
    onMagnifierHide,
  ]);

  const {
    isVisible,
    imageSize,
    position: magnifierPosition,
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
  } = useImageMagnifier(magnifierOptions);

  const touchOptions = useMemo(() => ({
    enabled: enableTouch && globalSettings.touchEnabled,
    minZoom,
    maxZoom,
    onGesture: ({ scale }: { scale: number }) => {
      setCurrentZoom(scale);
      onZoomChange?.(scale);
    },
  }), [enableTouch, globalSettings.touchEnabled, minZoom, maxZoom, onZoomChange]);

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useTouch(touchOptions);

  const handleZoomChange = useCallback((delta: number) => {
    const newZoom = Math.max(minZoom, Math.min(maxZoom, currentZoom + delta));
    setCurrentZoom(newZoom);
    onZoomChange?.(newZoom);
  }, [currentZoom, minZoom, maxZoom, onZoomChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!enableKeyboard || !isVisible) return;
    
    switch (e.key) {
      case '+':
      case '=':
        e.preventDefault();
        handleZoomChange(0.25);
        break;
      case '-':
        e.preventDefault();
        handleZoomChange(-0.25);
        break;
      case 'Escape':
        e.preventDefault();
        hideMagnifier();
        break;
    }
  }, [enableKeyboard, isVisible, handleZoomChange, hideMagnifier]);

  const getFixedPosition = useCallback(() => {
    if (position === 'follow') return {};
    
    const positions: Record<string, Record<string, number>> = {
      'fixed-top-right': { top: 20, right: 20 },
      'fixed-top-left': { top: 20, left: 20 },
      'fixed-bottom-right': { bottom: 20, right: 20 },
      'fixed-bottom-left': { bottom: 20, left: 20 },
    };
    
    return positions[position] || {};
  }, [position]);

  

  

  const cursorStyles = useMemo(() => ({
    cursor: disabled ? 'default' : cursorStyle,
  }), [disabled, cursorStyle]);

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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        className="relative overflow-hidden focus:outline-none"
        style={cursorStyles}
        tabIndex={enableKeyboard && !disabled ? 0 : -1}
        role="img"
        aria-label={imageAlt || `Magnifiable image: ${imageSrc.split('/').pop() || 'image'}`}
      >
        {preloadImage && (
          <link rel="preload" as="image" href={imageSrc} />
        )}
        
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

        {/* Watermark */}
        {watermark && (
          <div className="absolute bottom-2 right-2 opacity-50 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            {watermark}
          </div>
        )}

        {/* Overlay Content */}
        {overlayContent && (
          <div className="absolute inset-0 pointer-events-none">
            {overlayContent}
          </div>
        )}

        {/* Zoom Controls */}
        {showZoomControls && !disabled && (
          <div className="absolute top-2 left-2 flex flex-col gap-1 bg-white bg-opacity-90 rounded p-1">
            <button
              onClick={() => handleZoomChange(0.25)}
              className="w-6 h-6 flex items-center justify-center text-sm hover:bg-gray-200 rounded"
              disabled={currentZoom >= maxZoom}
            >
              +
            </button>
            <span className="text-xs text-center">{currentZoom.toFixed(1)}x</span>
            <button
              onClick={() => handleZoomChange(-0.25)}
              className="w-6 h-6 flex items-center justify-center text-sm hover:bg-gray-200 rounded"
              disabled={currentZoom <= minZoom}
            >
              -
            </button>
          </div>
        )}

        {/* Mini Map */}
        {showMiniMap && isVisible && (
          <div className="absolute top-2 right-2 w-20 h-20 border border-white bg-black bg-opacity-50 rounded">
            <img
              src={imageSrc}
              alt="Mini map"
              className="w-full h-full object-cover opacity-70"
            />
            <div
              className="absolute border border-red-500"
              style={{
                width: `${Math.min(100, (magnifierSize / imageSize.width) * 100)}%`,
                height: `${Math.min(100, (magnifierSize / imageSize.height) * 100)}%`,
                left: `${Math.max(0, Math.min(100, ((magnifierPosition.mouseX + magnifierSize/2) / imageSize.width) * 100))}%`,
                top: `${Math.max(0, Math.min(100, ((magnifierPosition.mouseY + magnifierSize/2) / imageSize.height) * 100))}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
        )}
      </div>

      {/* Magnifier Lens */}
      {!disabled && (
        <div
          className={`magnifier-lens ${magnifierClassName} ${isActive || !activeMagnifierId ? 'block' : 'hidden'} ${magnifierShape === 'circle' ? 'rounded-full' : 'rounded-none'} pointer-events-none z-50 shadow-lg backdrop-blur-sm`}
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            border: `${effectiveTheme.borderWidth}px solid ${effectiveTheme.borderColor}`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.8)',
            transition: smoothTransitions ? 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out' : 'none',
            position: position === 'follow' ? 'absolute' : 'fixed',
            top: position === 'follow' ? `${magnifierPosition.mouseY}px` : getFixedPosition().top,
            left: position === 'follow' ? `${magnifierPosition.mouseX}px` : getFixedPosition().left,
            right: position === 'follow' ? 'auto' : getFixedPosition().right,
            bottom: position === 'follow' ? 'auto' : getFixedPosition().bottom,
          }}
          aria-hidden="true"
        >
          <div 
            className={`w-full h-full bg-no-repeat ${magnifierShape === 'circle' ? 'rounded-full' : 'rounded-none'}`}
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: `${imageSize.width * currentZoom}px ${imageSize.height * currentZoom}px`,
              backgroundPosition: `${magnifierPosition.x}px ${magnifierPosition.y}px`,
            }}
          />
          
          
        </div>
      )}
    </div>
  );
};

export default ReactImageMagnifierAdvanced;