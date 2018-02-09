<template>
    <div class="outer">
        <div class="inner">
            <div>
                <span class="logo"></span>
                <span class="title">通知推送</span>
            </div>
            <div class="present-inform">
                <div class="left">
                    <div>当前推送</div>
                    <img class="img-present" :src="src">
                    <div>点击  {{clickNum}}  次</div>

                </div>
                <div class="right">
                    <div>指向的URL</div>
                    <div class="url-present">{{url}}</div>
                    <input class="btn-clear" type="button" value="清空">
                </div>

            </div>
            <div class="add-inform">
                <div class="left">
                    <div class="container">
                        <div>上传推送</div>
                        <input type="file" id="file">
                        <label for="file" class="img-upload"></label>
                        <div>363*189</div>
                    </div>
                </div>
                <div class="right">
                    <div>指向的URL</div>
                    <textarea id="url-upload" cols="30" rows="10"></textarea>
                    <input class="btn-clear" type="button" value="上传">
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                clickNum: 28,
                url: 'https://router.vuejs.org/zh-cn/essentials/named-views.html',
                src: require('../assets/testimg.png')
            }
        }
    }

</script>

<style lang="scss" scoped>
    $defaultColor: #565656;
    $contentBackground: #373a3d;
    $btnBackground: #494c50;
    $borderColor: #757272;
    $borderRadius: 0.5rem;
    $urlbtnRadius: 0.3rem;
    .outer {
        margin-left: 50%;
        margin-top: 4rem;
        width: 50%;
        color: #fff;

    }

    .inner {
        margin-left: 5%;
        margin-right: 5%;
    }

    .logo {
        display: inline-block;
        margin-left: 0.3rem;
        height: 1.3rem;
        width: 1.3rem;
        background: url(../assets/inform.png) center no-repeat;
    }

    .title {
        margin-left: 0.2rem;
        font-size: 0.9rem;
        vertical-align: top;
    }

    .present-inform,
    .add-inform {
        box-sizing: border-box;
        height: 10rem;
        width: 100%;
        margin-top: 1rem;
        padding: 0.5rem 8% 0 5%;
        font-size: 0;
        font-weight: 400;
        background: $contentBackground;
        -webkit-border-radius: $borderRadius;
        -moz-border-radius: $borderRadius;
        border-radius: $borderRadius;
        .left {
            width: 40%;
            .img-present {
                margin-top: 0.8rem;
                margin-bottom: 0.8rem;
                height: 4.5rem;
                width: 7rem;
            }
        }
        .right {
            width: 60%;
            .url-present,
            #url-upload {
                height: 4rem;
                margin-top: 0.8rem;
                margin-bottom: 0.8rem;
                padding: 0.3rem;
                word-break: break-all;
                background: $defaultColor;
                -webkit-border-radius: $urlbtnRadius;
                -moz-border-radius: $urlbtnRadius;
                border-radius: $urlbtnRadius;
            }
            .btn-clear {
                float: right;
                border-color: $btnBackground;
                border-radius: $urlbtnRadius;
                margin-right: -1rem;
                height: 1.5rem;
                width: 3rem;
                font-size: 0.7rem;
                background: $btnBackground;
                color: #fff;
                outline: none;
            }
        }
        .left,
        .right {
            display: inline-block;
            font-size: 0.8rem;
            vertical-align: top;
        }

    }

    .add-inform {
        .left {
            width: 30%;
            .container {
                width: 4.8rem;
                text-align: center;
            }
        }
        .right {
            width: 70%;
            #url-upload {
                display: block;
                width: 100%;
                font-size: 0.7rem;
                border: none;
                color: #fff;
                resize: none;
                outline: none;

            }
        }
    }

    input[type="file"] {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
    }

    .img-upload {
        display: inline-block;
        margin-top: 0.8rem;
        margin-bottom: 0.8rem;
        width: 4.5rem;
        height: 4.5rem;
        background: url(../assets/add.png) 4.5rem/4.5rem;
        cursor: pointer;

    }


</style>