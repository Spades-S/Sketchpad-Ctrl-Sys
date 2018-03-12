const baseURL = require('../config').baseURL
const fs = require('fs')
const cpatcha = require('trek-captcha')

function init(router) {
    router.get(`${baseURL}/verifycode`, async ctx => {
        const {token, buffer} = await cpatcha()
        await ctx.redis.set('verifycode', token)
        ctx.body = `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`
    })
}


module.exports = {
    init: init
}