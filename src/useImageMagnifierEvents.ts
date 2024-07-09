import { useState, MouseEvent } from 'react';

interface PositionState {
    x: number;
    y: number;
    mouseX: number;
    mouseY: number;
}

export const MAGNIFIER_SIZE = 100;
export const ZOOM_LEVEL = 2.5;

export const useImageMagnifierEvents = () => {
    const [zoomable, setZoomable] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [position, setPosition] = useState<PositionState>({ x: 0, y: 0, mouseX: 0, mouseY: 0 });

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        let element = e.currentTarget;
        let { width, height } = element.getBoundingClientRect();
        setImageSize({ width, height });
        setZoomable(true);
        updatePosition(e);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        setZoomable(false);
        updatePosition(e);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        updatePosition(e);
    };

    const updatePosition = (e: MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - left;
        let y = e.clientY - top;
        setPosition({
            x: -x * ZOOM_LEVEL + (MAGNIFIER_SIZE / 2),
            y: -y * ZOOM_LEVEL + (MAGNIFIER_SIZE / 2),
            mouseX: x - (MAGNIFIER_SIZE / 2),
            mouseY: y - (MAGNIFIER_SIZE / 2),
        });
    };

    return {
        zoomable,
        imageSize,
        position,
        handleMouseEnter,
        handleMouseLeave,
        handleMouseMove,
    };
};
