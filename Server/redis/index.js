const {redisConf} = require('../config')
const Redis = require('ioredis')


class RedisStore {
    constructor() {
        this.redis = new Redis(redisConf.port, redisConf.host)
    }

    async get (name) {
        let data = await this.redis.get(name)
        return JSON.parse(data)
    }

    async set (name, value, maxAge = 24 * 60 * 60 * 1000) {
        try {
            await this.redis.set(name, JSON.stringify(value), 'EX', maxAge / 1000);
        } catch (e) {
            console.log(e)
        }
    }

    async destroy(name) {
        return await this.redis.del(name)
    }
}

module.exports = RedisStore