const config = require('../config')
const resolve = require('./utils').resolve
const VueLoaderConf = require('./vue-loader.conf')
const Webpack = require('webpack')
module.exports = {
    context: resolve('../'),
    entry: {
        app: ['babel-polyfill', './src/index.js']
    },
    output: {
        path: config.assetsRoot,
        publicPath: config.publicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('../src/components')
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: VueLoaderConf
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('../src')]
        }, {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }]
    },
    plugins: [
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]

}