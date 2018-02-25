const config = require('../config')
const Logger = require('./logger')
const {redisConf} = require('../config')
const KoaNunjucks = require('koa-nunjucks-2')
const onerror = require('koa-onerror')
const Redis = require('ioredis')


module.exports =  function (app) {
    Logger()
    //对ctx.onerror做hack，集中处理错误日志
    onerror(app)
    app.on('error', function (err, ctx) {
        logger.error(err)
    })
    app.use(KoaNunjucks({
        ext: 'html',
        path: config.viewPath,
        nunjucksConfig: {
            autoescape: true,
            watch: config.debug
        }
    }))
}