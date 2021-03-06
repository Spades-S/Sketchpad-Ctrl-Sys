const query = require('./utils')

async function getAllWebsites() {
    let res = await query(`SELECT * FROM T_WEBSITE`)
    return res
}

async function getOnePageWebsite(page, size) {
    let start = (page - 1) * size
    let end = page * size
    let res = await query(`SELECT * FROM T_WEBSITE LIMIT ${start},${end}`)
    return res
}

async function getWebsiteNum() {
    let res = await query(`SELECT * FROM T_WEBSITE`)
    return res.length
}


module.exports = {
    getAllWebsites: getAllWebsites,
    getOnePageWebsite: getOnePageWebsite,
    getWebsiteNum: getWebsiteNum
}