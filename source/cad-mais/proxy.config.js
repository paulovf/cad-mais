const proxy = [
    {
      context: '/',
      target: 'http://localhost:7771',
      pathRewrite: {'^/' : ''}
    }
  ];module.exports = proxy;
