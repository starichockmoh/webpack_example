declare module '*module.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const styles: IClassNames;
  export = styles;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.svg' {
  import React from 'react';
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __PLATFORM__: 'mobile' | 'desktop';
declare const __ENV__: 'development' | 'production';
