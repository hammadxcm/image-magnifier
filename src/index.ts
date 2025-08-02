// Main components
export { default as ReactImageMagnifier } from './ReactImageMagnifier';
export { default as ReactImageMagnifierAdvanced } from './ReactImageMagnifierAdvanced';

// Context and providers
export { MagnifierProvider, useMagnifierContext, themes } from './MagnifierContext';

// Hooks
export * from './hooks/useImageMagnifier';
export { useTouch } from './hooks/useTouch';

// Types
export type { MagnifierTheme } from './MagnifierContext';
export { useImageMagnifier } from './hooks/useImageMagnifier';
export type { TouchGesture, UseTouchOptions } from './hooks/useTouch';
export type { 
  ReactImageMagnifierAdvancedProps,
  MagnifierPosition,
  CursorStyle
} from './ReactImageMagnifierAdvanced';

// Default export for backwards compatibility
export { default } from './ReactImageMagnifier';
