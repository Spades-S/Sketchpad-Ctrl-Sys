const baseURL = require('../config').baseURL
const pageSize = require('../config').pageSize
const penModel = require('../model/pen')


function init(router, vertify) {
    router.get(`${baseURL}/penstats/:orderBy/:page`, vertify, async ctx => {
        let penstats = await ctx.redis.get('penstats')
        let orderBy = ctx.params.orderBy
        let page = Number(ctx.params.page)
        let indexArr = penstats.indexArr

        if (orderBy != penstats.orderBy) {
            if (orderBy === 'id' || orderBy === 'yesterday') {
                indexArr = await penModel.getIPArrByOrder(orderBy)
            } else {
                let sortArr = []
                indexArr.forEach(item => {
                    sortArr.push({
                        ip: item,
                        orderBy: penstats[item][orderBy]
                    })
                })
                sortArr.sort((a, b) => {
                    return b.orderBy - a.orderBy
                })
                indexArr = []
                sortArr.forEach(item => {
                    indexArr.push(item.ip)
                })
            }
            penstats.indexArr = indexArr
            penstats.orderBy = orderBy
            await ctx.redis.set('penstats', penstats)
        }
        let res = {}
        for (let i = (page - 1) * pageSize; i < page * pageSize && i < penstats.num; i++) {
            res[indexArr[i]] = penstats[indexArr[i]]
        }
        ctx.body = res

    })
    router.put(`${baseURL}/penstats/:ip`, async ctx => {
        let ip = ctx.params.ip
        let penstats = await ctx.redis.get('penstats')
        penstats[ip].total += 1
        penstats[ip].today += 1
        await ctx.redis.set('penstats', penstats)
        ctx.body = true
    })
}

module.exports = {
    init: init
}