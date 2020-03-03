module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 1.安装npm i --save babel-plugin-import 插件
  //2. 配置
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    },'vant']
  ]
}
