import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

import type { ModuleOptions } from 'webpack';
import type { BuildOptions } from './buildTypes';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const scssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      // поддержка module.scss
      modules: {
        // в dev сборке испоьзуем в качестве названия селектора путь, в prod - hash
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    // sass to css -> css to CommonJS -> CommonJS to styles nodes
    // MiniCssExtract для минифицированных css файлов
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      scssLoaderWithModules,
      'sass-loader',
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/, // файлы, которые хотим обрабатывать (ts и tsx)
    use: [
      {
        loader: 'ts-loader', // название лоадера. С jsx/tsx также умеет работать babel-loader
        options: {
          // только транспиляция без проверки типов
          // сильно ускоряет сборку
          transpileOnly: isDev,
          getCustomTransformers: () => ({
            // hot module replacement
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
    exclude: /node_modules/, // то, что не обрабатываем
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  // лоадер для работы с svg как с компонентами
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          // для того, чтобы все дочерние элементы svg брали в качестве fill и stroke
          // цвет родителя (атрибут currentColor), а мы работали с иконками через
          // обычный color: '...'
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  // в качестве аналога tsLoader для работы с tsx/ts можно использовать babel
  const babelLoader = {
    test: /\.tsx?$/, // файлы, которые хотим обрабатывать (ts и tsx)
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      // можно задавать так и можно через конфиг
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: isDev ? 'automatic' : 'classic' }],
        ],
      },
    },
  };

  return [svgLoader, assetLoader, scssLoader, tsLoader];
}
