const baseURL = require('../config').baseURL
const pageSize = require('../config').pageSize

function init(router, verify) {
    router.get(`${baseURL}/websites/:page`, verify, async ctx => {
        let page = Number(ctx.params.page)
        let websites = await ctx.redis.get('websites')
        let res = {}
        let indexArr = websites.indexArr
        for (let i = (page - 1) * pageSize; i < page * pageSize && i < websites.num; i++) {
            res[indexArr[i]] = websites[indexArr[i]]
        }
        ctx.body = res
    })

    router.put(`${baseURL}/websites/:name`, async ctx => {
        let websites = await ctx.redis.get('websites')
        let name = ctx.params.name
        websites[name].total += 1
        websites[name].today += 1
        await ctx.redis.set('websites', websites)
        ctx.body = true
    })
}


module.exports = {
    init: init
}


