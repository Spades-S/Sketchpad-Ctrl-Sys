<template>
    <div class="header">
        <div>
            <a class="logo" href="/"></a>
            <span class="title">教学辅助软件后台系统</span>
        </div>
        <nav>
            <router-link to="/" class="item">首页</router-link>
            <router-link to="/penstat" class="item">画笔记录</router-link>
            <img src="../assets/user.png" alt="" width="25px" class="item">
            <div class="item user">
                <div> admin</div>
                <div class="button">
                    <div @click="signOut">注销</div>
                    <router-link to="chpsw">修改密码</router-link>
                </div>
            </div>
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
        height: 5rem;
        margin: 0;
        padding: 0 2rem;
        background: $headerBackground;
        & > div {
            float: left;
            margin-top: 1rem;
        }
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
        & > nav {
            float: right;
            margin-top: 1rem;

        }
        img {
            position: relative;
            top: 0.8rem;
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
            &.user {
                display: inline-block;
                width: 4rem;
                margin-top: 0.65rem;
                margin-left: 0;
                line-height: 1.7rem;
                .button {
                    overflow: hidden;
                    height: 0;
                    padding-left: 0.5rem;
                    font-size: 15px;
                    line-height: 1.4rem;
                    -webkit-transition: height 0.5s ease;
                    -moz-transition: height 0.5s ease;
                    -ms-transition: height 0.5s ease;
                    -o-transition: height time;
                    transition: height time;
                    a {
                        color: #fff;
                        text-decoration: none;
                        &:hover {
                            color: #c4c4c4;
                        }
                    }
                    div:hover {
                        color: #c4c4c4;
                    }
                }
                &:hover {
                    background: rgba(212, 223, 234, 0.1784313725490196);
                    background: linear-gradient(to bottom, rgba(212, 223, 234, 0.2784313725490196), rgba(212, 223, 234, 0.06));;
                    .button {
                        height: 4rem;
                    }
                }
            }

        }

    }

</style>
