const baseURL = require('../config').baseURL
const websiteModel = require('../model/website')
const penModel = require('../model/pen')


function init(router, vertify) {
    router.get(`${baseURL}/total/websites`, vertify, async ctx => {
        let num = await websiteModel.getWebsiteNum()
        ctx.body = num
    })
    router.get(`${baseURL}/total/penstats`, vertify, async ctx => {
        let num = await penModel.getPenStatNum()
        ctx.body = num
    })
}


module.exports = {
    init: init
}


