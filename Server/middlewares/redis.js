const Redis = require('ioredis')
const schedule = require('node-schedule')
const {redisConf} = require('../config')
const websiteModel = require('../model/website')
const penstatModel = require('../model/pen')

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


async function getWebsitesDataFromModel() {
    let websiteRows = await websiteModel.getAllWebsites()
    let websites = {
        indexArr: []
    }
    websiteRows.forEach(item => {
        websites[item.alias] = {
            id: item.id,
            name: item.name,
            today: 0,
            total: item.total,
            yesterday: item.yesterday
        }
        websites.indexArr.push(item.alias)
    })
    websites.num = websiteRows.length
    return websites
}

async function getPenStasFromModel() {
    let penStatRows = await penstatModel.getAllPenStats()
    let penstats = {
        indexArr: []
    }
    penStatRows.forEach(item => {
        penstats[item.ip] = {
            ip: item.ip,
            classname: item.classname,
            today: 0,
            total: item.total,
            yesterday: item.yesterday
        }
        penstats.indexArr.push(item.ip)
    })

    penstats.num = penStatRows.length
    penstats.orderBy = 'id'
    return penstats
}


async function redis(ctx, next) {
    if (!ctx.redis) {
        ctx.redis = new RedisStore()
    }
    if (!(await ctx.redis.get('websites'))) {
        let websites = await getWebsitesDataFromModel()
        await ctx.redis.set('websites', websites)
    }
    if (!(await ctx.redis.get('penstats'))) {
        let penstats = await getPenStasFromModel()
        await ctx.redis.set('penstats', penstats)
    }
    await next()
}

module.exports = redis