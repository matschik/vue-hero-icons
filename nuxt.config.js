export default {
  target: 'static',
  srcDir: "./docs/",
  css: ['./assets/main.css'],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {}
      },
    },
  },
};
