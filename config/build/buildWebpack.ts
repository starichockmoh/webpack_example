import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolves } from './buildResolves';

import type { Configuration } from 'webpack';
import type { BuildOptions } from './buildTypes';

export function buildWebpack(options: BuildOptions): Configuration {
  const { paths, mode } = options;
  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',
    entry: paths.entry, // путь до точки входа
    output: {
      path: paths.output, // название папки сборки
      filename: '[name].[contenthash].js', // название файла сборки (динамическое, иначе проблемы с кешированием браузером)
      clean: true, // очищать ли папку сборки перед сборкой
    },
    plugins: buildPlugins(options),
    module: {
      // указываем лоадеры (цепочки обработчиков для определенных файлов)
      rules: buildLoaders(options),
    },
    resolve: buildResolves(options),
    devtool: isDev ? 'eval-cheap-source-map' : 'source-map', // source map - для показа ошибки, stack trace и тд.
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
