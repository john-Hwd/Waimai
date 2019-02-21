<template>
  <div id="app">
    <router-view/>
    <FooterGit/>
  </div>
</template>

<script>
  import FooterGit from './components/FooterGit/FooterGit'
  import {mapActions} from 'vuex'
  export default {
    components:{FooterGit},
    methods:{
      ...mapActions(['getUserInfo'])
    },
    mounted(){
      this.getUserInfo()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
