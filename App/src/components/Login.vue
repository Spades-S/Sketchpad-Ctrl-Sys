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
            <input type="text" placeholder="username" id="l-username" key="l-username">
            <input type="text" placeholder="password" id="l-password" key="l-psw"><br>
            <div class="verify-code">
                <div class="img-container">
                    <img :src="verifyCode" alt="">
                    <div class="vc-change" @click="getVerifyCode">看不清换一个</div>
                </div>
                <input type="text" placeholder="请输入验证码" id="l-verifycode" key="l-verifycode">
            </div>
            <input type="button" :value="loginMsg" @click="login">
        </div>
        <div class="content change" v-else>
            <div class="tip">Change password</div>
            <input type="text" placeholder="old password" id="c-oldpsw">
            <input type="text" placeholder="new password" id="c-newpsw" key="c-psw">
            <input type="text" placeholder="new password" id="c-newpsw2">
            <div class="verify-code">
                <div class="img-container">
                    <img :src="verifyCode" alt="">
                    <div class="vc-change" @click="getVerifyCode">看不清换一个</div>
                </div>
                <input type="text" placeholder="请输入验证码" id="c-verifycode" key="c-verifycode">
            </div>
            <input type="button" :value="changePSWMsg" @click="changePassword">
        </div>
    </div>
</template>

<script>
    const baseURL = require('../../config').baseURL
    import axios from '../utils/http'
    import cookie from '../utils/cookie'

    export default {
        props: ['isLogin'],
        data() {
            return {
                loginMsg: '登录',
                changePSWMsg: '更改密码',
                verifyCode: ''
            }
        },
        created() {
            this.getVerifyCode()
        },
        methods: {
            changePassword(e) {
                let option = {
                    userName: 'admin',
                    oldPSW: $('#c-oldpsw')[0].value.trim(),
                    newPSW: $('#c-newpsw')[0].value.trim(),
                    newPSW2: $('#c-newpsw2')[0].value.trim(),
                    verifyCode: $('#c-verifycode')[0].value.trim()
                }
                if (!option.oldPSW) {
                    this.addBuzz(e.target, '请输入原密码', false)
                    return
                } else if (!option.newPSW) {
                    this.addBuzz(e.target, '请输入新密码', false)
                    return
                } else if (!option.newPSW2) {
                    this.addBuzz(e.target, '请再次输入新密码', false)
                    return
                } else if (!option.verifyCode) {
                    this.addBuzz(e.target, '请输入验证码', false)
                    return
                }

                if (option.newPSW != option.newPSW2) {
                    this.addBuzz(e.target, '两次输入的新密码不一致', false)
                    this.getVerifyCode()
                    return
                }
                axios.put(`${baseURL}/users/changepsw`, {
                    data: {
                        ops: JSON.stringify(option)
                    }
                }).then(res => {
                    this.addBuzz(e.target, '密码修改成功', false, false)
                    setTimeout(() => {
                        cookie.remove('TOKEN')
                        this.$router.push('/login')
                        this.getVerifyCode()
                    }, 1000)

                }).catch(err => {
                    if (err.response.status === 401) {
                        this.addBuzz(e.target, err.response.data.error, false)
                        this.getVerifyCode()
                    }
                })
            },
            login(e) {
                let option = {
                    userName: $('#l-username')[0].value.trim(),
                    password: $('#l-password')[0].value.trim(),
                    verifyCode: $('#l-verifycode')[0].value.trim()
                }
                if (!option.userName) {
                    this.addBuzz(e.target, '用户名为空', true)
                    return
                } else if (!option.password) {
                    this.addBuzz(e.target, '密码为空', true)
                    return
                } else if (!option.verifyCode) {
                    this.addBuzz(e.target, '验证码为空', true)
                    return
                }
                axios.get(`${baseURL}/users/check`, {
                    params: {
                        ops: JSON.stringify(option)
                    }
                }).then(res => {
                    this.$router.push('/')

                }).catch(err => {
                    if (err.response.status === 401) {
                        this.addBuzz(e.target, err.response.data.error, true)
                        this.getVerifyCode()
                    }

                })

            },
            getVerifyCode() {
                axios.get(`${baseURL}/verifycode`)
                    .then(res => {
                        this.verifyCode = res.data
                    }).catch(err => {
                    console.log(err.response)
                })
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
        top: calc(50% - 12.5rem);
        left: calc(50% - 9rem);
        /*<!--transform: translate(-50%, -50%);-->*/
        width: 18rem;
        height: 25rem;
        text-align: center;
        background: rgba(212, 223, 234, 0.2784313725490196);
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
                padding-right: 0.9rem;

            }
            &[type="button"] {
                margin-top: 1rem;
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
                color: #e0e0e0;
            }
        }
        &.change input {
            margin-top: 1.5rem;
        }
        .ch-pw {
            display: inline-block;
            margin-top: 1rem;
            font-size: 0.5rem;
            border-bottom: 1px solid #a9b7d2;
            cursor: pointer;
        }

        .verify-code {
            display: inline-block;
            width: 12rem;
            padding-top: 1.3rem;
            padding-left: 0.8rem;
            .img-container {
                display: inline-block;
                float: left;
                width: 5rem;
                img {
                    display: inline-block;
                    width: 5rem;
                    height: 1.7rem;
                }
                .vc-change {
                    border-bottom: 1px solid;
                    margin: 0 0.7rem;
                    font-size: 10px;
                    text-align: center;
                    -moz-user-select: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    -khtml-user-select: none;
                    user-select: none;
                }
                .vc-change:hover {
                    cursor: pointer;
                }
            }

            input {
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;
                width: 5rem;
                height: 1.7rem;
                margin-top: 0;
                padding-left: 0.4rem;
                padding-right: 0.4rem;
                font-size: 13px;

            }

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