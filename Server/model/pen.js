const query = require('./utils')

async function getOnePagePenStat(page, size, orderBy) {
    let start = (page - 1) * size
    let end = page * size
    let res
    if (orderBy === 'id') {
        res = await query(`SELECT * FROM T_PEN LIMIT ${start},${end}`)
    }else{
        res = await query(`SELECT * FROM T_PEN  ORDER BY ${orderBy} DESC LIMIT ${start},${end}`)
    }
    return res
}

async function getPenStatNum() {
    let res = await query(`SELECT * FROM T_PEN`)
    return res.length
}


module.exports = {
    getOnePagePenStat: getOnePagePenStat,
    getPenStatNum: getPenStatNum
}