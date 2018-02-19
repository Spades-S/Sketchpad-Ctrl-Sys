<template>
    <div id="main">
        <router-view name="header"></router-view>
        <div>
            <router-view></router-view>
            <router-view name="inform"></router-view>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {
                isActive: true
            }
        }

    }
</script>

<style lang="scss">
    $defaultColor: #565656;
    html {
        font-size: 20px;
    }

    #main {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: 0;
        padding: 0;
        min-width: 960px;
        min-height: 600px;
        background: $defaultColor;
    }


</style>
