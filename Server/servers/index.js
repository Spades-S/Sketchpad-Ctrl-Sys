/**
 * created by Spades <spadesge@gmail.com> on 18/2/3
 */
const koa = require('koa')
const koaBody = require('koa-body')
const middlewares = require('koa-middlewares')
const Router = require('koa-router')
const redisMiddleware = require('../middlewares/redis')
const config = require('../config')
const init = require('../common/init')
const setRouters = require('../router')


const app = new koa()
const router = new Router()

setRouters(router)

init(app)


app.use(middlewares.logger())
app.use(middlewares.staticCache(config.staticPath, {
    buffer: config.debug ? false : true,
    maxAge: config.debug ? 0 : 60 * 60 * 24 * 7,
    gzip: config.enableCompress
}))

app.use(redisMiddleware)


// 配置跨域
if (config.env === 'development') {
    app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
        ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
        ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
        ctx.set('Access-Control-Allow-Credentials', 'true')
        await next()
    })
}

app.use(koaBody({multipart: true}))
app.use(router.routes())
    .use(router.allowedMethods());


if (!module.parent) {
    app.listen(config.port);
    logger.info('listening on port %s, the env is %s', config.port, config.env);
    logger.debug('You can debug your app with http://127.0.0.1:%s', config.port);
}


