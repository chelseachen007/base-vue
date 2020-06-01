const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
// const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  // baseUrl: 'vue',
  //3.3以后官方推荐用publicPath
  publicPath: './',
  lintOnSave: true,
  outputDir: 'basevue',
  // assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true,
  productionSourceMap: false, // 生产环境的 source map
  // pages: {
  //index key是必须的
  //   index: {
  //     // 页面的入口文件
  //     entry: 'src/tourist/main.js',
  //     // 页面的模板文件
  //     template: 'public/index.html',
  //     // build 生成的文件名称  例： dist/index.html
  //     filename: 'index.html',
  //   },
  //   passenger: {
  //     // 页面的入口文件
  //     entry: 'src/passenger/main.js',
  //     // 页面的模板文件
  //     template: 'public/passenger.html',
  //     // build 生成的文件名称  例： dist/index.html
  //     filename: 'passenger.html',
  //   },
  //   realTime: {
  //     // 页面的入口文件
  //     entry: 'src/realTime/main.js',
  //     // 页面的模板文件
  //     template: 'public/realTime.html',
  //     // build 生成的文件名称  例： dist/index.html
  //     filename: 'realTime.html',
  //   },
  //   portrait: {
  //     // 页面的入口文件
  //     entry: 'src/portrait/main.js',
  //     // 页面的模板文件
  //     template: 'public/portrait.html',
  //     // build 生成的文件名称  例： dist/index.html
  //     filename: 'portrait.html',
  //   },
  // },
  //是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@com', resolve('src/components'))
      .set('@img', resolve('src/images'))
      .set('@style', resolve('src/assets/scss'))
      .set("@assets", resolve('src/assets'))
      .set("@utils", resolve('src/utils'))
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: 'all'
    })
    config.externals({
      'vue': 'Vue',
      'vuex': 'Vuex',
      'echarts': 'echarts',
      'vue-router': 'VueRouter',
      'axios': 'axios'
    })
  },
  //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。

  // configureWebpack: {
  //   optimization: {
  //     minimizer: [
  //       new TerserPlugin({
  //         terserOptions: {
  //           ecma: undefined,
  //           warnings: false,
  //           parse: {},
  //           compress: {
  //             drop_console: true,
  //             drop_debugger: false,
  //             pure_funcs: ['console.log'] // 移除console
  //           }
  //         },
  //       }),
  //     ]
  //   },

  //   plugins: [
  //     new BundleAnalyzerPlugin()
  //   ]
  // },
  //如果这个值是一个函数， 则会接收被解析的配置作为参数。 该函数及可以修改配置并不返回任何东西， 也可以返回一个被克隆或合并过的配置版本。
  // configureWebpack: config => {
  // const plugins = [];
  //报错
  // if (process.env.NODE_ENV === 'production') {
  //   plugins.push(
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         parallel: true, // 允许并发
  //         cache: true, // 开启缓存
  //         compress: {
  //           warnings: false,
  //           drop_debugger: true, // console
  //           drop_console: true,
  //           pure_funcs: ['console.log'] // 移除console
  //         },
  //         output: {
  //           comment: false, // 不保留注释
  //           beautify: false // 使输出的代码尽可能紧凑
  //         }
  //       },
  //       sourceMap: false,
  //       parallel: true,
  //     })
  //   )
  // }
  // plugins.push(
  //   new BundleAnalyzerPlugin
  // );
  // config.plugins = [
  //   ...config.plugins,
  //   ...plugins
  // ];
  // },
  css: {
    // extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
            @import "@style/variables.scss";
            `
        // $src: "${process.env.VUE_APP_BASE_API}";
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    open: true, // 是否自动打开浏览器页面
    port: 8080, // 端口地址
    https: false, // 使用https提供服务

    proxy: {
      '/repos': {
        target: 'http://47.110.59.12',
        changeOrigin: true,
        pathRewrite: {
          '^/repos': ''
        }
      },
    },
  },
}