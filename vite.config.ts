import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], base: '/kid-reward-points/', server: { port: 5176, strictPort: true }, test: { environment: 'node' } })
