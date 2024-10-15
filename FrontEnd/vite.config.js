import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { treatAsCommonjs } from "vite-plugin-treat-umd-as-commonjs";
import inject from '@rollup/plugin-inject'; // You don't need to dynamically import anymore




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    treatAsCommonjs(),
    inject({
      Buffer: ['buffer', 'Buffer'], // This injects the Buffer polyfill
    }),
//     vitePluginRequire.default(),
  ],
  server: {
    port: 5174,
  },
  // resolve: {
  //   alias: {
  //     'react-jupyter-notebook': 'react-jupyter-notebook', // Adjust the path as necessary
  //   },
  // },
  resolve: {
    alias: [
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: "$1",
      },
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".whl": "text",
      },
    },
  },
})
