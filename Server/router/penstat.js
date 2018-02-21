const baseURL = require('../config').baseURL
const pageSize = require('../config').pageSize
const penModel = require('../model/pen')


function init(router, vertify) {
    router.get(`${baseURL}/penstats/:orderBy/:page`, vertify, async ctx => {
        let res = await penModel.getOnePagePenStat(Number(ctx.params.page), pageSize, ctx.params.orderBy)
        ctx.body = res
    })
}

module.exports = {
    init: init
}