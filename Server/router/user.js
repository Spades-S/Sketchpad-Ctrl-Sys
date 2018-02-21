const baseURL = require('../config').baseURL
const secretKey = require('../config').secretKey
const userModel = require('../model/user')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

function init(router) {
    router.get(`${baseURL}/users/check`, async (ctx) => {
        let ops = JSON.parse(ctx.query.ops)
        let rowData = await userModel.getUserPSW(ops.userName)
        if (rowData.length > 0) {
            let password = rowData[0].password
            let hash = crypto.createHash('sha256')
            hash.update(ops.password)
            let hasAccess = hash.digest('hex') == password
            if (hasAccess) {
                let token = jwt.sign({
                        data: ops.userName
                    },
                    secretKey, {
                        expiresIn: '1 day'
                    }
                )
                ctx.cookies.set('TOKEN', token, {
                    httpOnly: false
                })
                ctx.body = '登录成功'
            } else {
                ctx.throw(401, '密码错误')

            }
        } else {
            ctx.throw(401, '用户名错误')
        }
    })
    router.put(`${baseURL}/users/changepsw`, async (ctx) => {
        let ops = JSON.parse(ctx.request.body.data.ops)
        let rowData = await userModel.getUserPSW(ops.userName)
        if (rowData.length > 0) {
            let password = rowData[0].password
            let hash = crypto.createHash('sha256')
            hash.update(ops.oldPSW)
            let hasAccess = hash.digest('hex') == password
            if (hasAccess) {
                let hash1 = crypto.createHash('sha256')
                hash1.update(ops.newPSW)
                let res = await userModel.changePSW(ops.userName, hash1.digest('hex'))
                ctx.body = '密码修改成功'

            } else {
                ctx.throw(401, '密码错误')
            }
        } else {
            ctx.throw(401, '用户名错误')
        }
    })
}

module.exports = {
    init: init
}