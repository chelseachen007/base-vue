const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin"); //压缩Gzip
const IS_PRODUCTION = process.env.NODE_ENV !== "development"; // 非开发环境
const Analysis = false; // 是否使用包分析插件

// CDN不稳定 后续可能用DLL优化
const USE_CDN = true;
const externals = {
  vue: "Vue",
  vuex: "Vuex",
  echarts: "echarts",
  "vue-router": "VueRouter",
  axios: "axios",
};

let plugins = [];
if (Analysis) plugins.push(new BundleAnalyzerPlugin());
module.exports = {
  // baseUrl: 'vue',
  //3.3以后官方推荐用publicPath
  publicPath: "./",
  lintOnSave: true,
  outputDir: "basevue",
  // assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true,
  productionSourceMap: false, // 生产环境的 source map
  // pages: {
  //index key是必须的
  //   index: {
  //     entry: 'src/tourist/main.js',
  //     // 页面的模板文件
  //     template: 'public/index.html',
  //     // build 生成的文件名称  例： dist/index.html
  //     filename: 'index.html',
  //   },

  // },
  //是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@com", resolve("src/components"))
      .set("@img", resolve("src/images"))
      .set("@style", resolve("src/assets/scss"))
      .set("@assets", resolve("src/assets"))
      .set("@utils", resolve("src/utils"));
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");

    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: "all",
    });
    if (USE_CDN) {
      config.externals(externals);
    }
    if (IS_PRODUCTION) {
      /** 注意：gzip需要nginx进行配合 */
      config
        .plugin("compression")
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //超过10k进行压缩
            deleteOriginalAssets: false, //是否删除源文件
          },
        ]);

      config.optimization.minimizer("terser").tap((args) => {
        // 生产环境推荐关闭 sourcemap 防止源码泄漏
        // 服务端通过前端发送的行列，根据 sourcemap 转为源文件位置
        args[0].sourceMap = !IS_PRODUCTION;
        args[0].terserOptions.warnings = false;
        args[0].terserOptions.compress.drop_console = true;
        args[0].terserOptions.compress.drop_debugger = true;
        return args;
      });
    }
  },
  //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。

  configureWebpack: {
    plugins,
  },
  css: {
    // extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
             @import '@style/mixin.scss';
            @import "@style/variables.scss";
            `,
      },
    },
  },
  devServer: {
    host: "0.0.0.0",
    open: true, // 是否自动打开浏览器页面
    port: 8080, // 端口地址
    https: false, // 使用https提供服务

    proxy: {
      "/repos": {
        target: "http://47.110.59.12",
        changeOrigin: true,
        pathRewrite: {
          "^/repos": "",
        },
      },
    },
  },
};
