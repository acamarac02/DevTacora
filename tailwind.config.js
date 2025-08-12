/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}", // para capturar todo el contenido de Docusaurus
    "./node_modules/@docusaurus/theme-classic/src/**/*.js", // estilos del theme
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}