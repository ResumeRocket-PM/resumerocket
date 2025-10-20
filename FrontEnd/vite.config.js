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
        globDirectory: 'dist',
        skipWaiting: false,  // Keep false so we can control skip waiting via updateSW()
        clientsClaim: true,
        // Check for updates more frequently
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'ResumeRocket',
        short_name: 'ResumeRocket',
        description: 'Your resume and portfolio builder',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/iconRR.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
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
