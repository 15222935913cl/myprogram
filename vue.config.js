module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      //接口名由原网站定义，拿过来用
      //为防止接口名重复，自定义接口名，再通过空字符串过滤
      // https://m.maizuo.com/gateway?cityId=211300&pageNum=1&pageSize=10&type=1&k=6502160
      '/kerwin': {
        target: 'http://m.maoyan.com',
        changeOrigin: true,
        pathRewrite:{
          "^/kerwin":""
        }

        /* /kerwin/ajax/comingList  ====> /ajax/comingList  */
      },
      '/ajax': {
        target: 'http://m1.a.com',
        changeOrigin: true
      }
    }

  },
  lintOnSave: false // 关了eslint 检查
}
