const query = require('./utils')

async function getUserPSW(userName) {
    let res = await query(`SELECT password FROM T_USER WHERE username = "${userName}"`)
    return res
}

async function changePSW(userName, newPSW) {
    let res = await query(`UPDATE T_USER SET password="${newPSW}" WHERE username="${userName}"`)
    return res
}

module.exports = {
    getUserPSW: getUserPSW,
    changePSW: changePSW
}

