import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import vitePluginRequire from 'vite-plugin-require'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), (vitePluginRequire as any).default()],
  define: {
    'process.env': {
      rtk: false,
    },
  },
})
