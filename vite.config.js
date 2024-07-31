import path from 'path';
import { defineConfig } from 'vite';
import handlebars from './vite-hb-precompile';
import checker from 'vite-plugin-checker'

export default defineConfig({
  build: {
    outDir: '../dist', // Указываем выходную директорию относительно новой корневой директории
    rollupOptions: {
      input: {
        login: path.resolve(__dirname, 'src/index.html'),
        register: path.resolve(__dirname, 'src/register.html'),
        chats: path.resolve(__dirname, 'src/chats.html'),
        404: path.resolve(__dirname, 'src/404.html'),
        '5xx': path.resolve(__dirname, 'src/50x.html'),
      },
    },
  },
  root: 'src',
  base: '',
  plugins: [
    handlebars(),
    checker({
      // eslint: true,
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        rewriteUrls: 'local',
        relativeUrls: true,
      }
    }
  },
  // server: {
  //   port: 3000
  // }
});
