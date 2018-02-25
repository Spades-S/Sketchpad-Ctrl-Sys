const path = require('path')
module.exports = {
    baseURL: '/api/v1',
    debug: process.env.NODE_ENV === 'development',
    env: process.env.NODE_ENV || 'production',
    enableCompress: true,
    informImgDir: './static',
    pageSize: 8,
    port: 3000,
    redisConf: {
        port: 6379,
        host: '127.0.0.1'
    },
    secretKey: 'SketchPad',
    staticPath: path.resolve(__dirname, '../static'),
    viewPath: path.resolve(__dirname, '../view')
}