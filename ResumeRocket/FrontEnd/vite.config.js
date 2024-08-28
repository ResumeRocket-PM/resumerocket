import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  // resolve: {
  //   alias: {
  //     'react-jupyter-notebook': 'react-jupyter-notebook', // Adjust the path as necessary
  //   },
  // },
})
