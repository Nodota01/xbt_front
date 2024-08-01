const { defineConfig } = require('@vue/cli-service')
module.exports = {
  publicPath: '/run-one/',
  devServer: {
    port: 28080,
    host: '0.0.0.0',
    allowedHosts: 'all',
    proxy: {
      '/api': {
        target: 'http://nodota.cn:18080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};