const path = require('path')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
    assetsRoot: resolve('../../Server/static'),
    axiosBaseurl: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000',
    build: {
        node_env: 'production',
        cssSourceMap: true,
        usePostCss: false,
        devtool: 'source-map',
        index: resolve('../../Server/view/index.html'),
        productionGzip: false
    },
    baseURL: '/api/v1',
    dev: {
        node_env: 'development',
        cssSourceMap: true,
        usePostCss: false
    },
    publicPath: '/',
    styleLang: 'scss'
}