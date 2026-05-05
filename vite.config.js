import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		include: [
			'react',
			'react-dom',
			'sonner',
			'lucide-react',
			'clsx',
			'tailwind-merge',
			'class-variance-authority'
		],
	},
	plugins: [
		react(),
	],
	server: {
		port: 3000,
		cors: true,
		allowedHosts: true,
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json',],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					ui: ['sonner', 'lucide-react'],
					email: ['./src/lib/emailjs.js'],
				},
			},
		},
	},
});
