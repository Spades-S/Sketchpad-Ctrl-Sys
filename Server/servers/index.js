const koa = require('koa')
const config = require('../config')
const init = require('../common/init')
const middlewares = require('koa-middlewares')
const setRouters = require('../router')


const app = new koa()
const router = middlewares.router()
setRouters(router)

init(app)


app.use(middlewares.logger())
app.use(middlewares.staticCache(config.staticPath, {
    buffer: config.debug ? false : true,
    maxAge: config.debug ? 0 : 60 * 60 * 24 * 7,
    gzip: config.enableCompress
}))
app.use(middlewares.bodyParser())
app.use(router.routes())
    .use(router.allowedMethods());

if (!module.parent) {
    app.listen(config.port);
    logger.info('listening on port %s, the env is %s', config.port, config.env);
    logger.debug('You can debug your app with http://127.0.0.1:%s', config.port);
}


