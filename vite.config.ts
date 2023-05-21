// import { defineConfig } from "vite";
// import { nodePolyfills } from "vite-plugin-node-polyfills";
// import commonjs from "@rollup/plugin-commonjs";
// import vue from "@vitejs/plugin-vue";

// export default defineConfig({
//   server: {
//     port: 3000,
//   },
//   optimizeDeps: {
//     include: ["@unipasswallet/smart-account-signer", "@unipasswallet/smart-account", "comlink"]
//   },
//   build: {
//     rollupOptions: {
//       plugins: [
//         commonjs()
//       ]
//     }
//   },
//   plugins: [
//     nodePolyfills(),
//     commonjs({
//       include: [/node_modules/],
//       transformMixedEsModules: true
//     }),
//     vue(),
//   ],
// })

import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import vue from "@vitejs/plugin-vue";
import builtins from "rollup-plugin-node-builtins";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import commonjs from "@rollup/plugin-commonjs";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
      // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
      util: "rollup-plugin-node-polyfills/polyfills/util",
      sys: "util",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      path: "rollup-plugin-node-polyfills/polyfills/path",
      querystring: "rollup-plugin-node-polyfills/polyfills/qs",
      punycode: "rollup-plugin-node-polyfills/polyfills/punycode",
      url: "rollup-plugin-node-polyfills/polyfills/url",
      http: "rollup-plugin-node-polyfills/polyfills/http",
      https: "rollup-plugin-node-polyfills/polyfills/http",
      os: "rollup-plugin-node-polyfills/polyfills/os",
      assert: "rollup-plugin-node-polyfills/polyfills/assert",
      constants: "rollup-plugin-node-polyfills/polyfills/constants",
      _stream_duplex:
        "rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
      _stream_passthrough:
        "rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
      _stream_readable:
        "rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
      _stream_writable:
        "rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
      _stream_transform:
        "rollup-plugin-node-polyfills/polyfills/readable-stream/transform",
      timers: "rollup-plugin-node-polyfills/polyfills/timers",
      console: "rollup-plugin-node-polyfills/polyfills/console",
      vm: "rollup-plugin-node-polyfills/polyfills/vm",
      zlib: "rollup-plugin-node-polyfills/polyfills/zlib",
      tty: "rollup-plugin-node-polyfills/polyfills/tty",
      domain: "rollup-plugin-node-polyfills/polyfills/domain",
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      process: "process",
    },
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      target: "es2020",
      supported: { bigint: true },
      plugins: [NodeModulesPolyfillPlugin()],
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    minify: false,
    target: "es2020",
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        builtins(),
        rollupNodePolyFill(),
      ],
    },
  },
});
