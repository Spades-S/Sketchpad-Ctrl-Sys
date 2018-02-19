const baseURL = require('../config').baseURL
const websiteModel = require('../model/website')


function init(router, vertify) {
    router.get(`${baseURL}/websites`, vertify, async ctx => {

        let res = await websiteModel.getWebsite()
        ctx.body = res
    })
}


module.exports = {
    init: init
}


