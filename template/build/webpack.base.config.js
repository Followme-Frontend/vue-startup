const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MxWebpackContentReplacePlugin = require('mx-webpack-content-replace-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');   
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const getHappyPackConfig = require('./happypack');
const config = require('../config');
const utils = require('./utils');

const env = process.env.NODE_ENV || 'development';

// 全局变量
const cdn = process.env.FM_CDN ? process.env.FM_CDN : config[env].cdn;
const api = process.env.FM_API ? process.env.FM_API : config[env].api;
const base = process.env.FM_BASE ? process.env.FM_BASE : config[env].base;

console.log('\n---------env------:\n', env);
console.log('\n---------cdn------:\n', cdn);
console.log('\n---------base------:\n', base);
console.log('\n---------api------:\n', api, '\n');

module.exports = {
    context: utils.resolve('src'),
    module: {
        noParse: [/static|assets/],
        rules: [
            {
                test: /\.js$/,
                exclude: utils.getExcludAndInclude().exclude,
                {{#fmcomponents}}
                include: utils.getExcludAndInclude().include,
                {{/fmcomponents}}
                loader: 'happypack/loader?id=js'
            },
            {
                test: /\.vue$/,
                exclude: utils.getExcludAndInclude().exclude,
                {{#fmcomponents}}
                include: utils.getExcludAndInclude().include,
                {{/fmcomponents}}
                use: [{
                    loader: 'happypack/loader?id=vue'
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: utils.assetsPath('images/[name].[ext]')
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('fonts/[name].[ext]')
                    }
                }]
            }
        ]
    },

    resolve: {
        extensions: ['.vue', '.js', '.json'],
        modules: [utils.resolve('node_modules')],
        alias: {
            '@src': utils.resolve('src'),
            '@components': utils.resolve('src/components'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    resolveLoader: {
        modules: [utils.resolve('node_modules')]
    },

    performance: {
        hints: false
    },

    stats: {
        children: false
    },

    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(env),
            CDN: JSON.stringify(cdn),
            API: JSON.stringify(api),
            BASE: JSON.stringify(base)
        }),

        new webpack.DllReferencePlugin({
            context: __dirname,
            // 引入 dll 生成的 manifest 文件
            manifest: utils.resolve('dist/vendor-manifest.json')
        }),

        // new AddAssetHtmlPlugin({
        //     filepath: utils.resolve('dist/*.dll.js')
        // }),

        new HappyPack(getHappyPackConfig({
            id: 'js',
            loaders: [{
                path: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            }] 
        })),

        new HappyPack(getHappyPackConfig({
            id: 'vue',
            loaders: ['vue-loader']
        })),

        // copy assets
        new CopyWebpackPlugin([
            { 
                context: '..', 
                from: 'static/**/*', 
                to: utils.resolve('dist'), 
                force: true,
                ignore: ['.*']
            }, 
            {
                context: '../src',
                from: 'assets/**/*',
                to: utils.resolve('dist'),
                force: true,
                ignore: ['.*']
            }
        ]),

        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            env: env,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
            }
        }),
        
        new MxWebpackContentReplacePlugin({
            src: /(https?:)?\/\/cdn\.followme\.com\/cdn/g,
            dest: cdn,
            exts: ['html', 'js', 'json', 'css']
        }),

        new ProgressBarPlugin()
    ]
};
