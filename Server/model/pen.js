const query = require('./utils')

async function getOnePagePenStat(page, size, orderBy) {
    let start = (page - 1) * size
    let end = page * size
    let res
    if (orderBy === 'id') {
        res = await query(`SELECT * FROM T_PEN LIMIT ${start},${end}`)
    } else {
        res = await query(`SELECT * FROM T_PEN  ORDER BY ${orderBy} DESC LIMIT ${start},${end}`)
    }
    return res
}

async function getIPArrByOrder(orderBy) {
    let rows = await query(`SELECT ip FROM T_PEN ORDER BY ${orderBy} DESC`)
    let res = []
    rows.forEach(item => {
        res.push(item.ip)
    })
    return res
}

async function getPenStatNum() {
    let res = await query(`SELECT * FROM T_PEN`)
    return res.length
}

async function getAllPenStats() {
    let res = await query(`SELECT * FROM T_PEN`)
    return res
}


module.exports = {
    getOnePagePenStat: getOnePagePenStat,
    getPenStatNum: getPenStatNum,
    getAllPenStats: getAllPenStats,
    getIPArrByOrder: getIPArrByOrder
}