const baseURL = require('../config').baseURL

function init(router, verify) {
    router.get(`${baseURL}/token/check`, verify, (ctx) => {

    })

}


module.exports = {
    init: init
}