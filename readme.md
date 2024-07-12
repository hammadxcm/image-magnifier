# React Image Magnifier

A simple React component for magnifying images with a zoom effect. This component is built using TypeScript and Next.js.

## Installation

You can install the `@hammadxcm/image-magnifier` package via npm, pnpm, or yarn. Don't forget to add the `--save` flag if you want to save it to your `package.json`.

### npm

```bash
npm install @hammadxcm/image-magnifier --save
```

### pnpm

```bash
pnpm add @hammadxcm/image-magnifier
```

### yarn

```bash
yard add @hammadxcm/image-magnifier
```

## Usage

```tsx
import React from 'react';
import ReactImageMagnifier from '@hammadxcm/image-magnifier';

const App = () => {
  return (
    <div>
      <h1>Image Magnifier Example</h1>
      <ReactImageMagnifier imageSrc='https://picsum.photos/200/300.jpg' />
    </div>
  );
};

export default App;
```

## Advanced Usage

```tsx
import React from 'react';
import ReactImageMagnifier from '@hammadxcm/image-magnifier';

const App = () => {
  return (
    <div>
      <h1>Advanced Image Magnifier Example</h1>
      <ReactImageMagnifier
        imageSrc='https://picsum.photos/200/300.jpg'
        magnifierSize={250}
        zoomLevel={3}
        imageClassName='custom-image-class'
        imageAlt='Custom Alt Text'
        imageSizes='(max-width: 500px) 100vw, 500px'
        imageWidth={400}
        imageHeight={400}
        className='custom-root-class'
      />
    </div>
  );
};

export default App;
```

## Props

The `ImageMagnifier` component accepts the following props:

- **`imageSrc`** (string): The URL of the image to be magnified. **(required)**
- **`magnifierSize`** (number): The size of the magnifier. Default is `300`.
- **`zoomLevel`** (number): The zoom level for magnification. Default is `2.5`.
- **`imageClassName`** (string): CSS class for the image element. Default is `'object-cover z-10'`.
- **`imageAlt`** (string): Alt text for the image. Default is `undefined`.
- **`imageSizes`** (string): Sizes attribute for the image. Default is `'(max-width: 700px) 100vw, (max-width: 300px) 100vw, 700px'`.
- **`imageWidth`** (number): Width of the image in pixels. Default is `500`.
- **`imageHeight`** (number): Height of the image in pixels. Default is `500`.
- **`className`** (string): CSS class for the root `div` element. Default is `'flex justify-center items-center'`.

## License

MIT © [hammadxcm](https://github.com/hammadxcm)