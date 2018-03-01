<template>
    <div class="outer">
        <div class="inner">
            <div>
                <span class="logo"></span>
                <span class="title">通知推送</span>
            </div>
            <div class="present-inform" v-if="informPresent.img">
                <div class="left">
                    <div>当前推送</div>
                    <img class="img-present" :src="informPresent.img">
                    <div>点击  {{informPresent.clickNum}}  次</div>

                </div>
                <div class="right">
                    <div>指向的URL</div>
                    <div class="url-present">{{informPresent.url}}</div>
                    <input class="btn-clear" type="button" value="清空" @click="clearInformPres">
                </div>

            </div>
            <div class="present-inform" v-else>
                <div class="tip">当前没有通知</div>

            </div>
            <div class="add-inform">
                <div class="left">
                    <div class="container">
                        <div>上传推送</div>
                        <input type="file" id="file" accept="image/png,image/jpeg,image/jpg" @change="fileInputChange">
                        <label for="file" class="img-upload"></label>
                        <div class="file-size">{{informUpload.imageSize}}</div>
                    </div>
                </div>
                <div class="right">
                    <div>指向的URL</div>
                    <textarea id="url-upload" cols="30" rows="10"></textarea>
                    <input class="btn-clear" type="button" value="上传" @click="uploadInform">
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    const baseURL = require('../../config').baseURL
    import axios from '../utils/http'

    export default {
        data() {
            return {
                informPresent: {
                    img: '',
                    url: '',
                    clickNum: ''
                },
                informUpload: {
                    imageSize: '',
                    imageURL: ''
                }
            }
        },
        beforeCreate() {
            axios.get(`${baseURL}/informs/`)
                .then(res => {
                    if (res.data.status) {
                        this.informPresent.img = res.data.img
                        this.informPresent.url = res.data.url
                        this.informPresent.clickNum = res.data.clickNum
                    }

                }).catch(err => {
                console.log(err.response)
            })
        },
        methods: {
            clearInformPres() {
                this.informPresent.img = ''
                axios.delete(`${baseURL}/informs/`)
                    .then(res => {
                        console.log(res.data)

                    }).catch(err => {
                })
            },
            uploadInform() {
                let fileInputEle = $('#file')[0]
                let fileLabelEle = $('.img-upload')[0]
                let urlInputEle = $('#url-upload')[0]
                let img = fileInputEle.files[0]
                let url = urlInputEle.value.trim()

                if (!img) {
                    alert('请选择上传图像')
                    return
                }
                if (!url) {
                    alert('请输入需上传的URL')
                    return
                }

                let data = new FormData()
                data.append('img', img)
                data.append('url', url)


                axios.post(`${baseURL}/informs/`, data, {
                    headers: {'content-type': 'multipart/form-data'}
                }).then(res => {
                    this.informPresent.img = this.informUpload.imageURL
                    this.informPresent.url = url
                    this.informPresent.clickNum = 0
                    urlInputEle.value = ''
                    fileInputEle.value = ''
                    fileLabelEle.style.background = `url(${require('../assets/add.png')}) 4.5rem/4.5rem`
                    this.informUpload.imageSize = ''
                }).catch(err => {
                    console.log(err.response)
                })


            },
            fileInputChange() {
                let fileInputEle = $('#file')[0]
                let file = fileInputEle.files[0]
                let fileLabelEle = $('.img-upload')[0]
                if (window.FileReader) {
                    let reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = (e) => {
                        let image = new Image()
                        image.onload = () => {
                            this.informUpload.imageSize = `${image.width} x ${image.height}`
                        }
                        image.src = e.target.result
                        this.informUpload.imageURL = e.target.result
                        fileLabelEle.style.background = `url(${e.target.result})  center no-repeat`
                    }
                } else if (navigator.appName === 'Microsoft Internet Explorer') { // IE浏览器
                    fileLabelEle.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)';
                    fileLabelEle.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = file.value;
                }


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

    .present-inform .tip {
        margin-top: 4rem;
        font-size: 1rem;
        font-weight: 400;
        text-align: center;

    }

    .add-inform {
        .left {
            width: 30%;
            .container {
                width: 4.8rem;
                text-align: center;
            }
            .file-size {
                padding-left: 0.2rem;
                font-size: 0.7rem;
            }
        }
        .right {
            width: 70%;
            #url-upload {
                overflow: auto;
                display: block;
                width: 100%;
                font-size: 0.8rem;
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
        margin-bottom: 0.3rem;
        width: 4.5rem;
        height: 4.5rem;
        background: url(../assets/add.png) 4.5rem/4.5rem;
        cursor: pointer;
    }


</style>