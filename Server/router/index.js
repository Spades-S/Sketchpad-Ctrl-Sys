/**
 * created by Spades <spadesge@gmail.com> on 18/2/3
 */

const userRouter = require('./user')
const websiteRouter = require('./website')
const totalRouter = require('./total')
const penstatRouter = require('./penstat')
const informRouter = require('./inform')
const verify = require('../middlewares/verify')
const verifycode = require('./verifycode')

function setRouters(router) {
    router.get('/', function (ctx, next) {

        return ctx.render('index')
    })
    userRouter.init(router, verify)
    websiteRouter.init(router, verify)
    totalRouter.init(router, verify)
    penstatRouter.init(router, verify)
    informRouter.init(router)
    verifycode.init(router)
}

module.exports = setRouters