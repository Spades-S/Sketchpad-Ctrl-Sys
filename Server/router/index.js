/**
 * created by Spades <spadesge@gmail.com> on 18/2/3
 */

const userRouter = require('./user')
const websiteRouter = require('./website')
const totalRouter = require('./total')
const penstatRouter = require('./penstat')
const informRouter = require('./inform')
const verify = require('../middlewares/verify')

function setRouters(router) {
    router.get('/', function (ctx, next) {

        return ctx.render('index')
    })
    userRouter.init(router)
    websiteRouter.init(router, verify)
    totalRouter.init(router, verify)
    penstatRouter.init(router, verify)
    informRouter.init(router)
}

module.exports = setRouters