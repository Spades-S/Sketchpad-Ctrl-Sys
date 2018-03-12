const config = require('../config')
const Logger = require('./logger')
const KoaNunjucks = require('koa-nunjucks-2')
const onerror = require('koa-onerror')
const RedisStore = require('../redis')
const schedule = require('node-schedule')
const informModel = require('../model/inform')
const query = require('../model/utils')

let redis = new RedisStore()

//重启服务，清空redis
async function initRedis() {
    await updateDateSource()
    if(process.env.MODE == 'clear'){
        if(await redis.get('websites')){
            await redis.destroy('websites')
        }
        if(await redis.get('informs')){
            await redis.destroy('informs')
        }

        if(await redis.get('penstats')){
            await redis.destroy('penstats')
        }
    }

}

initRedis().then(() => {
})

/**
 * 更新数据源
 * @param onlyMysql boolean ture:只更新mysql数据，不更新redis，默认true
 * @returns {Promise.<void>}
 */
async function updateDateSource(onlyMysql = true) {
    //更新数据库数据
    let informs = await redis.get('informs')
    if (informs && informs.status) {
        await informModel.updateClickNum(informs.clickNum)
    }
    let websites = await redis.get('websites')
    let updateWBTotalSql = `SET total = CASE alias `
    let updateWBYestdSql = `yesterday = CASE alias `
    let clauseWBSql = `WHERE alias IN (`
    websites.indexArr.forEach((item, index) => {
        if (index === (websites.num - 1)) {
            clauseWBSql = clauseWBSql + `'${item}')`
            if (!onlyMysql) {
                updateWBTotalSql = updateWBTotalSql + `WHEN '${item}' THEN '${websites[item].total}' END,`
            } else {
                updateWBTotalSql = updateWBTotalSql + `WHEN '${item}' THEN '${websites[item].total}' END `

            }
            updateWBYestdSql = updateWBYestdSql + `WHEN '${item}' THEN '${websites[item].today}' END `
        } else {
            clauseWBSql = clauseWBSql + `'${item}',`
            updateWBTotalSql = updateWBTotalSql + `WHEN '${item}' THEN '${websites[item].total}' `
            updateWBYestdSql = updateWBYestdSql + `WHEN '${item}' THEN '${websites[item].today}' `
        }
        if (!onlyMysql) {
            websites[item].yesterday = websites[item].today
            websites[item].today = 0
        }
    })


    let penstats = await redis.get('penstats')
    let updatePSTotalSql = `SET total = CASE ip `
    let updatePSYestdSql = `yesterday = CASE ip `
    let clausePSSql = `WHERE ip IN (`
    penstats.indexArr.forEach((item, index) => {
        if (index === (penstats.num - 1)) {
            clausePSSql = clausePSSql + `'${item}')`
            if (!onlyMysql) {
                updatePSTotalSql = updatePSTotalSql + `WHEN '${item}' THEN '${penstats[item].total}' END,`
            } else {
                updatePSTotalSql = updatePSTotalSql + `WHEN '${item}' THEN '${penstats[item].total}' END `
            }
            updatePSYestdSql = updatePSYestdSql + `WHEN '${item}' THEN '${penstats[item].today}' END `
        } else {
            clausePSSql = clausePSSql + `'${item}',`
            updatePSTotalSql = updatePSTotalSql + `WHEN '${item}' THEN '${penstats[item].total}' `
            updatePSYestdSql = updatePSYestdSql + `WHEN '${item}' THEN '${penstats[item].today}' `
        }
        if (!onlyMysql) {
            penstats[item].yesterday = penstats[item].today
            penstats[item].today = 0
        }
    })
    if (!onlyMysql) {
        await query(`UPDATE T_WEBSITE ` + updateWBTotalSql + updateWBYestdSql + clauseWBSql)
        await query(`UPDATE T_PEN ` + updatePSTotalSql + updatePSYestdSql + clausePSSql)
        await redis.set('websites', websites)
        await redis.set('penstats', penstats)
    } else {
        await query(`UPDATE T_WEBSITE ` + updateWBTotalSql + clauseWBSql)
        await query(`UPDATE T_PEN ` + updatePSTotalSql + clausePSSql)
    }


}

//0时写入数据库，清空redis中的`websites` `penstats`数据
schedule.scheduleJob('0 * * *', function () {
    (async function () {
        await updateDateSource(false)
    })().then(()=>{})
})


module.exports = function (app) {
    Logger()
    //对ctx.onerror做hack，集中处理错误日志
    onerror(app)
    app.on('error', function (err, ctx) {
        logger.error(err)
    })
    app.use(KoaNunjucks({
        ext: 'html',
        path: config.viewPath,
        nunjucksConfig: {
            autoescape: true,
            watch: config.debug
        }
    }))
}