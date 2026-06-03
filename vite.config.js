import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // حسب النسخة اللي بتستخدمها

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/medical-consultation-platform/', // 🌟 السطر ده مهم جداً عشان روابط الصور والـ CSS تفتح صح على جيت هاب
})