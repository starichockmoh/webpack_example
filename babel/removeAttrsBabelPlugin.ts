import { PluginItem } from '@babel/core';

// плагины в babel создаются на основе АСД дерева нашей программы
export function removeAttrsBabelPlugin(): PluginItem {
  return {
    visitor: {
      // указываем ноду АСД
      Program(path, state) {
        // массив запрещенных атрибутов
        const forbiddenProps = state.opts.props || [];

        // удаляем у элементов запрещенные атрибуты
        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;
            if (forbiddenProps.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}
