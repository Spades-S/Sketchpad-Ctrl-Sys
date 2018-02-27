const baseURL = require('../config').baseURL

function init(router, vertify) {
    router.get(`${baseURL}/total/websites`, vertify, async ctx => {
        let num = (await ctx.redis.get('websites')).num
        ctx.body = num
    })
    router.get(`${baseURL}/total/penstats`, vertify, async ctx => {
        let num = (await ctx.redis.get('penstats')).num
        ctx.body = num
    })
}

module.exports = {
    init: init
}


