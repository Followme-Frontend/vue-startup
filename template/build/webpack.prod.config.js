const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HappyPack = require('happypack');   

const getHappyPackConfig = require('./happypack');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.base.config');
const config = require('../config');

const env = process.env.NODE_ENV || 'development';
const manifest = require('../dist/vendor-manifest.json');

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: utils.resolve('src/page/index.js')
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: ['happypack/loader?id=css']
                })
            }
        ]
    },
    output: {
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        path: config[env].assetsRoot,
        publicPath: config[env].assetsPublicPath,
        sourceMapFilename: '[file].map',
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
    },
    devtool: false,
    plugins: [
        new webpack.HashedModuleIdsPlugin(),

        new HappyPack(getHappyPackConfig({
            id: 'css',
            loaders: utils.extractCSS()
        })),

        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash:8].css')
        }),

        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['manifest'], // ['vender', 'commons']
            // minChunks: ({ resource }) => (
            //     resource &&
            //     resource.indexOf('node_modules') >= 0 &&
            //     resource.match(/\.js$/)
            // )
        }),

        // gzip
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|html|less|css)$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        new webpack.optimize.UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: false
        }),
        
        new webpack.optimize.ModuleConcatenationPlugin()
        // 去掉 md5: https://github.com/erm0l0v/webpack-md5-hash/issues/9
        // new WebpackMd5Hash()
    ]
});

