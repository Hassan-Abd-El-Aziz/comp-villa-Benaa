import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/اسم-المستودع-هنا/', // ⚠️ قم بتغيير هذه القيمة لاسم المستودع الخاص بك على GitHub (مثلاً '/comp-villa/')
});
