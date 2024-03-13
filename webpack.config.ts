import path from 'path';
import { buildWebpack } from './config/build/buildWebpack';

import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from './config/build/buildTypes';
import type { Configuration } from 'webpack';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  isAnalyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  };

  const config: Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    isAnalyzer: env.isAnalyzer,
    platform: env.platform ?? 'desktop',
  });

  return config;
};
