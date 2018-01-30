const path = require('path')

module.exports = {
    debug: process.env.NODE_ENV === 'development',
    env: process.env.NODE_ENV || 'production',
    enableCompress: true,
    port: 3000,
    staticPath: path.resolve(__dirname, '../static'),
    viewPath: path.resolve(__dirname, '../view')
}