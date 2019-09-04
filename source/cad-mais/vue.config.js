module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:7771',
          pathRewrite: {'^/api' : ''}
        }
      }
    }
  }