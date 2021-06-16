module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: "dist-taf-browser",
  assetsDir: "assets",
  filenameHashing: true,
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    open: true,
    https: false,
    disableHostCheck: true,
    hot: true,
    port: 8008,
    proxy: {
      "/api": {
        target: "http://192.168.0.77:9090",
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          "^/api": "/api",
        },
      }
    }
  },
  chainWebpack: config=> {
    config.plugins.delete("preload")
    config.plugins.delete("prefetch")
  }
}
