<template>
    <div class="container">
        <div>
            <span class="logo"></span>
            <span class="title">画笔激活统计</span>
        </div>
        <div class="content">
            <div class="row" @click="changeOrderBy">
                <span class="cell">IP地址</span>
                <span class="cell">教室</span>
                <span class="cell clickable yesterday">昨日激活次数<span
                        class="triangle yesterday"
                        :class={asc:isAsc.yesterday}></span></span>
                <span class="cell clickable today">今日激活次数<span class="triangle today"
                                                               :class={asc:isAsc.today}></span></span>
                <span class="cell clickable total">总激活次数<span class="triangle total"
                                                              :class={asc:isAsc.total}></span></span>
            </div>
            <div class="row" v-for="item in penStat">
                <span class="cell">{{item.ip}}</span>
                <span class="cell">{{item.classname}}</span>
                <span class="cell">{{item.yesterday}}</span>
                <span class="cell">{{item.today}}</span>
                <span class="cell">{{item.total}}</span>
            </div>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" :pageSize="pageSize"
                       :currentPage="currentPage"
                       @current-change="currentChange" v-if="total>pageSize">
        </el-pagination>
    </div>
</template>

<script>
    const pageSize = require('../../config').pageSize
    const baseURL = require('../../config').baseURL
    import axios from '../utils/http'

    export default {
        data() {
            return {
                currentPage: 1,
                isAsc: {
                    id: false,
                    yesterday: false,
                    today: false,
                    total: false
                },
                orderBy: 'id',
                pageSize: pageSize,
                penStat: [],
                total: 0
            }
        },
        created() {
            this.getRes(1)
            axios.get(`${baseURL}/total/penstats`)
                .then(res => {
                    this.total = res.data
                })
                .catch(err => {
                    console.log(err.response)
                    this.$router.push('/login')
                })

        },
        methods: {
            getRes(page) {
                axios.get(`${baseURL}/penstats/${this.orderBy}/${this.isAsc[this.orderBy]}/${page}`)
                    .then(res => {
                        this.penStat = res.data
                    })
                    .catch(err => {
                        console.log(err.response)
                        this.$router.push('/login')
                    })
            },
            currentChange(currentPage) {
                this.currentPage = currentPage
                this.getRes(currentPage)
            },
            changeOrderBy(e) {
                let orderBy, targetClassList
                targetClassList = e.target.classList
                if (targetClassList.contains('yesterday')) {
                    orderBy = 'yesterday'
                }
                if (targetClassList.contains('today')) {
                    orderBy = 'today'
                }
                if (targetClassList.contains('total')) {
                    orderBy = 'total'
                }
                if (this.orderBy != orderBy) {
                    this.orderBy = orderBy
                }
                this.currentPage = 1
                this.isAsc[this.orderBy] = !this.isAsc[this.orderBy]
                this.getRes(1)

            }
        }

    }

</script>

<style lang="scss" scoped>
    $contentBackground: #373a3d;
    $borderColor: #757272;
    $borderRadius: 0.5rem;
    @mixin triangle-down($size,$color) {
        display: inline-block;
        width: 0;
        height: 0;
        border-top: $size solid $color;
        border-left: ($size/2) solid transparent;
        border-right: ($size/2) solid transparent;
    }

    @mixin triangle-up($size,$color) {
        display: inline-block;
        width: 0;
        height: 0;
        border-bottom: $size solid $color;
        border-left: ($size/2) solid transparent;
        border-right: ($size/2) solid transparent;
    }

    .container {
        margin-top: 4rem;
        padding-left: 2rem;
        padding-right: 2rem;
        color: #fff;
        font-weight: 300;
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
            border-radius: $borderRadius;
            margin-top: 1rem;
            background: $contentBackground;
            font-size: 0.7rem;
            .row {
                height: 2.3rem;
                border-bottom: 1px solid $borderColor;
                &:last-child {
                    border-bottom: none;
                }
            }
            .cell {
                float: left;
                display: inline-block;
                width: 20%;
                min-width: 6rem;
                line-height: 2.3rem;
                text-align: center;
            }
            .triangle {
                @include triangle-down(0.5rem, #fff);
                &.asc {
                    @include triangle-up(0.5rem, #fff);
                    border-top: none;
                }
                margin-left: 0.3rem;
            }
            .clickable:hover {
                cursor: pointer;
                color: #bab7b7;
                .triangle {
                    border-top-color: #bab7b7;
                    border-bottom-color: #bab7b7;
                }
            }
        }

    }

    .el-pagination {
        margin-top: 3rem;
        text-align: center;
    }

</style>
