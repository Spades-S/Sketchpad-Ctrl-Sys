const baseURL = require('../config').baseURL
const pageSize = require('../config').pageSize
const websiteModel = require('../model/website')


function init(router, verify) {
    router.get(`${baseURL}/websites/:page`, verify, async (ctx, next) => {

        let res = await websiteModel.getOnePageWebsite(Number(ctx.params.page), pageSize)

        ctx.body = res
        await next()
    })
}


module.exports = {
    init: init
}


