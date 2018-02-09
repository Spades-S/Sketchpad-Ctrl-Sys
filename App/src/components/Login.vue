<template>
    <div class="container">
        <div class="content">
            <input type="text" placeholder="username">
            <input type="text" placeholder="password">
            <input type="button" value="登录">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                test: ''
            }
        }

    }
</script>

<style lang="scss" scoped>
    $contentBackground: #373a3d;
    $borderColor: #757272;
    .container {
        position: absolute;
        top: 5rem;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to left top, $contentBackground, $borderColor);
    }

    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 15rem;
        height: 20rem;
        text-align: center;
        background: linear-gradient(to bottom right, $contentBackground, $borderColor);
        input {
            box-sizing: border-box;
            border: none;
            margin-top: 2rem;
            padding-left: 0.5rem;
            height: 2rem;
            width: 12rem;
            font-size: 0.8rem;
            &[type="button"] {
                outline: none;
            }

        }
    }

</style>