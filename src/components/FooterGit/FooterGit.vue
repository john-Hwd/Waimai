<template>
  <div class="footer_guide">
    <!--  :class 动态获取class  对象语法（类名确定，但状态不确定(是否需要该类名)）-->
    <span class="guide_item" @click="goto('/home')" :class="{on: $route.path==='/home'}">
      <span class="item_icon">
        <i class="iconfont icon-u"></i>
      </span>
      <span>外卖</span>
    </span>
    <a href="javascript:;" class="guide_item" @click="goto('/search')" :class="{on: $route.path==='/search'}">
      <span class="item_icon">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="guide_item" @click="goto('/order')" :class="{on: $route.path==='/order'}">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item" @click="goto('/mine')" :class="{on: $route.path==='/mine'}">
      <span class="item_icon">
        <i class="iconfont icon-wode"></i>
      </span>
      <span>我的</span>
    </a>
  </div>
</template>

<script>
  export default {
    methods:{
      goto(path){
        this.$router.replace(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
