<template>
    <div class="header">
        <div>
            <a class="logo" href="/"></a>
            <span class="title">教学辅助软件后台系统</span>
        </div>
        <nav>
            <router-link to="/" class="item">首页</router-link>
            <router-link to="/penstat" class="item">画笔记录</router-link>
            <span class="item" @click="signOut">注销</span>
        </nav>
    </div>

</template>

<script>
    import cookie from '../utils/cookie'
    export default {
        name: 'Header',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods: {
            signOut() {
                try {
                    cookie.remove('TOKEN')
                } catch (err) {
                    console.log(err)
                }
                this.$router.push('login')
            }
        }
    }
</script>

<style scoped lang="scss" scoped>
    $headerBackground: #373a3d;
    $logoSize: 3rem;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 5rem;
        margin: 0;
        padding: 0 2rem;
        background: $headerBackground;
        .logo {
            display: inline-block;
            width: $logoSize;
            height: $logoSize;
            background: url(../assets/logo.png) $logoSize $logoSize;
            background-size: cover;
        }
        .title {
            font-size: 1.2rem;
            font-weight: 300;
            line-height: $logoSize;
            vertical-align: top;
            color: #fff;
        }
        .item {
            margin-left: 3rem;
            font-size: 0.9rem;
            font-weight: 300;
            line-height: $logoSize;
            text-decoration: none;
            vertical-align: top;
            color: #fff;
            cursor: pointer;
        }

    }

</style>
