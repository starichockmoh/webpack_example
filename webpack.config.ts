import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

type Mode = 'development' | 'production';
interface EnvVariables {
  mode: Mode;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    mode: env.mode,
    entry: path.resolve(__dirname, 'src', 'index.ts'), // путь до точки входа
    output: {
      path: path.resolve(__dirname, 'build'), // название папки сборки
      filename: '[name].[contenthash].js', // название файла сборки (динамическое, иначе проблемы с кешированием браузером)
      clean: true, // очищать ли папку сборки перед сборкой
    },
    plugins: [
      new webpack.ProgressPlugin(), // процент сборки
      new HtmlWebpackPlugin({
        // динамическое добавление в html скрипта - нашего билд .js
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
    ],
    module: {
      rules: [
        // указываем лоадеры (цепочки обработчиков для определенных файлов)
        {
          test: /\.tsx?$/, // файлы, которые хотим обрабатывать (ts и tsx)
          use: 'ts-loader', // название лоадера
          exclude: /node_modules/, // то, что не обрабатываем
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'], // позволяет при импортах не писать .ts / .tsx / .js
    },
  };
  return config;
};
