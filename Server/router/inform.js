const baseURL = require('../config').baseURL
const informImgDir = require('../config').informImgDir
const informModel = require('../model/inform')
const fs = require('fs')


function init(router) {
    router.post(`${baseURL}/informs`, async ctx => {
        let img = ctx.request.body.files.img
        let url = ctx.request.body.fields.url
        let imgDir = `${informImgDir}/inform.png`
        try {
            fs.writeFileSync(imgDir, fs.readFileSync(img.path))
        } catch (err) {
            ctx.throw(500, '上传失败')
        }
        fs.unlink(img.path, () => {
        })
        await informModel.addInform(url, imgDir)
        ctx.body = '上传成功'
    })

    router.get(`${baseURL}/informs`, async ctx => {
        let res = await informModel.findInform()
        if (!res.length) {
            ctx.body = {
                status: false
            }
        } else {

            let img = fs.readFileSync(res[0].imgdir, 'base64')
            ctx.body = {
                status: true,
                img: `data:image/png;base64,${img}`,
                url: res[0].url,
                clickNum: res[0].clicknum
            }
        }
    })
    router.del(`${baseURL}/informs`, async ctx => {
        try {
            await informModel.deleteInforms()
        } catch (err) {
            ctx.throw(500, err)
        }
        ctx.body = '当前通知已清空'
    })

}


module.exports = {
    init: init
}









