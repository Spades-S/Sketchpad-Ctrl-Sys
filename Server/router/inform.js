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
            let data = fs.readFileSync(img.path, 'base64')
            fs.writeFileSync(imgDir, fs.readFileSync(img.path))
            await ctx.redis.set('informs', {
                status: true,
                img: `data:image/png;base64,${data}`,
                url: url,
                clickNum: 0
            })
        } catch (err) {
            ctx.throw(500, '上传失败')
        }
        fs.unlink(img.path, () => {
        })
        await informModel.addInform(url, imgDir)
        ctx.body = '上传成功'
    })

    router.get(`${baseURL}/informs`, async ctx => {
        if (!(await ctx.redis.get('informs'))) {
            let res = await informModel.findInform()
            if (!res.length) {
                await ctx.redis.set('informs', {
                    status: false
                })
            } else {
                let img = fs.readFileSync(res[0].imgdir, 'base64')
                await ctx.redis.set('informs', {
                    status: true,
                    img: `data:image/png;base64,${img}`,
                    url: res[0].url,
                    clickNum: res[0].clicknum
                })
            }
        }
        ctx.body = await ctx.redis.get('informs')
    })
    router.del(`${baseURL}/informs`, async ctx => {
        try {
            await ctx.redis.destroy('informs')
            await informModel.deleteInforms()
        } catch (err) {
            ctx.throw(500, err)
        }
        ctx.body = '当前通知已清空'
    })

    router.put(`${baseURL}/informs`, async ctx => {
        let informs = await ctx.redis.get('informs')
        informs.clickNum += 1
        await ctx.redis.set('informs', informs)
        ctx.body = true
    })

}


module.exports = {
    init: init
}









