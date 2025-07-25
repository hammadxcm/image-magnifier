'use client';
import { useState, useCallback, useRef, useEffect } from 'react';

export interface Position {
  x: number;
  y: number;
  mouseX: number;
  mouseY: number;
}

export interface ImageSize {
  width: number;
  height: number;
}

export interface UseMagnifierOptions {
  magnifierSize: number;
  zoomLevel: number;
  disabled: boolean;
  smoothAnimations: boolean;
  performanceMode: boolean;
  onMagnifierShow?: () => void;
  onMagnifierHide?: () => void;
}

export const useMagnifier = (options: UseMagnifierOptions) => {
  const {
    magnifierSize,
    zoomLevel,
    disabled,
    smoothAnimations,
    performanceMode,
    onMagnifierShow,
    onMagnifierHide,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 0, height: 0 });
  const [position, setPosition] = useState<Position>({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastUpdateTime = useRef<number>(0);

  const updateImageSize = useCallback(() => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageSize({ width, height });
    }
  }, []);

  const updatePosition = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current || disabled) return;

    const currentTime = performance.now();
    if (performanceMode && currentTime - lastUpdateTime.current < 16) return; // 60fps throttle
    
    lastUpdateTime.current = currentTime;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX || 0 : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY || 0 : (e as React.MouseEvent).clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Keep magnifier within bounds
    const halfSize = magnifierSize / 2;
    const clampedX = Math.max(halfSize, Math.min(x, rect.width - halfSize));
    const clampedY = Math.max(halfSize, Math.min(y, rect.height - halfSize));
    
    const newPosition = {
      x: -x * zoomLevel + halfSize,
      y: -y * zoomLevel + halfSize,
      mouseX: clampedX - halfSize,
      mouseY: clampedY - halfSize,
    };

    if (smoothAnimations && !performanceMode) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() => {
        setPosition(newPosition);
      });
    } else {
      setPosition(newPosition);
    }
  }, [magnifierSize, zoomLevel, disabled, smoothAnimations, performanceMode]);

  const showMagnifier = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (disabled || !isImageLoaded) return;
    
    updateImageSize();
    setIsVisible(true);
    updatePosition(e);
    onMagnifierShow?.();
  }, [disabled, isImageLoaded, updateImageSize, updatePosition, onMagnifierShow]);

  const hideMagnifier = useCallback(() => {
    if (disabled) return;
    
    setIsVisible(false);
    onMagnifierHide?.();
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [disabled, onMagnifierHide]);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
    updateImageSize();
  }, [updateImageSize]);

  const handleImageError = useCallback(() => {
    setIsImageLoaded(false);
  }, []);

  useEffect(() => {
    if (isImageLoaded) {
      const handleResize = () => updateImageSize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isImageLoaded, updateImageSize]);

  return {
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
  };
};