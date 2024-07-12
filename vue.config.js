const {
  defineConfig
} = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9981',
        changeOrigin: true,
        
      }
    },
  }
});

