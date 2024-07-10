import { useState, useEffect } from 'react';

export const MAGNIFIER_SIZE = 150;
export const ZOOM_LEVEL = 2;

export interface PositionState {
  mouseX: number;
  mouseY: number;
  x: number;
  y: number;
}

export const useImageMagnifierEvents = () => {
  const [zoomable, setZoomable] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState<PositionState>({ mouseX: 0, mouseY: 0, x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleMouseEnter = () => {
      setZoomable(true);
    };

    const handleMouseLeave = () => {
      setZoomable(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { offsetX, offsetY, target } = e;
      if (target instanceof HTMLImageElement) {
        const { width, height } = target;
        setImageSize({ width, height });
        setPosition({
          mouseX: offsetX - MAGNIFIER_SIZE / 2,
          mouseY: offsetY - MAGNIFIER_SIZE / 2,
          x: offsetX,
          y: offsetY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return {
    zoomable,
    imageSize,
    position,
    handleMouseEnter: () => setZoomable(true),
    handleMouseLeave: () => setZoomable(false),
    handleMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { offsetX, offsetY, target } = e.nativeEvent;
      if (target instanceof HTMLImageElement) {
        const { width, height } = target;
        setImageSize({ width, height });
        setPosition({
          mouseX: offsetX - MAGNIFIER_SIZE / 2,
          mouseY: offsetY - MAGNIFIER_SIZE / 2,
          x: offsetX,
          y: offsetY,
        });
      }
    },
  };
};
