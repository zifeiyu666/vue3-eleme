console.log('node环境')
console.log(process.env.NODE_ENV)
console.log(process.env.proxypath)
const path = require('path')
module.exports = {
  devServer: {
    proxy: process.env.proxypath
  },
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   // 为生产环境修改配置
    // } else {
    //   // 为开发环境修改配置
    // }
    config.resolve
      .alias['~'] = path.resolve(__dirname, 'src')

  }
}