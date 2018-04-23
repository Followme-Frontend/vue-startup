const path = require('path');
const myIP = require('my-ip');

module.exports = {
    development: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../dist'),
        port: {{port}},
        clientIp: myIP(),
        assetsSubDirectory: 'static',
        cdn: '//cdn.fmfe.com',
        api: '//dev.fmfe.com',
        base: '//dev.fmfe.com',
        fmbase: '//dev.fmfe.com'
    },
    master: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        cdn: '//cdn.fmfe.com',
        api: '//dev.fmfe.com',
        base: '//dev.fmfe.com',
        fmbase: '//dev.fmfe.com'
    },
    alibeta: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../dist'),
        cdn: 'https://alibetacdn.followme.com',
        api: 'https://alibetawww.followme.com',
        base: 'https://alibetawww.followme.com',
        fmbase: 'https://alibetawww.followme.com'
    },
    production: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../dist'),
        cdn: 'https://cdn.followme.com',
        api: 'https://www.followme.com',
        base: 'https://trade.followme.com',
        fmbase: 'https://www.followme.com'
    }
};