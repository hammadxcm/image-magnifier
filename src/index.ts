// Main components
export { default as ReactImageMagnifier } from './ReactImageMagnifier';
export { default as ReactImageMagnifierAdvanced } from './ReactImageMagnifierAdvanced';

// Context and providers
export { MagnifierProvider, useMagnifierContext, themes } from './MagnifierContext';

// Hooks
export { useMagnifier } from './hooks/useMagnifier';
export { useTouch } from './hooks/useTouch';

// Types
export type { MagnifierTheme } from './MagnifierContext';
export type { Position, ImageSize, UseMagnifierOptions } from './hooks/useMagnifier';
export type { TouchGesture, UseTouchOptions } from './hooks/useTouch';
export type { 
  ReactImageMagnifierAdvancedProps,
  MagnifierPosition,
  CursorStyle
} from './ReactImageMagnifierAdvanced';

// Default export for backwards compatibility
export { default } from './ReactImageMagnifier';
