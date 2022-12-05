// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const target = 'http://127.0.0.1:3000';

module.exports = {
  devServe: {
    port: 8080,
    proxy: {
      '^/api': {
        target,
        changeOrigin: true,
      },
      '^/upload': {
        target,
        changeOrigin: true,
      },
      '^/download': {
        target,
        changeOrigin: true,
      }
    }
  }
}
