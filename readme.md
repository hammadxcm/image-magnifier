# React Image Magnifier v0.9 🔍

> **🚀 PRE-RELEASE:** Complete rewrite with incredible new features!

A powerful, feature-rich React component for image magnification with advanced capabilities including touch support, multiple themes, performance optimization, and accessibility features.

[![npm version](https://badge.fury.io/js/@hammadxcm%2Fimage-magnifier.svg)](https://www.npmjs.com/package/@hammadxcm/image-magnifier)
[![License](https://img.shields.io/npm/l/@hammadxcm/image-magnifier)](https://github.com/hammadxcm/react-image-magnifier/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-18%2B%20%7C%2019%2B-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@hammadxcm/image-magnifier)](https://bundlephobia.com/package/@hammadxcm/image-magnifier)

> ⚠️ **Pre-Release Notice**: This is v0.9.0, a feature-complete pre-release version. All features are stable and ready for testing. The official v1.0.0 release will follow after community feedback.

## 🚀 What's New in v0.9 (Pre-Release)

<details>
<summary><strong>📋 Complete Changelog</strong> (Click to expand)</summary>

### 🎯 **BREAKING CHANGES**
- **New Advanced Component**: `ReactImageMagnifierAdvanced` with 25+ customizable props
- **Context Provider**: `MagnifierProvider` for global state management
- **Updated Exports**: Multiple named exports for better tree-shaking
- **Enhanced TypeScript**: Complete type definitions with strict typing

### ✨ **NEW FEATURES**

#### 🎨 **Visual Enhancements**
- **4 Built-in Themes**: Classic, Modern, Dark, and Neon themes
- **Custom Theme Support**: Full customization of colors, borders, and effects
- **Multiple Cursor Styles**: `crosshair`, `zoom-in`, `grab`, `pointer`, `none`
- **Positioning Modes**: `follow`, `fixed-top-right`, `fixed-top-left`, `fixed-bottom-right`, `fixed-bottom-left`
- **Zoom Controls**: Interactive +/- buttons with customizable min/max zoom
- **Mini Map**: Navigation overview showing current magnified area
- **Watermarks**: Add text or React components as watermarks
- **Overlay Content**: Custom overlay components on images
- **Smooth Animations**: Configurable transitions and easing

#### 📱 **Touch & Mobile Support**
- **Full Touch Support**: Native touch events with gesture recognition
- **Pinch to Zoom**: Multi-touch zoom gestures
- **Touch Navigation**: Drag to move magnification area
- **Mobile Optimized**: Responsive design for all screen sizes
- **Gesture Callbacks**: Custom handlers for touch events

#### ⚡ **Performance Optimizations**
- **Global State Management**: Only one active magnifier across the entire page
- **60fps Throttling**: Smooth performance with high-frequency mouse movements
- **Smart Re-rendering**: Optimized with React.memo and useCallback
- **Lazy Loading**: Optional image preloading
- **Performance Mode**: Special mode for pages with many images

#### ♿ **Accessibility & UX**
- **Keyboard Navigation**: Full keyboard support (+/- to zoom, Escape to hide)
- **ARIA Labels**: Complete screen reader support
- **Focus Management**: Proper tab navigation
- **High Contrast**: Themes optimized for accessibility
- **Loading States**: Proper handling of image loading and errors

#### 🛠️ **Developer Experience**
- **Custom Hooks**: `useMagnifier` and `useTouch` for advanced usage
- **TypeScript First**: Complete type definitions with IntelliSense
- **Tree Shaking**: Optimized bundle size with named exports
- **Event Callbacks**: `onMagnifierShow`, `onMagnifierHide`, `onZoomChange`
- **Error Boundaries**: Graceful error handling

### 🔧 **IMPROVEMENTS**
- **Better Image Handling**: Improved loading states and error handling
- **Smoother Animations**: Enhanced transition system
- **Memory Management**: Better cleanup and memory usage
- **Bundle Size**: Optimized for smaller bundle impact
- **SSR Support**: Better Next.js and SSR compatibility

### 🐛 **BUG FIXES**
- Fixed hydration mismatch errors in Next.js
- Resolved magnifier visibility issues
- Improved touch event handling on mobile devices
- Fixed memory leaks with event listeners
- Better cleanup on component unmount

</details>

---

## ✨ Features

### 🚀 Core Features
- **Smooth Magnification**: High-performance image zoom with customizable magnifier size and zoom levels
- **Multiple Positioning Modes**: Follow cursor, fixed corners, or custom positioning
- **Touch Support**: Full mobile and tablet support with pinch-to-zoom gestures
- **Keyboard Navigation**: Zoom in/out with +/- keys, escape to hide magnifier
- **Performance Optimized**: Smart rendering for multiple images on the same page

### 🎨 Visual Features
- **Multiple Themes**: Classic, Modern, Dark, and Neon built-in themes
- **Custom Styling**: Full control over colors, borders, shadows, and effects
- **Smooth Animations**: Configurable transitions and animations
- **Mini Map**: Optional overview showing current magnified area
- **Zoom Controls**: Built-in +/- buttons for zoom control
- **Custom Cursors**: Multiple cursor styles (crosshair, zoom-in, grab, etc.)

### 🔧 Advanced Features
- **Context Management**: Global state management for multiple magnifiers
- **Watermarks**: Add text or component watermarks to images
- **Overlay Content**: Custom overlay components on images
- **Accessibility**: Full ARIA support and keyboard navigation
- **TypeScript**: Complete TypeScript support with detailed type definitions

## 📦 Installation

```bash
npm install @hammadxcm/image-magnifier
```

```bash
yarn add @hammadxcm/image-magnifier
```

```bash
pnpm add @hammadxcm/image-magnifier
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { ReactImageMagnifier } from '@hammadxcm/image-magnifier';

function MyComponent() {
  return (
    <ReactImageMagnifier
      imageSrc="/path/to/your/image.jpg"
      imageAlt="Your image description"
      imageWidth={500}
      imageHeight={400}
    />
  );
}
```

### Advanced Usage with Provider

```tsx
import { 
  MagnifierProvider, 
  ReactImageMagnifierAdvanced 
} from '@hammadxcm/image-magnifier';

function App() {
  return (
    <MagnifierProvider theme="modern" performanceMode={false}>
      <div className="image-gallery">
        <ReactImageMagnifierAdvanced
          imageSrc="/image1.jpg"
          imageAlt="First image"
          imageWidth={400}
          imageHeight={300}
          showZoomControls={true}
          showMiniMap={true}
          theme="modern"
          position="follow"
          watermark="© 2024 Your Company"
        />
        
        <ReactImageMagnifierAdvanced
          imageSrc="/image2.jpg"
          imageAlt="Second image"
          imageWidth={400}
          imageHeight={300}
          position="fixed-top-right"
          cursorStyle="zoom-in"
          enableTouch={true}
          overlayContent={
            <div className="premium-badge">Premium ✨</div>
          }
        />
      </div>
    </MagnifierProvider>
  );
}
```

## 📖 API Reference

### ReactImageMagnifier (Basic Component)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageSrc` | `string` | **required** | Source URL of the image |
| `imageAlt` | `string` | - | Alt text for accessibility |
| `imageWidth` | `number` | `500` | Width of the image in pixels |
| `imageHeight` | `number` | `500` | Height of the image in pixels |
| `magnifierSize` | `number` | `300` | Size of the magnifier lens |
| `zoomLevel` | `number` | `2.5` | Zoom level multiplier |
| `className` | `string` | - | CSS class for the container |
| `imageClassName` | `string` | - | CSS class for the image |
| `disabled` | `boolean` | `false` | Disable magnification |

### ReactImageMagnifierAdvanced

All basic props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'classic' \| 'modern' \| 'dark' \| 'neon'` | `'classic'` | Built-in theme |
| `customTheme` | `Partial<MagnifierTheme>` | - | Custom theme overrides |
| `position` | `MagnifierPosition` | `'follow'` | Magnifier positioning mode |
| `cursorStyle` | `CursorStyle` | `'crosshair'` | Mouse cursor style |
| `showZoomControls` | `boolean` | `false` | Show +/- zoom buttons |
| `showMiniMap` | `boolean` | `false` | Show navigation mini-map |
| `enableKeyboard` | `boolean` | `true` | Enable keyboard shortcuts |
| `enableTouch` | `boolean` | `true` | Enable touch/gesture support |
| `performanceMode` | `boolean` | `false` | Enable performance optimizations |
| `smoothTransitions` | `boolean` | `true` | Enable smooth animations |
| `minZoom` | `number` | `1.5` | Minimum zoom level |
| `maxZoom` | `number` | `5` | Maximum zoom level |
| `watermark` | `string \| ReactNode` | - | Watermark content |
| `overlayContent` | `ReactNode` | - | Custom overlay content |
| `onMagnifierShow` | `() => void` | - | Callback when magnifier shows |
| `onMagnifierHide` | `() => void` | - | Callback when magnifier hides |
| `onZoomChange` | `(zoom: number) => void` | - | Callback on zoom level change |

### MagnifierProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultTheme` | `string` | `'classic'` | Default theme for all magnifiers |
| `performanceMode` | `boolean` | `false` | Global performance mode |
| `smoothAnimations` | `boolean` | `true` | Global animation setting |
| `touchEnabled` | `boolean` | `true` | Global touch support |

## 🎨 Themes

### Built-in Themes

- **Classic**: Traditional magnifying glass with warm colors
- **Modern**: Clean, minimalist design with blue accents
- **Dark**: Dark theme with subtle highlights
- **Neon**: Vibrant theme with pink/purple accents

### Custom Themes

```tsx
const customTheme = {
  borderColor: 'rgba(255, 0, 0, 0.8)',
  borderWidth: 2,
  shadowColor: 'rgba(255, 0, 0, 0.3)',
  handleColor: 'rgba(255, 0, 0, 0.9)',
  gripColor: 'rgba(200, 0, 0, 0.9)',
  backdropBlur: true,
};

<ReactImageMagnifierAdvanced
  customTheme={customTheme}
  // other props...
/>
```

## 📱 Touch & Mobile Support

The advanced component includes comprehensive touch support:

- **Touch to Activate**: Tap and hold to show magnifier
- **Drag to Navigate**: Drag finger to move magnification area
- **Pinch to Zoom**: Use pinch gestures to change zoom level
- **Responsive Design**: Automatically adapts to different screen sizes

## ⌨️ Keyboard Shortcuts

When `enableKeyboard` is true:

- **+** or **=**: Zoom in
- **-**: Zoom out  
- **Escape**: Hide magnifier

## 🚀 Performance Optimization

### Multiple Images
When displaying multiple magnifiable images:

```tsx
<MagnifierProvider performanceMode={true}>
  {images.map(image => (
    <ReactImageMagnifierAdvanced
      key={image.id}
      {...image}
      performanceMode={true}
    />
  ))}
</MagnifierProvider>
```

### Performance Features
- **Single Active Magnifier**: Only one magnifier renders at a time
- **60fps Throttling**: Smooth performance even with rapid mouse movement
- **Smart Re-rendering**: Optimized React rendering with proper memoization
- **Lazy Loading**: Images can be preloaded or loaded on demand

## 🎯 Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling
- **High Contrast**: Themes work well with high contrast modes

## 🛠️ Advanced Usage

### Custom Hooks

```tsx
import { useMagnifier, useTouch } from '@hammadxcm/image-magnifier';

function CustomMagnifier() {
  const magnifierProps = useMagnifier({
    magnifierSize: 200,
    zoomLevel: 3,
    disabled: false,
    smoothAnimations: true,
    performanceMode: false,
  });
  
  const touchProps = useTouch({
    enabled: true,
    minZoom: 1,
    maxZoom: 5,
    onGesture: (gesture) => {
      console.log('Gesture:', gesture);
    },
  });
  
  // Your custom implementation
}
```

### Context Usage

```tsx
import { useMagnifierContext } from '@hammadxcm/image-magnifier';

function ThemeSelector() {
  const { globalSettings, updateGlobalSettings } = useMagnifierContext();
  
  return (
    <select 
      value={globalSettings.theme}
      onChange={(e) => updateGlobalSettings({ theme: e.target.value })}
    >
      <option value="classic">Classic</option>
      <option value="modern">Modern</option>
      <option value="dark">Dark</option>
      <option value="neon">Neon</option>
    </select>
  );
}
```

## 🔧 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { 
  MagnifierTheme,
  MagnifierPosition,
  CursorStyle,
  ReactImageMagnifierAdvancedProps 
} from '@hammadxcm/image-magnifier';
```

## 🐛 Troubleshooting

### Common Issues

1. **Magnifier not showing**: Ensure `imageSrc` is valid and image loads successfully
2. **Touch not working**: Check that `enableTouch` is true and `touchEnabled` in provider
3. **Performance issues**: Enable `performanceMode` for multiple images
4. **TypeScript errors**: Ensure you're using compatible React versions (18+ or 19+)

### Next.js Integration

```tsx
import dynamic from 'next/dynamic';

const ReactImageMagnifier = dynamic(
  () => import('@hammadxcm/image-magnifier').then(mod => mod.ReactImageMagnifier),
  { ssr: false }
);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔄 Migration from v1.x

<details>
<summary><strong>📦 Migrating from v1.x to v0.9</strong> (Click to expand)</summary>

### Quick Migration (Backward Compatible)
```tsx
// v1.x - Still works in v0.9! 🎉
import ReactImageMagnifier from '@hammadxcm/image-magnifier';

function MyComponent() {
  return (
    <ReactImageMagnifier 
      imageSrc="/image.jpg" 
      // All v1.x props still work!
    />
  );
}
```

### Upgrading to Advanced Features
```tsx
// v0.9 - New advanced component
import { 
  MagnifierProvider, 
  ReactImageMagnifierAdvanced 
} from '@hammadxcm/image-magnifier';

function MyApp() {
  return (
    <MagnifierProvider>
      <ReactImageMagnifierAdvanced
        imageSrc="/image.jpg"
        theme="modern"
        showZoomControls={true}
        enableTouch={true}
        // 20+ new props available!
      />
    </MagnifierProvider>
  );
}
```

### Breaking Changes
- Import structure changed for advanced features (basic usage unchanged)
- Some TypeScript interfaces updated for better type safety
- Performance optimizations may require `MagnifierProvider` for multiple images

</details>

## 🌟 Community & Examples

### 🎨 **Live Demo**
Check out our [**Interactive Demo**](https://your-demo-link.com) showcasing all features with live code examples!

### 🏆 **Featured Use Cases**
- **E-commerce**: Product image zoom for online stores
- **Photography**: Portfolio and gallery magnification
- **Medical**: Detailed image analysis interfaces
- **Real Estate**: Property image exploration
- **Art & Design**: High-resolution artwork viewing
- **Documentation**: Technical diagram magnification

### 🤝 **Community Contributions Welcome!**

We ❤️ community contributions! Here's how you can help:

#### 🎯 **Quick Wins**
- 🐛 **Bug Reports**: Found an issue? [Report it!](https://github.com/hammadxcm/react-image-magnifier/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: Have an idea? [Suggest it!](https://github.com/hammadxcm/react-image-magnifier/issues/new?template=feature_request.md)
- 📖 **Documentation**: Improve our docs with examples and clarifications
- 🎨 **New Themes**: Create and share custom themes
- 🌍 **Translations**: Help translate documentation

#### 🔧 **Development**
```bash
# Clone the repository
git clone https://github.com/hammadxcm/react-image-magnifier.git

# Install dependencies
npm install

# Run the development server
cd sample-app && npm run dev

# Build the package
npm run build
```

#### 🎨 **Contributing Themes**
Share your custom themes with the community:
```tsx
// Create your theme
const myAwesomeTheme = {
  borderColor: 'rgba(255, 100, 50, 0.8)',
  borderWidth: 2,
  shadowColor: 'rgba(255, 100, 50, 0.3)',
  // ... other properties
};

// Use it in your app
<ReactImageMagnifierAdvanced 
  customTheme={myAwesomeTheme} 
  // ... other props
/>
```

### 🏅 **Hall of Fame**
Special thanks to our contributors:
- 🚀 **Early Adopters**: Thank you for testing and feedback!
- 🐛 **Bug Hunters**: Community members who reported issues
- 💡 **Feature Requesters**: Great ideas that shaped v2.0
- 📖 **Documentation Heroes**: Improved our guides and examples

> **Want to be featured?** Contribute to the project and join our Hall of Fame! 🌟

### 📊 **Project Stats**
- ![GitHub Stars](https://img.shields.io/github/stars/hammadxcm/react-image-magnifier?style=social)
- ![NPM Downloads](https://img.shields.io/npm/dm/@hammadxcm/image-magnifier)
- ![GitHub Issues](https://img.shields.io/github/issues/hammadxcm/react-image-magnifier)
- ![GitHub PRs](https://img.shields.io/github/issues-pr/hammadxcm/react-image-magnifier)

## 🔮 Roadmap

### 🎯 **Coming in v1.0** (Full Release)
- [ ] **Video Magnification**: Support for video elements
- [ ] **3D Image Support**: WebGL-based 3D image exploration
- [ ] **AI-Powered Features**: Smart zoom regions detection
- [ ] **More Themes**: Community-requested themes
- [ ] **Animation Presets**: Pre-built animation configurations

### 🚀 **Future Vision** (v2.0+)
- [ ] **VR/AR Support**: Immersive magnification experiences
- [ ] **Machine Learning**: Intelligent magnification suggestions
- [ ] **Advanced Gestures**: More complex touch interactions
- [ ] **Plugin System**: Extensible architecture

> **Vote on features!** Join our [discussions](https://github.com/hammadxcm/react-image-magnifier/discussions) to shape the future of the library.

## 📄 License

ISC License - see [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support & Community

### 💬 **Get Help**
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/hammadxcm/react-image-magnifier/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/hammadxcm/react-image-magnifier/discussions)
- 📖 **Documentation**: [Complete Guide](https://github.com/hammadxcm/react-image-magnifier#readme)
- 💬 **Community Chat**: [Discord Server](https://discord.gg/your-invite) (coming soon!)

### 🌟 **Stay Updated**
- ⭐ **Star the repo** to show your support
- 👀 **Watch releases** for updates
- 🐦 **Follow on Twitter** [@hammadxcm](https://twitter.com/hammadxcm)
- 📧 **Newsletter**: Subscribe to our updates (coming soon!)

### 🎉 **Show Your Support**
If this package saved you development time, consider:
- ⭐ **Starring the repository**
- 🐦 **Sharing on social media**
- 📝 **Writing a blog post** about your experience
- ☕ **Buying me a coffee** (link coming soon!)

---

<div align="center">

### 🎉 **Thank you for using React Image Magnifier!** 🎉

**Made with ❤️ by [hammadxcm](https://github.com/hammadxcm) and the amazing open-source community**

*Crafted with passion • Built for developers • Enhanced by community*

[![GitHub](https://img.shields.io/badge/GitHub-hammadxcm-black?style=flat-square&logo=github)](https://github.com/hammadxcm)
[![Twitter](https://img.shields.io/badge/Twitter-@hammadxcm-blue?style=flat-square&logo=twitter)](https://twitter.com/hammadxcm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-hammadxcm-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/hammadxcm)

</div>