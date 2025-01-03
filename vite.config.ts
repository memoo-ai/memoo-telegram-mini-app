import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
const pathResolve = (path: string): string => resolve(process.cwd(), path);

export default defineConfig({
  base: '/',
  envDir: './env',
  resolve: {
    alias: {
      '@': pathResolve('src'),
      '#': pathResolve('types'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    host: '0.0.0.0',
    // port: 5173,
    proxy: {
      '/backend/api/v1': {
        // target: 'https://xapp.memoo.ai',
        target: 'https://app-beta.memoo.ai',
        changeOrigin: true,
      },
      '/api/v1/merkel-tree': {
        target: 'http://8.130.122.217:3001',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use 'sass:math';
        @import "@/assets/styles/mixin.scss";
        `,
      },
    },
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    react(),
    eslint(),
    visualizer({ open: false }),
    {
      ...viteCompression(),
      apply: 'build',
    },
    nodePolyfills({
      include: ['crypto'],
    }),
  ],
  build: {
    target: ['esnext'],
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          rainbowkit: ['@rainbow-me/rainbowkit'],
        },
      },
    },
  },
});
