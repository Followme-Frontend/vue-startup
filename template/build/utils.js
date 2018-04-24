const path = require('path');

const config = require('../config');
const env = process.env.NODE_ENV || 'development';

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

function assetsPath (_path) {
    const assetsSubDirectory = config[env].assetsSubDirectory || 'static';
    return path.posix.join(assetsSubDirectory, _path);
}

function extractCSS (opts) {
    // only support css/less
    const options = opts || {};
    const loaderKey = env === 'development' ? 'loader' : 'path';
    const optionsKey = env === 'development' ? 'options' : 'query';

    const cssLoader = {
        [loaderKey]: 'css-loader',
        [optionsKey]: {
            minimize: env !== 'development',
            sourceMap: env === 'development'
        }
    };

    const postcssLoader = {
        [loaderKey]: 'postcss-loader',
        [optionsKey]: {
            sourceMap: env === 'development'
        }
    };

    const lessLoader = {
        [loaderKey]: 'less-loader',
        [optionsKey]: {
            sourceMap: env === 'development'
        }
    };

    const loaders = [cssLoader, postcssLoader, lessLoader];

    if (env === 'development') {
        return ['vue-style-loader'].concat(loaders);
    } else {
        return loaders;
    }
}

function getExcludAndInclude () {
    let exclude = /node_modules/;
    let include = [];
    {{#fmcomponents}}
    include = [
        resolve('src'),
        resolve('node_modules/fmcomponents/src/')
    ];
    exclude = function (modulePath) {
        return /node_modules/.test(modulePath) &&
            !/node_modules\/fmcomponents/.test(modulePath);
    };
    {{/fmcomponents}}

    return {
        exclude: exclude,
        include: include
    };
}

module.exports = {
    resolve: resolve,
    assetsPath: assetsPath,
    extractCSS: extractCSS,
    getExcludAndInclude: getExcludAndInclude
};
