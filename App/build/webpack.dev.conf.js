process.env.NODE_ENV = 'development'
const baseWebpackConf = require('./webpack.base.conf')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const utils = require('./utils')


const devWebpackConf = {
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        contentBase: utils.resolve('../static'),
        hot: true,
        open: true,
        publicPath: '/'
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCss: config.dev.usePostCss
        })
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: true
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
    ]
}

module.exports = WebpackMerge(baseWebpackConf, devWebpackConf)


