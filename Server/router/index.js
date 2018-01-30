function setRouters(router) {
    router.get('/', function* () {
        yield this.render('index')
    })
}
module.exports = setRouters;