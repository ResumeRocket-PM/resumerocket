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
        // Precache all static assets so SW can detect updates
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}', 'app-version.json'],
        skipWaiting: false,  // Keep false so we can control skip waiting via updateSW()
        clientsClaim: true,
        // Increase the file size limit to accommodate larger assets
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5 MB
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
