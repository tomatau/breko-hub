module.exports = {
  plugins: [
    require('autoprefixer')({
      cascade: false,
      add: true,
      remove: true,
    }),
    require('cssnano')({
      zindex: false,
    }),
  ],
}
