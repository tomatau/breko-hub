module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'last 2 versions',
      ],
      cascade: false,
      add: true,
      remove: true,
    }),
    require('cssnano')({
      zindex: false,
    }),
  ],
}
