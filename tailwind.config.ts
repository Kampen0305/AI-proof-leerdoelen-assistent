import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#64C37D',
        secondary: '#F7941D',
        text: '#1D1D1B',
      },
    },
  },
  plugins: [],
};

export default config;
