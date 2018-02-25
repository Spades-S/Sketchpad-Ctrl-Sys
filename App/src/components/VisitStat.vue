<template>
    <div class="outer">
        <div class="inner">
            <div>
                <span class="logo"></span>
                <span class="title">网站统计访问</span>
            </div>
            <div class="content">
                <div class="row">
                    <span class="cell">序号</span>
                    <span class="cell">网站</span>
                    <span class="cell">昨日访问量</span>
                    <span class="cell">历史访问量</span>
                </div>
                <div class="row" v-for="item in website">
                    <span class="cell">{{item.id}}</span>
                    <span class="cell">{{item.name}}</span>
                    <span class="cell">{{item.yesterday}}</span>
                    <span class="cell">{{item.total}}</span>
                </div>
            </div>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" :pageSize="pageSize"
                       @current-change="currentChange" v-if="total > pageSize">
        </el-pagination>
    </div>
</template>
<script>
    const baseURL = require('../../config').baseURL
    const pageSize = require('../../config').pageSize
    import axios from '../utils/http'

    export default {
        data() {
            return {
                website: [],
                pageSize: pageSize,
                total: 0
            }
        },
        created() {
            this.getRes(1)
            axios.get(`${baseURL}/total/websites`)
                .then(res => {
                    this.total = res.data
                })
                .catch(err => {
                    this.$router.push('/login')
                })
        },
        methods: {
            getRes(page) {
                axios.get(`${baseURL}/websites/${page}`)
                    .then(res => {
                        this.website = res.data
                    })
                    .catch(err => {
                        this.$router.push('/login')
                    })
            },
            currentChange(currentPage) {
                this.getRes(currentPage)

            }
        }
    }
</script>
<style lang='scss' scoped>
    $contentBackground: #373a3d;
    $borderColor: #757272;
    $borderRadius: 0.5rem;

    .outer {
        float: left;
        width: 50%;
        color: #fff;
    }

    .inner {
        margin-left: 6%;
        margin-right: 6%;
    }

    .logo {
        display: inline-block;
        margin-left: 0.3rem;
        height: 1.3rem;
        width: 1.3rem;
        background: url(../assets/pen.png) center 1.3rem/1.3rem;
    }

    .title {
        font-size: 0.9rem;
        vertical-align: top;
    }

    .content {
        display: inline-block;
        margin-top: 1rem;
        width: 100%;
        background: $contentBackground;
        -webkit-border-radius: $borderRadius;
        -moz-border-radius: $borderRadius;
        border-radius: $borderRadius;
        font-size: 0.7rem;
        .row {
            display: flex;
            border-bottom: 1px solid $borderColor;
            &:last-child {
                border-bottom: none;
            }
        }
        .cell {
            flex: 1 1 auto;
            display: inline-block;
            width: 25%;
            line-height: 2.3rem;
            text-align: center;
        }
    }

    .el-pagination {
        /*position: absolute;*/
        /*left: 0;*/
        /*right: 50%;*/
        /*top: 34rem;*/
        margin-top: 2rem;
        text-align: center;
    }


</style>