const config = require('../config')
const Logger = require('egg-logger').Logger
const FileTransport = require('egg-logger').FileTransport
const ConsoleTransport = require('egg-logger').ConsoleTransport
const utils = require('utility')

const path = require('path')

function fileFormatter(content) {
    return content.date + '  ' + content.level + '  ' + content.pid + '  ' + content.message
}

const logger = new Logger();
logger.set('file.info', new FileTransport({
    file: path.resolve(__dirname,'../logs/info.'+utils.YYYYMMDD()+'.log'),
    level: 'INFO',
    formatter:fileFormatter
}))
logger.set('info.error', new FileTransport({
    file: path.resolve(__dirname,'../logs/error.'+utils.YYYYMMDD()+'.log'),
    level: 'ERROR',
    formatter:fileFormatter
}))
logger.set('console', new ConsoleTransport({
    level: config.debug? 'ALL':'INFO'
}))


module.exports = function() {
    global.logger = logger
}
