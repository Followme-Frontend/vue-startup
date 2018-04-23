const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HappyPack = require('happypack');
const WebpackMd5Hash = require('webpack-md5-hash');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');   

const getHappyPackConfig = require('./happypack');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.base.config');
const config = require('../config');

const env = process.env.NODE_ENV || 'development';

module.exports = merge(baseWebpackConfig, {
    entry: {
        vendor: ['vue', 'vue-router', 'axios'],
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
            // 提取公共模块
            name: 'vendor'
            // minChunks: (module, count) => {
            //     return module.resource && /node_modules/.test(module.resource);
            // }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            // 针对 entry chunk 下的子 chunk 提取异步公共模块
            name: 'app',
            async: 'commonlazy.js', 
            children: true,
            minChunks: 3
        }),

        // https://github.com/erm0l0v/webpack-md5-hash/issues/9
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
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
        
        new webpack.optimize.ModuleConcatenationPlugin(),
        new InlineManifestWebpackPlugin(),
        new WebpackMd5Hash()
    ]
});

