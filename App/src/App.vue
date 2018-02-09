<template>
    <div id="main">
        <my-header :state="isActive"></my-header>
        <div>
            <router-view></router-view>
            <router-view name="inform"></router-view>
        </div>

    </div>
</template>

<script>
    import myHeader from './components/Header.vue'

    export default {
        name: 'App',
        data() {
            return {
                isActive: true
            }
        },
        components: {
            'my-header': myHeader
        },
        created() {
            if (this.$route.name === 'Login') {
                this.isActive = false
            } else {
                this.isActive = true
            }
        },
        updated() {
            if (this.$route.name === 'Login') {
                this.isActive = false
            } else {
                this.isActive = true
            }
        }
    }
</script>

<style lang="scss">
    $defaultColor: #565656;
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
