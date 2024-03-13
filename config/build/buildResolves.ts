import type { Configuration } from 'webpack';
import type { BuildOptions } from './buildTypes';

export function buildResolves(options: BuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'], // позволяет при импортах не писать .ts / .tsx / .js
    alias: {
      '@': options.paths.src, // абсолютные пути, папка src заменяется на символ @
    },
  };
}
