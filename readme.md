# React Image Magnifier

A simple React component for magnifying images with a zoom effect. This component is built using TypeScript and Next.js.

## Installation

You can install the `react-image-magnifier` package via npm or yarn. Don't forget to add the `--save` flag if you want to save it to your `package.json`.

### npm

```bash
npm install react-image-magnifier --save
```

### pnpm

```bash
pnpm add react-image-magnifier
```

### yarn

```bash
yard add react-image-magnifier
```

## Usage

```tsx
import React from 'react';
import ReactImageMagnifier from 'react-image-magnifier';

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
