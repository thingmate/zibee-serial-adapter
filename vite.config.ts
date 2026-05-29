import type { UserConfig } from 'vite';

function importDeferShimPlugin(): Plugin {
  return {
    name: 'import-defer-shim',

    // Transforme la syntaxe pour que le serveur Vite dev ne plante pas
    transform(code, id) {
      if (!id.endsWith('.ts') && !id.endsWith('.js')) return;
      if (!code.includes('import defer')) return;

      // Strip "defer" keyword → import defer * as X from Y  →  import * as X from Y
      return {
        code: code.replace(/import\s+defer\s+/g, 'import '),
        map: null,
      };
    },

    // Injecte es-module-shims dans l'HTML
    transformIndexHtml(html) {
      return html.replace(
        '<head>',
        `<head>
          <script type="esms-options">
            { "polyfillEnable": ["import-defer"] }
          </script>
          <script async type="module" src="/node_modules/es-module-shims/dist/es-module-shims.js"/>`,
      );
    },
  };
}

export default {
  build: {
    target: 'esnext',
    modulePreload: {
      polyfill: false,
    },
  },
  // plugins: [importDeferShimPlugin()],
} satisfies UserConfig;
