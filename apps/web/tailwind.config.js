/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'pl-0',
    'pl-1',
    'pl-2',
    'pl-3',
    'pl-4',
    'pl-5',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
