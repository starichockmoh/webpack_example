import path from 'path';
import { Configuration, ProgressPlugin, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import type { BuildOptions } from './buildTypes';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const isProd = options.mode === 'production';
  const isDev = options.mode === 'development';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      // динамическое добавление в html скрипта - нашего билд .js
      template: options.paths.html,
      // расположение иконки favicon
      favicon: path.resolve(options.paths.public, 'favicon.ico'),
    }),
    // плагин для добавления env переменных в глобальные переменные
    // благодаря этим переменным мы можем делать рзличные сборки под мобилу и под ПК.
    // Webpack анализирует ситуации, если будет невозможное условие
    // (например благодаря этим переменным (пример в App.tsx)) или неиспользуемые участки кода
    // в бандл они не войдут. Данный механизм называется Tree shaking.
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(options.platform),
      __ENV__: JSON.stringify(options.mode),
    }),
  ];

  if (isDev) {
    plugins.push(new ProgressPlugin()); // процент сборки
    // проверка типов ts (не влияет на скорость сборки, запуск в отдельном процессе)
    plugins.push(new ForkTsCheckerWebpackPlugin());
    // hot module replacement
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    );
    // Копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки.
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(options.paths.public, 'locales'),
            to: path.resolve(options.paths.output, 'locales'),
          },
        ],
      }),
    );
  }

  if (options.isAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin() as any);
  }

  return plugins;
}
