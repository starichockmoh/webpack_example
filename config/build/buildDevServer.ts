import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { BuildOptions } from './buildTypes';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true,
    // для работы клиентского роутинга в dev режиме. Для прода (н-р статика через nginx)
    // нужно настроить проксирование на index.html)
    historyApiFallback: true,
    // hot module replacement - внесение изменений без перезагрузки страницы
    // на изменения досылаются бандлы (с помощью websocket)
    hot: true,
  };
}
