const path = require('path')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
    assetsRoot: resolve('../../Server/static'),
    // axiosBaseurl: 'http://localhost:3000',
    axiosBaseurl: '/',
    build: {
        node_env: 'production',
        cssSourceMap: true,
        usePostCss: false,
        devtool: 'source-map',
        index: resolve('../../Server/static/index.html'),
        productionGzip: false
    },
    baseURL: '/api/v1',
    dev: {
        node_env: 'development',
        cssSourceMap: true,
        usePostCss: false
    },
    pageSize: 8,
    publicPath: '/',
    styleLang: 'scss'
}
