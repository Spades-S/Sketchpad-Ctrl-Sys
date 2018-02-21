const query = require('./utils')

async function addInform(url, imgDir) {
    await deleteInforms()
    await query(`INSERT INTO T_INFORM (url,imgdir) VALUES ('${url}', '${imgDir}')`)
}


async function deleteInforms() {
    await query(`DELETE FROM T_INFORM`)
}


async function findInform() {
    let res = await query(`SELECT * FROM T_INFORM`)
    return res
}

module.exports = {
    addInform: addInform,
    deleteInforms: deleteInforms,
    findInform: findInform
}