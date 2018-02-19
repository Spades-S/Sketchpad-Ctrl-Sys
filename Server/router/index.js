/**
 * created by Spades <spadesge@gmail.com> on 18/2/3
 */

const userRouter = require('./user')
const websiteRouter = require('./website')
const verify = require('../middlewares/verify')

function setRouters(router) {
    router.get('/', function (ctx, next) {

        return ctx.render('index')
    })
    userRouter.init(router)
    websiteRouter.init(router, verify)

}

module.exports = setRouters