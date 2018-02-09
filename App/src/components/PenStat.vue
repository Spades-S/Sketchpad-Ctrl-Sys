<template>
    <div class="container">
        <div>
            <span class="logo"></span>
            <span class="title">画笔激活统计</span>
        </div>
        <div class="content">
            <div class="row">
                <span class="cell">IP地址</span>
                <span class="cell">教室</span>
                <span class="cell">昨日激活次数</span>
                <span class="cell">今日激活次数</span>
                <span class="cell">总激活次数</span>
            </div>
            <div class="row" v-for="n in num">
                <span class="cell">10.10.103.24</span>
                <span class="cell">东区303</span>
                <span class="cell">18</span>
                <span class="cell">81</span>
                <span class="cell">188</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                num: [1, 2, 3, 4, 5, 6, 7, 8]
            }
        }
    }

</script>

<style lang="scss" scoped>
    $contentBackground: #373a3d;
    $borderColor: #757272;
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
            margin-top: 1rem;
            background: $contentBackground;
            font-size: 0.7rem;
            .row {
                display: flex;
                border-bottom: 1px solid $borderColor;
            }
            .cell {
                flex: 1 1 auto;
                display: inline-block;
                width: 6rem;
                line-height: 2.3rem;
                text-align: center;
            }
        }
    }

</style>
