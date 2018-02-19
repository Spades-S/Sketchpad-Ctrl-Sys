function findIndex(name) {
    let start = document.cookie.indexOf(`${name}=`)
    if (start < 0) {
        return {
            start: -1,
            end: -1
        }
    }
    let end = document.cookie.indexOf(';', start)
    if (end < 0) {
        end = document.cookie.length
    }
    return {
        start: start,
        end: end
    }
}

function getCookie(name) {
    let index = findIndex(name)
    if (index.start < 0) {
        return -1
    }
    return document.cookie.substring(index.start, index.end)
}

function removeCookie(name) {
    let index = findIndex(name)
    if (index.start < 0) {
        throw new Error(`没有${name}-cookie`)
    }
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    document.cookie = name + "=" + document.cookie.substring(index.start, index.end) + ";expires=" + exp.toGMTString();
}

export default {
    get: getCookie,
    remove: removeCookie
}