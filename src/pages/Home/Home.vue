<template>
    <section class="msite">
      <!--首页头部-->
     <Header :title="address.name">
       <router-link class="header_search" to="/search" slot="left">
         <i class="iconfont icon-sousuo"></i>
       </router-link>
       <router-link class="header_login" to="/login" slot="right">
         <span class="header_login_text">登录|注册</span>
       </router-link>
     </Header>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="categorys.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                <div class="food_container">
                  <img :src="baseImgUrl+category.image_url">
                </div>
                <span>甜品饮品</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" alt="back" v-else>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-dingdan"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <Shops></Shops>
      </div>
    </section>
</template>

<script>
  import Header from '../../components/Header/Header'
  import Shops from '../../components/Shops/Shops'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {mapState} from 'vuex'
  export default {
    data(){
      return{
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components:{Header,Shops},
    computed:{
      ...mapState(['address','categorys']),
      categorysArr(){
        const {categorys} = this
        const bigArr = []
        let smlArr = []
        categorys.forEach(c => {
          if(smlArr.length===8){
            smlArr = []
          }
          if(smlArr.length===0){
            bigArr.push(smlArr)
          }
          smlArr.push(c)
        })
        return bigArr
      }
    },
    watch:{
      categorys(value){
        this.$nextTick(()=>{
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    },
    mounted() {
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getCategorys')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
