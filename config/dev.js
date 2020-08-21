module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    devServer: {
      host: 'localhost',
      port:4000,
      proxy:{
        '/cross':{
          target:'https://sxt-s.oioos.com',
          changeOrigin:true,
          pathRewrite:{
            '^/cross':''
          }
        }
      }

    }
    }
}
