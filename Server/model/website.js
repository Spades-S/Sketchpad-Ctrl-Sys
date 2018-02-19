const query = require('./utils')

async function getWebsite() {
    let res = await query(`SELECT * FROM T_WEBSITE`)
    return res
}


module.exports = {
    getWebsite: getWebsite
}