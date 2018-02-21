<template>
    <div>
        <div class="container">
            <div class="mask"></div>
        </div>
        <div class="title">
            <span class="logo"></span>
            <span class="title">教学辅助软件后台系统</span>
        </div>
        <div class="content" v-if="isLogin">
            <div class="tip">Welcome</div>
            <input type="text" placeholder="username" id="l-username">
            <input type="text" placeholder="password" id="l-password" key="l-psw">
            <input type="button" :value="loginMsg" @click="login">
            <div><span class="ch-pw" @click="toChangePassword">更改密码</span></div>

        </div>
        <div class="content change" v-else>
            <div class="tip">Change password</div>
            <input type="text" placeholder="username" id="c-username">
            <input type="text" placeholder="old password" id="c-oldpsw" key="c-psw">
            <input type="text" placeholder="new password" id="c-newpsw">
            <input type="button" :value="changePSWMsg" @click="changePassword">
            <div><span class="ch-pw" @click="toLogin">登录</span></div>

        </div>
    </div>
</template>

<script>
    const baseURL = require('../../config').baseURL
    import axios from '../utils/http'
    import cookie from '../utils/cookie'

    export default {
        data() {
            return {
                isLogin: true,
                loginMsg: '登录',
                changePSWMsg: '更改密码'
            }
        },
        methods: {
            changePassword(e) {
                let _this = this
                let option = {
                    userName: $('#c-username')[0].value.trim(),
                    oldPSW: $('#c-oldpsw')[0].value.trim(),
                    newPSW: $('#c-newpsw')[0].value.trim()
                }
                if (!option.userName) {
                    _this.addBuzz(e.target, '用户名为空')
                    return
                } else if (!option.oldPSW) {
                    _this.addBuzz(e.target, '原密码为空')
                    return
                } else if (!option.newPSW) {
                    _this.addBuzz(e.target, '新密码为空')
                    return
                }
                axios.put(`${baseURL}/users/changepsw`, {
                    data: {
                        ops: JSON.stringify(option)
                    }
                }).then(res => {
                    _this.addBuzz(e.target, '密码修改成功', false, false)
                    setTimeout(() => {
                        _this.toLogin()
                    }, 1000)

                }).catch(err => {
                    if (err.response.status === 401) {
                        _this.addBuzz(e.target, err.response.data.error, false)
                    }
                })
            },
            login(e) {
                let _this = this
                let option = {
                    userName: $('#l-username')[0].value.trim(),
                    password: $('#l-password')[0].value.trim()
                }
                if (!option.userName) {
                    _this.addBuzz(e.target, '用户名为空')
                    return
                } else if (!option.password) {
                    _this.addBuzz(e.target, '密码为空')
                    return
                }
                axios.get(`${baseURL}/users/check`, {
                    params: {
                        ops: JSON.stringify(option)
                    }
                }).then(res => {
                    _this.$router.push('/')

                }).catch(err => {
                    if (err.response.status === 401) {
                        _this.addBuzz(e.target, err.response.data.error, true)
                    }

                })

            },
            toLogin() {
                this.isLogin = true
            },
            toChangePassword(e) {
                this.isLogin = false
            },
            addBuzz(ele, msg, isLogin, isErr = true) {
                if (isLogin) {
                    this.loginMsg = msg
                } else {
                    this.changePSWMsg = msg
                }
                ele.classList.add('shake')
                if (!isErr) {
                    ele.classList.add('green')
                }
                setTimeout(() => {
                    ele.classList.remove('shake')
                    if (!isErr) {
                        ele.classList.remove('green')
                    }
                    if (isLogin) {
                        this.loginMsg = '登录'
                    } else {
                        this.changePSWMsg = '更改密码'
                    }
                }, 1000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    $contentBackground: #373a3d;
    $borderColor: #757272;
    .container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #d9d9d9 url(../assets/loginbackground.png) center;
        filter: blur(6px);
        .mask {
            width: 100%;
            height: 100%;
            background: rgba(53, 53, 53, 0.57843137254901963);
        }
    }

    .title {
        position: absolute;
        top: 10%;
        left: 0;
        right: 0;
        font-size: 1.5rem;
        text-align: center;
        color: #fff;
    }

    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 18rem;
        height: 25rem;
        text-align: center;
        background: linear-gradient(to bottom right, rgba(212, 223, 234, 0.2784313725490196), rgba(97, 97, 97, 0.23921568627450981));
        border-radius: 0.6rem;
        color: #fff;
        .tip {
            margin-top: 2rem;
            font-size: 1rem;
            font-weight: 400;
        }
        input {
            box-sizing: border-box;
            border: none;
            margin-top: 2rem;
            height: 2rem;
            width: 12rem;
            font-size: 0.8rem;
            background: rgba(212, 223, 234, 0.2784313725490196);
            border: 1px solid #a9b7d2;
            border-radius: 1rem;
            color: #fff;
            outline: none;
            &[type="text"] {
                padding-left: 0.9rem;

            }
            &[type="button"] {
                color: #fff;
                cursor: pointer;
                &:hover {
                    border-color: #fff;
                }
            }
            &:focus {
                border-color: #fff;
            }
            &::placeholder {
                color: #d4d4d4;
            }

        }
        .ch-pw {
            display: inline-block;
            margin-top: 1rem;
            font-size: 0.5rem;
            border-bottom: 1px solid #a9b7d2;
            cursor: pointer;
        }
        input.shake {
            animation: buzz-out 1s ease;
            color: #ff0000;
            &.green {
                color: #24dc24;
            }
        }
        @keyframes buzz-out {
            0% {
                transform: translateX(3px);
            }
            5% {
                transform: translateX(-3px);
            }
            10% {
                transform: translateX(3px);
            }
            15% {
                transform: translateX(-3px);
            }
            20% {
                transform: translateX(3px);
            }
            25% {
                transform: translateX(0px);
            }
            100% {
                transform: translateX(0px);
            }
        }
    }


</style>