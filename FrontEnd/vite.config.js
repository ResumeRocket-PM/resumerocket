import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { treatAsCommonjs } from "vite-plugin-treat-umd-as-commonjs";
import { VitePWA } from 'vite-plugin-pwa';




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    treatAsCommonjs(),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['app-version.json'],
        globDirectory: 'dist',
        additionalManifestEntries: [
          {
            url: '/app-version.json',
            revision: Date.now().toString()
          }
        ],
        skipWaiting: false,
        clientsClaim: true
      }
    })
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
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
})
